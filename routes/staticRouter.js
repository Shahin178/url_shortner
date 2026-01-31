import express from "express";
import Url from "../models/Url.js";
const router = express.Router();

router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login");
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
