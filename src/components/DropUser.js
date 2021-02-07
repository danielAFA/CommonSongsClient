import React from "react";
import axios from "axios";

const DropUser = ({ userId }) => {
  if (!userId) return null;
  const serverUri = `http://localhost:80/`;
  const requestRemoval = async () => {
    try {
      await axios.delete(`${serverUri}remove`, {
        params: {
          userId,
        },
      });
    } catch (err) {
      console.log("something went wrong requesting removal");
    }
  };

  const handleCLick = () => {
    requestRemoval();
  };

  return (
    <a href="http://localhost:3000">
      <button onClick={handleCLick}>Delete my data</button>
    </a>
  );
};

export default DropUser;
