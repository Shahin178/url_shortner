import express from "express";
import Url from "../models/Url.js";
const router= express.Router();

router.get("/", async (req, res)=>{
  const allUrl=await Url.find({})
  return res.render("home",{urls: allUrl});
});

export default router;