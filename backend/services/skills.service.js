import UserSkills from "../models/UserSkill";
export const updateUserSkills = async (userId, { strength, weakness, tackled }) => {
    const record = await UserSkills.findOne({ where: { userId } });
  
    record.strength = strength;
    record.weakness = weakness;
    record.tackled = tackled;
  
    await record.save();
    return record;
  };
  