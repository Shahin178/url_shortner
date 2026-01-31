import express from "express";
import Url from "../models/Url.js";
import { restrictTo } from "../middleware/auth.js";
const router = express.Router();

router.get("/admin/urls",restrictTo(['ADMIN']), async (req, res) => {
  const allUrl = await Url.find();
  return res.render("home", { urls: allUrl });
});

router.get("/", restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  const allUrl = await Url.find({createdBy:req.user._id});
  return res.render("home", { urls: allUrl });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});

export default router;
