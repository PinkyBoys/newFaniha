import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome back <strong>{user && user.username}</strong>
      </h2>
    </>
  );
};

export default Welcome;
