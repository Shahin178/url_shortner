import "./config/env.js";
import express from "express";
import UrlRoute from "./routes/url.js";
import Url from "./models/Url.js";
import "./connect.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/url", UrlRoute);
app.use("/:shortId", async(req, res)=>{
  const shortId= req.params.shortId;
  const entry=await Url.findOneAndUpdate({
    shortId: shortId
  },{$push:{
    visitHistory:{ timestamp: new Date()}
  }})
  console.log("entry", entry);
  
  if(entry){
    return res.redirect(entry.redirectUrl); 
  }
})

app.listen(PORT, () => console.log(`✅ Server is running on PORT:${PORT}`));
