import "./config/env.js";
import express from "express";
import path from "path";
import UrlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import Url from "./models/Url.js";
import "./connect.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", UrlRoute);
app.use("/", staticRouter);

app.use("/:shortId", async(req, res)=>{
  const shortId= req.params.shortId;
  const entry=await Url.findOneAndUpdate({
    shortId: shortId
  },{$push:{
    visitHistory:{ timestamp: new Date()}
  }})
  
  if(entry){
    return res.redirect(entry.redirectUrl); 
  }
})

app.listen(PORT, () => console.log(`✅ Server is running on PORT:${PORT}`));
