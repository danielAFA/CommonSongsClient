import React, { useEffect, useState } from "react"
import axios from "axios"

const url = "http:localhost:8888"
const headers = new Headers()

const SimpleGetRequest = () => {
  const [appState, setAppState] = useState({ respone: null, loading: false })

  useEffect(() => {
    setAppState({ loading: false })
    axios.get(url, { headers: headers }).then(response => {
      setAppState({ loading: false, response: response })
    })
  }, [setAppState])

  return <pre>{JSON.stringify(appState.response, null, 2)}</pre>
}

const SpotifyLanding = () => {
  return (
    <div className="container">
      <div id="login">
        <h1>This is an example of the Authorization Code flow</h1>
        <a href="/login" className="btn btn-primary">
          Log in with Spotify
        </a>
      </div>
      <div id="loggedin">
        <div id="user-profile"></div>
        <div id="oauth"></div>
        <button className="btn btn-default" id="obtain-new-token">
          Obtain new token using the refresh token
        </button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <>
      <SimpleGetRequest />
      <SpotifyLanding />
    </>
  )
}

export default App
