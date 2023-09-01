import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/authSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(register({ username, password, confPassword }));
  };

  return (
    <section className="hero is-fullheight is-fullwidth" id="register">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && (
                  <p className="has-text-centered has-text-danger">{message}</p>
                )}
                <h1 className="title is-2">Sign Up</h1>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      type="password"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="input"
                      placeholder="*******"
                    />
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      {isLoading ? "Loading" : "Sign Up"}
                    </button>
                  </div>
                </div>
                <span>
                  Sudah punya akun ? <Link to={"/login"}> Login disini</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
