import React, { useState } from "react";
import axios from "axios";
const serverUri = `http://localhost:80/`;

const GeneratePlaylist = ({ tokens, userId, intersectWith, tracks }) => {
  const [title, setTitle] = useState(`${userId} x ${intersectWith}`);
  const [publicPlaylist, setPublicPlaylist] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState();

  const generatePlaylistRequest = async () => {
    try {
      const {
        data: { spotifyUrl },
      } = await axios.get(serverUri + "playlist", {
        params: {
          ...tokens,
          userId,
          uris: tracks.map(track => track.uri),
          title,
          publicPlaylist,
        },
      });
      console.log(spotifyUrl);
      setPlaylistUrl(spotifyUrl);
    } catch (err) {
      console.log(`something went wrong requesting playlist creation`);
    }
  };

  if (!(tracks && tokens && userId && intersectWith)) {
    return null;
  }

  return (
    <>
      <div>
        <label>
          Title:{" "}
          <input
            type="text"
            maxLength={20}
            size={20}
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          ></input>
          <button onClick={() => setPublicPlaylist(!publicPlaylist)}>
            {publicPlaylist ? "Public" : "Private"}
          </button>
          <button onClick={() => generatePlaylistRequest()}>
            Create Spotify Playlist
          </button>
        </label>
      </div>
      <div>
        {playlistUrl && (
          <a href={playlistUrl} target="_tab">
            {title}
          </a>
        )}
      </div>
    </>
  );
};

export default GeneratePlaylist;
