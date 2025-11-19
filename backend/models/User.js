import { DataTypes } from "sequelize";
import sequelize from "../config/orm.js"; 

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clerk_user_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "users",
  timestamps: true, // maps to createdAt & updatedAt
  indexes: [
    {
      unique: true,
      fields: ["clerk_user_id"],
    },
  ],
  createdAt: "created_at",
  updatedAt: "updated_at",

});

export default User;
