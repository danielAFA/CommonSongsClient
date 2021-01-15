import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const TopNav = () => {
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
  `;

  const Logo = styled.div`
    font-size: 20px;
    color: black;
    border-radius: 15px;
    background: #1ed761;
    padding-right: 12px;
  `;

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
  );
};
