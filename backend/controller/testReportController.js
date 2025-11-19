import { OpenAI } from "openai";
import dotenv from "dotenv";
import TestReport from "../models/TestReport.js";
import User from "../models/User.js";


dotenv.config();



const openai = new OpenAI({ apiKey: process.env.OPENNAI_API_KEYY});
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
    
    const clerkUserId = req.auth.userId;
   
    // if (!clerkUserId) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // userId IS YOUR clerk_user_id  
    // Now verify user exists
    let user;
    if(clerkUserId){
      user = await User.findOne({ where: { clerk_user_id: clerkUserId } });
    }

    // if (!user) {
    //   return res.status(404).json({ message: "User not found in DB" });
    // }

    const testReport = response.choices[0].message.content;
    
    let check;
    
    if(user){
      // Directly save into DB
     check=await TestReport.create({
      user_id: user.id,
      testName: req.body.topic,
      score: req.body.score,
      totalMarks: req.body.totalMarks,
      difficulty: req.body.difficulty,
      report: testReport, 
    });
  }

    return res.status(201).json({
      message: `Report generated and saved success `,
      report: testReport
    });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};


export default generateTestReport;



