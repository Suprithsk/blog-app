import { login, signup } from "../controllers/authController";
import express from "express";
import { userLoginSchema, userSignupSchema } from "../schemas/authSchema";
import { zodPostMiddleware } from "../middlewares/zodMiddleware";
const router = express.Router();

router.post("/signup", zodPostMiddleware(userSignupSchema), signup);
router.post("/login", zodPostMiddleware(userLoginSchema), login);

export default router;
