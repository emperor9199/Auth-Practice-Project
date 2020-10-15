import React, { useState } from "react";
import userApi from "../api/userApi";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const enterData = (e) => {
    if (e.target.name === "name") {
      setUserData({ ...userData, name: e.target.value });
    } else if (e.target.name === "email") {
      setUserData({ ...userData, email: e.target.value });
    } else if (e.target.name === "password") {
      setUserData({ ...userData, password: e.target.value });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    await userApi.post("/users/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    history.push("/login");
  };

  return (
    <form onSubmit={submitData} className="container">
      <h1 className="my-5 text-center">Register</h1>
      <div className="form-group">
        <label>Enter Name:</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={userData.name}
          onChange={enterData}
        />
      </div>
      <div className="form-group">
        <label>Enter Email:</label>
        <input
          className="form-control"
          type="text"
          name="email"
          value={userData.email}
          onChange={enterData}
        />
      </div>
      <div className="form-group">
        <label>Enter Password:</label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={userData.password}
          onChange={enterData}
        />
      </div>
      <button type="submit" className="btn btn-success mr-5">
        Register
      </button>
      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    </form>
  );
};

export default RegisterUser;
