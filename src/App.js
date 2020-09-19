import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import "./App.css"

const App = () => {
  return (
    <div className="app-container">
      <h1>
        <span role="img" aria-label="handshake">
          🤝🏼
        </span>
        Spotialike
      </h1>

      <Router>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
