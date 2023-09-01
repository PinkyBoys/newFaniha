import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "role", "status"],
          },
        ],
        attributes: ["uuid", "name", "price"],
      });
    } else {
      response = await Product.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["username", "role"],
          },
        ],
        attributes: ["uuid", "name", "price"],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({ msg: "Product tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["username", "role", "status"],
          },
        ],
        attributes: ["uuid", "name", "price"],
      });
    } else {
      response = await Product.findOne({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["username", "role"],
          },
        ],
        attributes: ["uuid", "name", "price"],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product Berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product tidak ditemukan" });
    }

    const { name, price } = req.body;
    if (req.role === "admin") {
      await Product.update(
        {
          name,
          price,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
      await Product.update(
        {
          name,
          price,
        },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product update berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product tidak ditemukan" });
    }

    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
