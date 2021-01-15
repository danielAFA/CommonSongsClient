import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Tracks from "./Tracks";
import UserSelection from "./UserSelection";
import { LogInButton, LogOutButton } from "./LogIn";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
const serverUri = `http://localhost:80/`;

export default () => {
  const [tokens, setTokens] = useState();
  const [tracks, setTracks] = useState();
  const [intReady, setIntReady] = useState();
  const [users, setUsers] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [idIntersectWith, setIdIntersectWith] = useState();

  const getTokens = useCallback(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get("aT"))
      setTokens({ aT: params.get("aT"), rT: params.get("rT") });
  }, [setTokens]);

  const requestUsers = useCallback(async () => {
    try {
      const {
        data: { userIds },
      } = await axios.get(serverUri + "users");
      setUsers(userIds);
    } catch (e) {
      console.error(e);
    }
  }, [setUsers]);

  const tracksRequest = useCallback(async () => {
    try {
      const { data } = await axios.get(serverUri + "user_tracks");
      setTracks(data.tracks);
      setIntReady(data.intersectionReady);
      setUsers(data.availableUsers);
    } catch (e) {
      console.error(e);
    }
  }, [setTracks, setIntReady, setUsers]);

  const intersectionRequest = async () => {
    console.log(idIntersectWith);
    try {
      const { data } = await axios.get(serverUri + "intersection", {
        params: {
          userId: idIntersectWith,
        },
      });
      setTracks(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  const handleGetIntersectionClick = () => {
    intersectionRequest();
  };

  const driver = useCallback(() => {
    if (!tokens) getTokens();
    if (tokens && !users) requestUsers();
  }, [tokens, users, getTokens, requestUsers]);

  useEffect(() => {
    driver();
  }, [driver]);

  const IntersectionButton = () => {
    return (
      <>
        {
          <button onClick={handleGetIntersectionClick}>
            Get Intersection!
          </button>
        }
      </>
    );
  };
  return (
    <>
      {tokens ? <LogOutButton /> : <LogInButton />}
      {users && (
        <UserSelection
          availableUsers={users}
          setIntersectionWith={setIdIntersectWith}
        />
      )}
      {intReady && idIntersectWith && <IntersectionButton />}
      {tracks && <Tracks trackList={tracks} />}
    </>
  );
};
