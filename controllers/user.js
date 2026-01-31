import User from "../models/User.js";
import { setUser } from "../service/auth.js";

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/");
};
export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.render("login", { error: "Invalid credentials" });
  }
  const token=setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
};
