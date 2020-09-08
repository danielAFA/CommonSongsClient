import React, { useMemo } from "react"

const Tracks = ({ trackList }) => {
  const TrackTable = useMemo(() => {
    const columns = ["cover", "name", "artists", "album"]
    return (
      <tbody>
        <tr>
          {columns.map((el, i) => (
            <th key={i}>{el}</th>
          ))}
        </tr>

        {trackList.map((elem, i) => (
          <tr key={i}>
            <td>
              {elem.track.album.images[2] && (
                <img
                  src={elem.track.album.images[2].url}
                  alt="album cover"
                  width={elem.track.album.images[2].width}
                  height={elem.track.album.images[2].height}
                ></img>
              )}
            </td>
            <td>{elem.track.name}</td>
            <td>{elem.track.artists.map(el => el.name).join(", ")}</td>
            <td>{elem.track.album.name}</td>
          </tr>
        ))}
      </tbody>
    )
  }, [trackList])
  return <table>{TrackTable}</table>
}

export default Tracks
