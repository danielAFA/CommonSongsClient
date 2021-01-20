import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Tracks from "./Tracks";
import UserSelection from "./UserSelection";
import LogIn from "./LogIn";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
const serverUri = `http://localhost:80/`;

export default () => {
  const [tokens, setTokens] = useState();
  const [tracks, setTracks] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [intersectWith, setIntersectWith] = useState();

  const retrieveTokens = useCallback(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get("aT")) {
      console.log("happened");
      setTokens({ accessT: params.get("aT"), refreshT: params.get("rT") });
    }
  }, [setTokens]);

  const requestCurrentUserId = useCallback(async () => {
    try {
      const {
        data: { userId },
      } = await axios.get(serverUri + "save", {
        params: tokens,
      });
      setCurrentUserId(userId);
    } catch (e) {
      console.error(e);
    }
  }, [tokens, setCurrentUserId]);

  const requestIntersection = useCallback(async () => {
    try {
      const {
        data: { intersection },
      } = await axios.get(serverUri + "intersection", {
        params: {
          id1: currentUserId,
          id2: intersectWith,
        },
      });
      setTracks(intersection);
    } catch (e) {
      console.error(e);
    }
  }, [currentUserId, intersectWith, setTracks]);

  useEffect(() => {
    if (!tokens) retrieveTokens();
    else {
      requestCurrentUserId();
    }
  }, [tokens, retrieveTokens, requestCurrentUserId]);

  const IntersectionButton = () => {
    return (
      <button
        onClick={() => {
          requestIntersection();
        }}
      >
        Get Intersection
      </button>
    );
  };
  return (
    <div>
      <LogIn loggedIn={tokens} />
      {currentUserId && (
        <UserSelection
          currentUserId={currentUserId}
          setIntersectWith={setIntersectWith}
        />
      )}
      {intersectWith && <IntersectionButton />}
      {tracks && <Tracks trackList={tracks} />}
    </div>
  );
};
