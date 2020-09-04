import React, { useState, useEffect } from "react"
import axios from "axios"
import Tracks from "./Tracks"

const serverPort = 8888
const uri = `http://localhost:${serverPort}/`

export default () => {
  const [authStatus, setAuthStatus] = useState()
  const [tracks, setTracks] = useState()

  //data = {status: bool, authLink: string}
  const authorizationRequest = async path => {
    try {
      const { data } = await axios.get(uri + path)
      await setAuthStatus(data)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  const tracksRequest = async () => {
    try {
      const { data } = await axios.get(uri + "recent_tracks")
      await setTracks(data.body)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleResetClick = () => {
    authorizationRequest("reset")
    console.log(authStatus)
  }

  const handleGetTracksClick = () => {
    tracksRequest()
    console.log("tracks:" + tracks)
  }

  useEffect(() => {
    authorizationRequest("auth")
  }, [])

  const AuthenticationOptions = () => {
    if (!authStatus) return null

    return (
      <div>
        {authStatus.authorized ? (
          <button onClick={handleResetClick}>Log out</button>
        ) : (
          <a href={authStatus.authLink}>
            <button>Log in</button>
          </a>
        )}
        <button onClick={handleGetTracksClick}>Get Tracks!</button>
      </div>
    )
  }

  return (
    <>
      <AuthenticationOptions />
      <Tracks json={tracks} />
    </>
  )
}
