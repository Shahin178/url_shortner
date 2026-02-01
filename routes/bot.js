import express from "express";
import { createShortUrlForBot } from "../controllers/botUrl.js";
import { verifyBot } from "../middleware/verifyBot.js";

const router = express.Router();

// POST /bot/create
router.post("/create", verifyBot, createShortUrlForBot);

export default router;
