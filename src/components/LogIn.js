import React, { useState, useEffect } from "react";
import axios from "axios";

const LogIn = ({ loggedIn }) => {
  const LogInButton = () => {
    const [authUrl, setAuthUrl] = useState();
    useEffect(() => {
      const serverUri = `http://localhost:80/`;
      const source = axios.CancelToken.source();
      axios
        .get(serverUri + "auth", {
          cancelToken: source.token,
        })
        .then(response => {
          setAuthUrl(response.data.authUrl);
        })
        .catch(err => {
          if (!axios.isCancel(err)) console.log(err);
        });
      return () => source.cancel();
    }, []);

    return (
      <a href={authUrl}>
        <button>Log in</button>
      </a>
    );
  };

  const LogOutButton = () => (
    <a href="http://localhost:3000/">
      <button>Log out</button>
    </a>
  );

  return <div>{loggedIn ? <LogOutButton /> : <LogInButton />}</div>;
};

export default LogIn;
