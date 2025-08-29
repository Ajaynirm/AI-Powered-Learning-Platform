import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const getQuestions = async (req, res) => {
  const { topic, difficulty } = req.params;
  const openai = new OpenAI({
    apiKey: process.env.OPENNAI_API_KEYY,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Generate 5 multiple-choice quiz questions on the topic of ${topic} (in computer science or engineering related) with a 
  difficulty level of ${difficulty} (easy, medium, or hard).
  Each question should have:
   the question text
   4 options (labeled "A", "B", "C", "D")
   the correct answer key (e.g., "A", "B", etc.)
Format the output as a JSON array with this structure:
[
  {
    "question": "Question text",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "B"
  },
  ...
]. Do not include anything extra including json at starting`;

  if (!topic || !difficulty) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates quiz questions in JSON format.",
        },
        { role: "user", content: prompt },
      ],
      store: true,
    });

    const aiContent = completion.choices[0].message.content.trim();

    // Safe parse
    let questions;
    try {
      questions = JSON.parse(aiContent);
    } catch (parseErr) {
      console.error("Failed to parse OpenAI response:", parseErr);
      return res.status(500).json({ error: "Invalid JSON from OpenAI" });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching response: ", error);
    res.status(500).json({ error: "Failed to fetch quiz questions." });
  }
};
