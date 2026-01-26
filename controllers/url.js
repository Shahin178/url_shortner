import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const generateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ error: "Redirect URL is required" });
  const shortId = nanoid(8);
  const result = await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.status(201).json({ id: shortId });
};
