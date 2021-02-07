import React, { useMemo, useState } from "react";

const Tracks = ({ trackList }) => {
  const [displayTable, setDisplayTable] = useState();

  const handleClick = () => {
    setDisplayTable(!displayTable);
  };

  const ToggleTable = () => (
    <button onClick={handleClick}>{!displayTable ? "Show" : "Hide"}</button>
  );

  const TrackTable = useMemo(() => {
    if (!trackList) {
      return null;
    }

    const columns = ["cover", "name", "artists", "album"];
    return (
      <table>
        <tbody>
          <tr>
            {columns.map((el, i) => (
              <th key={i}>{el}</th>
            ))}
          </tr>

          {trackList.map((elem, i) => (
            <tr key={i}>
              <td>
                {elem.album.images[2] && (
                  <img
                    src={elem.album.images[2].url}
                    alt="album cover"
                    width={elem.album.images[2].width}
                    height={elem.album.images[2].height}
                  ></img>
                )}
              </td>
              <td>{elem.name}</td>
              <td>{elem.artists.map(el => el.name).join(", ")}</td>
              <td>{elem.album.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [trackList]);

  if (!trackList) {
    return null;
  }

  return (
    <div>
      <>{trackList.length} tracks in common </>
      {trackList.length > 0 && <ToggleTable />}
      {displayTable && TrackTable}
    </div>
  );
};

export default Tracks;
