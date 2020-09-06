import React from "react"

export default ({ trackList }) => {
  if (!trackList) return null
  const TrackList = ({ trackList }) => {
    return (
      <ul>
        {trackList.map((elem, i) => (
          <li key={i}>{elem.track.name}</li>
        ))}
      </ul>
    )
  }
  return <TrackList trackList={trackList} />
}
