import mongoose from "mongoose";
import config from "../config/config.js";

const uri = config.MONGODB_URL;

// Mit diser Funktion verwinden wir unser Projekt mit MongoDB-Compass

export const connect = async () => {
  if (!uri) {
    throw new Error("MONGO_URL ist nicht defineiert");
  }
  try {
    // hier entsteht die Verbindung
    mongoose.connection.on("connected", () => {
      console.log("✅ Connected to MongoDB 🛜");
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
