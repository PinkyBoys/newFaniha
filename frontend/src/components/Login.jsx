import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { Link } from "react-router-dom";
import "../components/utilities/customs/LoginRegister.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <section className="hero is-fullheight is-fullwidth" id="login">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && (
                  <p className="has-text-centered has-text-danger">{message}</p>
                )}
                <h1 className="title is-2">Sign In</h1>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="*******"
                    />
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      {isLoading ? "Loading" : "Login"}
                    </button>
                  </div>
                  <span>
                    Belum punya akun ?<Link to={"/signup"}> Daftar disini</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
