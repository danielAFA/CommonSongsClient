import React from "react"

export default ({ trackList }) => {
  if (!trackList) return null
  const columns = ["cover", "name", "artists", "album"]
  const TrackTable = ({ trackList }) => {
    return (
      <tbody>
        <tr>
          {columns.map((el, i) => (
            <th key={-i}>{el}</th>
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
  }
  return (
    <table>
      <TrackTable trackList={trackList} />
    </table>
  )
}
