import sequelize from "./orm.js";
import "../models/User.js";
import "../models/TestReport.js";
import "../models/UserSkill.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection established successfully.");
    
    try {
      await sequelize.sync({ alter: false });
    console.log("✅ All models synced to DB.");
    } catch (error) {
      console.error("❌ Error syncing DB:", error);
    }
    
  } catch (error) {
    console.log("✅ Connection Failure  ... ");
  }
})();

