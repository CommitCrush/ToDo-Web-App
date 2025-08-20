import { Router } from "express";
import * as todoController from "../controllers/todoController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();
// Alle Todo-Routen sind geschützt (benötigen Authentication)
router.get("/", verifyToken, todoController.getTodos);
router.post("/", verifyToken, todoController.addTodo);
router.put("/:id", verifyToken, todoController.updateTodo);
router.delete("/:id", verifyToken, todoController.deleteTodo);
router.patch("/:id/toggle", verifyToken, todoController.toggleTodoCompletion);
export default router;
