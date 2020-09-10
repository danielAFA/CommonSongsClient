import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Tracks from "./Tracks"
import UserSelection from "./UserSelection"

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common["Content-Type"] = "application/json"

const uri = `http://spotialike-server.herokuapp.com/`

export default () => {
  const [authStatus, setAuthStatus] = useState()
  const [tracks, setTracks] = useState()
  const [intReady, setIntReady] = useState()
  const [availableUsers, setAvailableUsers] = useState()
  const [intersectionWith, setIntersectionWith] = useState()

  const tracksRequest = useCallback(async () => {
    try {
      const { data } = await axios.get(uri + "user_tracks")
      setTracks(data.tracks)
      setIntReady(data.intersectionReady)
      setAvailableUsers(data.filteredIds)
      console.log(data.filteredIds)
    } catch (e) {
      console.error(e)
    }
  }, [setTracks, setIntReady, setAvailableUsers])

  const authorizationRequest = useCallback(
    async path => {
      try {
        const { data } = await axios.get(uri + path)
        setAuthStatus(data)
        if (data.authorized) tracksRequest()
      } catch (e) {
        console.error(e)
      }
    },
    [setAuthStatus, tracksRequest]
  )

  const intersectionRequest = async () => {
    console.log(intersectionWith)
    try {
      const { data } = await axios.get(uri + "intersection", {
        params: {
          userId: intersectionWith,
        },
      })
      setTracks(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleResetClick = () => {
    authorizationRequest("reset")
    window.location.reload()
  }

  const handleGetIntersectionClick = () => {
    intersectionRequest()
  }

  useEffect(() => {
    authorizationRequest("auth")
  }, [authorizationRequest])

  const AuthenticationOptions = () => {
    return (
      <div>
        {authStatus.authorized ? (
          <>
            <button onClick={handleResetClick}>Log out</button>
          </>
        ) : (
          <a href={authStatus.authLink}>
            <button>Log in</button>
          </a>
        )}
      </div>
    )
  }

  const IntersectionButton = () => {
    return (
      <>
        {
          <button onClick={handleGetIntersectionClick}>
            Get Intersection!
          </button>
        }
      </>
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
      {intReady && intersectionWith && <IntersectionButton />}
      {tracks && <Tracks trackList={tracks} />}
    </>
  )
}
