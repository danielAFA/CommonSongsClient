import React, { useState, useEffect } from "react";
import axios from "axios";

export const LogInButton = () => {
  const serverUri = `http://localhost:80/`;
  const source = axios.CancelToken.source();
  const [authUrl, setAuthUrl] = useState();

  const requestAuthUrl = async () => {
    try {
      const {
        data: { authUrl },
      } = await axios.get(serverUri + "auth", {
        cancelToken: source.token,
      });
      setAuthUrl(authUrl);
    } catch (err) {
      if (!axios.isCancel(err)) console.log(err);
    }
  };

  useEffect(() => {
    requestAuthUrl();
    return () => source.cancel();
  });

  return (
    <a href={authUrl}>
      <button>Log in</button>
    </a>
  );
};

export const LogOutButton = () => (
  <a href="http://localhost:3000/">
    <button>Log out</button>
  </a>
);
