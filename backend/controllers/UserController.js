import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "username", "role", "status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "username", "role", "status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createUser = async (req, res) => {
  const { username, password, confPassword } = req.body;

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    return res.status(400).json({ msg: "Username sudah digunakan" });
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password dan confirm password tidak sesuai" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      username: username,
      password: hashPassword,
    });
    res.status(200).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { username, password, confPassword, role, status } = req.body;

    const existingUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUsername) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "Password dan confirm password tidak sama" });
    }

    let hashPassword = user.password;
    if (password && password.trim() !== "") {
      hashPassword = await argon2.hash(password);
    }

    await User.update(
      {
        username: username,
        password: hashPassword,
        role: role,
        status: status,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "Update User berhasil" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat memproses permintaan" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) res.status(404).json({ msg: "Data tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
