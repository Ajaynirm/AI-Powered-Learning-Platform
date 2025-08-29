import sequelize from "./orm.js";
import "../models/User.js";
import "../models/TestReport.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ All models synced to DB.");
  } catch (error) {
    console.error("❌ Error syncing DB:", error);
  }
})();

