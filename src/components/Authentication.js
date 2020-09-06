import React, { useState, useEffect } from "react"
import axios from "axios"
import Tracks from "./Tracks"

const serverPort = 8888
const uri = `http://localhost:${serverPort}/`

export default () => {
  const [authStatus, setAuthStatus] = useState()
  const [tracks, setTracks] = useState()
  const [intReady, setIntReady] = useState()

  //data = {status: bool, authLink: string}
  const authorizationRequest = async path => {
    try {
      const { data } = await axios.get(uri + path)
      setAuthStatus(data)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  const tracksRequest = async () => {
    try {
      const { data } = await axios.get(uri + "all_tracks")
      console.log(data.tracks)
      setTracks(data.tracks)
      setIntReady(data.intersectionReady)
    } catch (e) {
      console.error(e)
    }
  }

  const intersectionRequest = async () => {
    try {
      const { data } = await axios.get(uri + "intersection")
      setTracks(data)
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
  }

  const handleGetIntersectionClick = () => {
    intersectionRequest()
  }

  useEffect(() => {
    authorizationRequest("auth")
  }, [])

  const AuthenticationOptions = () => {
    if (!authStatus) return null

    return (
      <div>
        {authStatus.authorized ? (
          <>
            <button onClick={handleResetClick}>Log out</button>
            <button onClick={handleGetTracksClick}>Get Tracks!</button>
            {intReady && (
              <button onClick={handleGetIntersectionClick}>
                Get Intersection!
              </button>
            )}
          </>
        ) : (
          <a href={authStatus.authLink}>
            <button>Log in</button>
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      <AuthenticationOptions />
      <Tracks trackList={tracks} />
    </>
  )
}
