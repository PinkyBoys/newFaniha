import React from "react";
import "../components/utilities/customs/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <section
        class="hero is-medium is-fullheight"
        id="home"
        style={{ minHeight: "1000vh" }}
      >
        <div
          class="hero-body is-flex-direction-column is-justify-content-center wow bounceInDown center"
          data-wow-duration="1s"
        >
          <p
            class="title is-size-1 has-text-weight-bold "
            data-wow-duration="1s"
          >
            Faniha Kitchen
          </p>
          <p class="subtitle is-italic">
            -Discover the Delightful Mysteries of Taste-
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
