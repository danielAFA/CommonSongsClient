import React from "react"
import styled from "@emotion/styled"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`

const TopNav = () => {
  const Nav = styled.nav`
    background: black;
    font-size: 16px;
    width: 100%;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
      list-style: none;
      margin: 0;
      padding: 5px;
    }

    li {
      color: white;
    }

    a {
      margin-left: 10px;
      color: inherit;
      text-decoration: none;
    }
  `

  const Logo = styled.div`
    font-size: 20px;
    color: black;
    border-radius: 15px;
    background: #1ed761;
    padding-right: 12px;
  `

  return (
    <Nav>
      <ul>
        <li>
          <Logo>
            <span role="img" aria-label="handshake">
              🤝🏼
            </span>
            Spotialike
          </Logo>
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </Nav>
  )
}

const App = () => {
  return (
    <Container>
      <Router>
        <TopNav />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
