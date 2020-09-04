import React from "react"

export default ({ json }) => {
  if (!json) return null
  const TrackList = ({ json }) => {
    return (
      <ul>
        {json.items.map((elem, i) => (
          <li key={i}>{elem.track.name}</li>
        ))}
      </ul>
    )
  }
  return <TrackList json={json} />
}
