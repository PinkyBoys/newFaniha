import React from "react";
// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/utilities/customs/Main.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="columns pt-2" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column" id="main">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
