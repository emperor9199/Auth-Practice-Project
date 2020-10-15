import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import { useLocation } from "react-router-dom";

const Content = () => {
  const location = useLocation();
  const token = location.state.token;

  const [legalUser, setLegalUser] = useState({});

  const getTokenData = async () => {
    try {
      const result = await userApi.get("/private", {
        headers: {
          "auth-token": token,
        },
      });
      setLegalUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  return <h1>Content - {legalUser.name} </h1>;
};

export default Content;
