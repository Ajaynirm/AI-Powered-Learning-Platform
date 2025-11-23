import UserSkills from "../models/UserSkill.js";

export const getUserSkillData = async (req, res) => {
    const userId = req.user.id;
    try {
      const results = await UserSkills.findOne({
        where: { userId},
      });
      res.status(200).json(results);
    } catch (err) {
      console.error("Error fetching results:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
