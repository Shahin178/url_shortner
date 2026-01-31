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

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/url", restrictTo(['NORMAL', 'ADMIN']), UrlRoute);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: new Date() },
      },
    },
  );

  if (entry) {
    return res.redirect(entry.redirectUrl);
  }
});

app.listen(PORT, () => console.log(`✅ Server is running on PORT:${PORT}`));
