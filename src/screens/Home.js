import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import { Link, useHistory } from "react-router-dom";
import UserData from "../components/UserData";

const Home = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const getUsers = async () => {
    const userData = await userApi.get("/users");
    setUsers(userData.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = async (id) => {
    try {
      await userApi.delete(`/users/delete/${id}`);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {users.map((user) => (
        <UserData key={user._id} user={user} onDelete={(id) => onDelete(id)} />
      ))}

      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    </>
  );
};

export default Home;
