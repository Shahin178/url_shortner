import { nanoid } from "nanoid";
import Url from "../models/url.js";

export const generateNewShortUrl = async (req, res) => {
  const body = req.body;
 
  if (!body.url)
    return res.status(400).json({ error: "Redirect URL is required" });
  const shortId = nanoid(8);
  const result = await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });
  return res.render("home",{id: shortId});
};

export const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId: shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
