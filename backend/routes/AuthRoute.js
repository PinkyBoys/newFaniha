import express from "express";
import { Me, LogOut, LogIn } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", LogIn);
router.delete("/logout", LogOut);

export default router;
