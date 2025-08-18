import dotenv from "dotenv";
dotenv.config();

//Umgebungsvaribale tipisieren
interface Config {
  PORT: number;
  MONGODB_URL?: string;
  //RESEND_API_KEY: string;
  FRONTEND_URL: string;
  JWT_SECRET: string;
}

//UmgebungsVariableprüfung mit required
function getEnvVar(key: string, required: boolean = true): string | undefined {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Umgebungsvariable ${key} ist nicht gesetzt.`);
  }
  return value;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || "3006", 10),
  MONGODB_URL: getEnvVar("MONGODB_URL")!,
  //RESEND_API_KEY: getEnvVar("RESEND_API_KEY")!,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  JWT_SECRET: getEnvVar("JWT_SECRET")!,
};

export default config;