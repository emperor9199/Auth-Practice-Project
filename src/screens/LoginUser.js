import React, { useState } from "react";
import userApi from "../api/userApi";
import { Link, useHistory } from "react-router-dom";

const LoginUser = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({ email: "", password: "" });

  const checkUser = async (e) => {
    e.preventDefault();

    try {
      const legalUser = await userApi.post("/users/login", {
        email: userData.email,
        password: userData.password,
      });

      history.push({
        pathname: "/content",
        state: { token: legalUser.data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const textChanged = (e) => {
    if (e.target.name === "email") {
      setUserData({ ...userData, email: e.target.value });
    } else if (e.target.name === "password") {
      setUserData({ ...userData, password: e.target.value });
    }
  };

  return (
    <>
      <form onSubmit={checkUser} className="container">
        <h1 className="my-5 text-center">Login</h1>
        <div className="form-group">
          <label>Enter Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={userData.email}
            onChange={textChanged}
          />
        </div>
        <div className="form-group">
          <label>Enter Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={userData.password}
            onChange={textChanged}
          />
        </div>
        <button type="submit" className="btn btn-success mr-5">
          Login
        </button>

        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
      </form>
    </>
  );
};

export default LoginUser;
