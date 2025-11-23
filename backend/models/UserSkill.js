// models/UserSkills.js
import { DataTypes } from "sequelize";
import sequelize from "../config/orm.js"
import User from "./User.js";

const UserSkills = sequelize.define("UserSkills", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One Skills record per user
  },
  strength: {
    type: DataTypes.JSON,   // stores ["react", "node"]
    defaultValue: [],
  },
  weakness: {
    type: DataTypes.JSON,   // stores ["java", "express"]
    defaultValue: [],
  },
  tackled: {
    type: DataTypes.JSON,   // stores ["node", "express"]
    defaultValue: [],
  },
  createdAt:{
    type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  }
});

// models/User.js
User.hasOne(UserSkills, { foreignKey: "userId" });
UserSkills.belongsTo(User, { foreignKey: "userId" });


export default UserSkills;
