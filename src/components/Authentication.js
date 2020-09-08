import React, { useState, useEffect } from "react"
import axios from "axios"
import Tracks from "./Tracks"
import UserSelection from "./UserSelection"

const serverPort = 8888
const herokuUrl = `https://spotialike-server.herokuapp.com/`
const uri = `http://localhost:${serverPort}/`

export default () => {
  const [authStatus, setAuthStatus] = useState()
  const [tracks, setTracks] = useState()
  const [intReady, setIntReady] = useState()
  const [availableUsers, setAvailableUsers] = useState()
  const [intersectionWith, setIntersectionWith] = useState()

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
      const { data } = await axios.get(uri + "user_tracks")
      console.log(data.tracks)
      setTracks(data.tracks)
      setIntReady(data.intersectionReady)
      setAvailableUsers(data.filteredIds)
    } catch (e) {
      console.error(e)
    }
  }

  const intersectionRequest = async () => {
    try {
      const { data } = await axios.get(uri + "intersection", {
        params: {
          userId: intersectionWith,
        },
      })
      setTracks(data)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleResetClick = () => {
    authorizationRequest("reset")
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
    return (
      <div>
        {authStatus.authorized ? (
          <>
            <button onClick={handleResetClick}>Log out</button>
            <button onClick={handleGetTracksClick}>Get Tracks!</button>
            {intReady && intersectionWith && (
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
      {authStatus && <AuthenticationOptions />}
      {availableUsers && (
        <UserSelection
          availableUsers={availableUsers}
          setIntersectionWith={setIntersectionWith}
        />
      )}
      {tracks && <Tracks trackList={tracks} />}
    </>
  )
}
