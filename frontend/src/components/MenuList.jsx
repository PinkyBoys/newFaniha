import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../features/productSlice";
import { Link } from "react-router-dom";

const MenuList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.product);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h3 className="title">Menu List</h3>
      {product.map((data) => (
        <div className="columns" key={product.uuid}>
          <div className="column">
            <img src={product.img} alt="" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuList;
