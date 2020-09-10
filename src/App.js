import React from "react"
import Authentication from "./components/Authentication"

const App = () => {
  return (
    <div>
      <h1>
        <span role="img" aria-label="handshake">
          🤝🏼
        </span>
        Spotialike
      </h1>
      <Authentication />
    </div>
  )
}

export default App
