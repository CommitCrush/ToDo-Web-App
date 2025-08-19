import dotenv from "dotenv";
dotenv.config();
//UmgebungsVariableprüfung mit required
function getEnvVar(key, required = true) {
    const value = process.env[key];
    if (required && !value) {
        throw new Error(`Umgebungsvariable ${key} ist nicht gesetzt.`);
    }
    return value;
}
const config = {
    PORT: parseInt(process.env.PORT || "3006", 10),
    MONGODB_URL: getEnvVar("MONGODB_URL"),
    //RESEND_API_KEY: getEnvVar("RESEND_API_KEY")!,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    JWT_SECRET: getEnvVar("JWT_SECRET"),
};
export default config;
