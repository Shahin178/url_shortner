import "./config/env.js";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import Url from "./models/url.js";
import "./connect.js";

import { checkForAuthentication, restrictTo } from "./middleware/auth.js";

import UrlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRouter from "./routes/user.js";
import botRouter from "./routes/bot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// ✅ BOT ROUTES (no cookies required)
app.use("/bot", botRouter);

// ✅ USER ROUTES
app.use("/user", userRouter);

// ✅ AUTH-PROTECTED URL ROUTES (website)
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), UrlRoute);

// ✅ STATIC PAGES
app.use("/", staticRouter);

// ✅ REDIRECT — MUST BE LAST
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { visitedAt: new Date() } } },
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  return res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`✅ Server is running on PORT: ${PORT}`));
