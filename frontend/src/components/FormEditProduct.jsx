import React from "react";

const FormEditProduct = () => {
  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Update Product</h2>
      <div className="card has-shadow">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Price" />
                </div>
              </div>
              <div className="field">
                <div className="controll">
                  <button className="button is-success">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
