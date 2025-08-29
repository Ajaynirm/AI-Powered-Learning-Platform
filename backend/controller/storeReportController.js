import TestReport from "../models/TestReport.js";
import User from "../models/User.js";

// ✅ Store a test report
export const storeTestReport = async (req, res) => {
  const { result, id, topic, score, difficulty, totalMarks } = req.body;

  if (!result || !id || !topic || score === undefined || difficulty === undefined || totalMarks === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Ensure user exists before creating report
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReport = await TestReport.create({
      user_id: id,
      testName: topic,
      score,
      totalMarks,
      difficulty,
      report: result, // in your schema it's "report", not "result"
    });

    res.status(201).json({
      message: "Result saved successfully",
      resultId: newReport.id,
    });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all test data of specific user (without report field)
export const getUserTestData = async (req, res) => {
  const { user_id } = req.params;

  try {
    const results = await TestReport.findAll({
      where: { user_id },
      attributes: ["id", "testName", "difficulty", "totalMarks", "score", "dateTaken"],
      order: [["dateTaken", "DESC"]],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get report for a specific test
export const getSpecificReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await TestReport.findByPk(id, {
      attributes: ["report"],
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
