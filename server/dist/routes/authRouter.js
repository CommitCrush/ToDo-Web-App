import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();
//Öffenlicht
router.post("/register", authController.register); //public
router.post("/login", authController.login);
router.post("/logout", authController.logout);
//Geschützt (eigene Dateien)
router.get("/profile", verifyToken, authController.getOwnProfile); // eingelogt
router.put("/profile", verifyToken, authController.updateOwnProfile); // eingelogt
export default router;
