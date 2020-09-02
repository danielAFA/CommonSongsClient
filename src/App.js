import React, { useEffect, useState } from "react"
import axios from "axios"

const uri = "http://localhost:8888/"

const MyLikedSongs = () => {
  const [appState, setAppState] = useState({ respone: null, loading: false })

  const TrackNames = ({ json }) => {
    if (!json) return null
    console.log(json)

    return json.items.map((elem, i) => <p key={i}>{elem.track.name}</p>)
  }

  useEffect(() => {
    setAppState({ loading: false })
    axios
      .get(uri)
      .then(({ data }) => {
        setAppState({ loading: false, response: data.body ? data.body : data })
      })
      .catch(e => {
        console.error(e)
      })
  }, [setAppState])

  return (
    <div>
      {appState.response && appState.response.authLink ? (
        <a href={appState.response.authLink}>
          <button>Auth Page</button>
        </a>
      ) : (
        <div>
          <TrackNames json={appState.response} />
        </div>
      )}
    </div>
  )
}

const App = () => {
  return (
    <>
      <MyLikedSongs />
    </>
  )
}

export default App
