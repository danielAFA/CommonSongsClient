import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Tracks from "./Tracks";
import UserSelection from "./UserSelection";
import LogIn from "./LogIn";
import GeneratePlaylist from "./GeneratePlaylist";
import DropUser from "./DropUser";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
const serverUri = `http://localhost:80/`;

const Home = () => {
  const [tokens, setTokens] = useState();
  const [tracks, setTracks] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [intersectWith, setIntersectWith] = useState();
  const [loading, setLoading] = useState();

  const retrieveTokens = useCallback(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get("aT")) {
      setTokens({ accessT: params.get("aT"), refreshT: params.get("rT") });
    }
  }, [setTokens]);

  const storeAndRequestId = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { userId },
      } = await axios.get(serverUri + "store", {
        params: tokens,
      });
      setCurrentUserId(userId);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [tokens, setCurrentUserId]);

  useEffect(() => {
    if (!tokens) retrieveTokens();
    else {
      storeAndRequestId();
    }
  }, [tokens, retrieveTokens, storeAndRequestId]);

  const LoadingMessage = () => <div>Retrieving playlist data...</div>;

  return (
    <div class="">
      <LogIn loggedIn={tokens} />
      {loading ? (
        <LoadingMessage />
      ) : (
        <>
          <DropUser userId={currentUserId} />
          {currentUserId && (
            <UserSelection
              currentUserId={currentUserId}
              intersectWith={intersectWith}
              setIntersectWith={setIntersectWith}
              setTracks={setTracks}
            />
          )}
          <Tracks trackList={tracks} />
          {tracks && intersectWith && (
            <GeneratePlaylist
              tokens={tokens}
              userId={currentUserId}
              tracks={tracks}
              intersectWith={intersectWith}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
