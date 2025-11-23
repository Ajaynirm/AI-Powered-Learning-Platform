import { OpenAI } from "openai";
import dotenv from "dotenv";
import TestReport from "../models/TestReport.js";
import  UserSkill from "../models/UserSkill.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENNAI_API_KEYY });
const generateTestReport = async (req, res) => {
  try {
    const testData = req.body;

    const prompt = `
    You are an AI learning assistant.
    
    Analyze this student's test performance and return the result strictly in the following JSON format:
    
    {
      "learnerType": "slow | medium | fast | topper",
      "testAccuracy": number, 
      "difficultyLevel": "easy | medium | hard",
      "performanceSummary": "string",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "topicRecommendations": ["string"],
      "motivationMessage": "string"
    }
    
    Rules:
    - Do NOT return explanations.
    - Do NOT add extra text outside the JSON.
    - Base everything only on the test data.
    
    Test data:
    ${JSON.stringify(testData, null, 2)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const user = req.user;

    const testReport = response.choices[0].message.content;

    try {
      if (user) {
        // Directly save into DB
        await TestReport.create({
          user_id: user.id,
          testName: req.body.topic,
          score: req.body.score,
          totalMarks: req.body.totalMarks,
          difficulty: req.body.difficulty,
          report: testReport,
        });

        console.log("saved to db ");
        let parsed;

        try {
          parsed = JSON.parse(testReport); // convert to JS object
          
        } catch (err) {
          console.error("Invalid JSON from AI:", err);
        }
        const strength = parsed?.strength || [];
        const weakness = parsed?.weakness || [];
        const tackled = parsed?.tackled || [];

        let skills = await UserSkill.findOne({ where: { userId: user.id } });
        if (!skills) {
          // If no existing row, create a fresh one
          skills = await UserSkill.create({
            userId: user.id,
            strength,
            weakness,
            tackled
          });
        }else{
            // 2. Merge + dedupe fields
  const updatedStrength = Array.from(
    new Set([...(skills.strength || []), ...(strength || [])])
  );

  const updatedWeakness = Array.from(
    new Set([...(skills.weakness || []), ...(weakness || [])])
  );

  const updatedTackled = Array.from(
    new Set([...(skills.tackled || []), ...(tackled || [])])
  );

  // 3. Remove tackled topics from weakness (your rule)
  const cleanedWeakness = updatedWeakness.filter(
    (item) => !updatedTackled.includes(item)
  );

  await skills.update({
    strength: updatedStrength,
    weakness: cleanedWeakness,
    tackled: updatedTackled,
    updatedAt: Date.now()
  });
        }
      }

    } catch (err) {
      console.log(`error while saving report: ${err} `);
    }

    return res.status(201).json({
      message: `Report generated and saved success `,
      report: testReport,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};

export default generateTestReport;
