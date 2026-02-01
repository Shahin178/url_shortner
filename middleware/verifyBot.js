export const verifyBot = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.BOT_SECRET) {
    return res.status(401).json({ error: "Unauthorized bot" });
  }

  next();
};
