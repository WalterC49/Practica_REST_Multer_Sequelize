import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export default sequelize.define(
  "User",
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "User" },
    avatar: { type: DataTypes.STRING },
  },
  { timestamps: false },
);
