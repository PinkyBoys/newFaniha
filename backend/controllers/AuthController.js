import User from "../models/UserModel.js";
import argon2 from "argon2";

export const LogIn = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });
  req.session.userId = user.uuid;
  const { uuid, username, role, status } = user;
  res.status(200).json({ uuid, username, role, status });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login ke akun anda" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
    attributes: ["uuid", "username", "role", "status"],
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
