import express from "express";
import { generateNewShortUrl, getAnalytics } from "../controllers/url.js";

const router= express.Router();

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytics);

export default router;
