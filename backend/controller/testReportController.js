import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey=process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey:apiKey});

const generateTestReport = async (req, res) => {
    
  try {
    const testData = req.body; // receives full test details

    const prompt = `
You are an AI learning assistant.

Analyze this student's test performance and generate a brief(maximum 4 lines) report with :
0. predict slow learner or medium learner or fast learner or topper from text data.
1.give test accuracy out of 100 based on test data
2.difficulty level: (based on test data)
3. Performance summary
4. Strengths 
5. weaknesses
6. Topic-wise learning recommendations(use topic of the text),
7. Motivation message

Test data:
${JSON.stringify(testData, null, 2)}
    `;
 

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const testReport = response.choices[0].message.content;
    res.json({ report: testReport });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};


export default generateTestReport;

