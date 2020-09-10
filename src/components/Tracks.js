import React, { useMemo, useState } from "react"

const Tracks = ({ trackList }) => {
  const trackListSize = trackList.length
  const [showTable, setShowTable] = useState(trackListSize > 0)

  const handleClick = () => {
    setShowTable(!showTable)
  }

  const ShowTable = () => {
    return (
      <button onClick={handleClick}>
        {!showTable ? "Show " : "Hide"} List
      </button>
    )
  }
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
  return (
    <div>
      {trackListSize > 0 ? (
        <ShowTable />
      ) : (
        <div> You have 0 songs in common D: </div>
      )}
      {showTable && <table>{TrackTable}</table>}
    </div>
  )
}

export default Tracks
