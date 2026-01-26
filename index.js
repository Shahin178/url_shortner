import "./config/env.js";
import express from "express";
import UrlRoute from "./routes/url.js";
import "./connect.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/url", UrlRoute);

app.listen(PORT, () => console.log(`✅ Server is running on PORT:${PORT}`));
