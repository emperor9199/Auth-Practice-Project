import React from "react";

const userData = ({ user, onDelete }) => {
  return (
    <>
      <h1>
        {user.name} - {user._id}
      </h1>
      <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
        Remove
      </button>
    </>
  );
};

export default userData;
