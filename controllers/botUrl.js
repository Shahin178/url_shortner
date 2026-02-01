import { nanoid } from "nanoid";
import Url from "../models/url.js";

export const createShortUrlForBot = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(8);

    await Url.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
      createdBy: null, // bot-generated
    });

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      shortId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
