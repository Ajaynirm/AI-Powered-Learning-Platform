import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    logging: false, // set true if you want to see SQL queries
  }
);

// Export sequelize so models can use it
export default sequelize;
