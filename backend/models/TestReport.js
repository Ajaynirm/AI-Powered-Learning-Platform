import { DataTypes } from "sequelize";
import sequelize from "../config/orm.js";
import User from "./User.js";

const TestReport = sequelize.define(
  "TestReport",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    report: {
      type: DataTypes.TEXT,
    },
    dateTaken: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "TestReports",
    timestamps: false, // we already have dateTaken
  }
);

// Relation
User.hasMany(TestReport, { foreignKey: "user_id", onDelete: "CASCADE" });
TestReport.belongsTo(User, { foreignKey: "user_id" });

export default TestReport;
