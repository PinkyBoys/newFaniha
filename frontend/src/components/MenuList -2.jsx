import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../features/productSlice";

const MenuList = () => {
  const dispatch = useDispatch();

  // Menggunakan destructuring untuk mengambil properti dari state.product
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List Of Product</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {message}</div>
      ) : (
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.user.name}</td>
                <td>
                  <Link
                    to={`/products/edit/${product.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.uuid)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MenuList;
