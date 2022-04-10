import React from 'react'
import { Link } from 'react-router-dom';

import logo from '../logo.png';

import { StyledNav, StyledLink, StyledLogo } from '../styles/Header/StyledHeader';

export default function Header() {
  return (
    <StyledNav className="navbar navbar-expand navbar-dark ">
      <Link to={"/"}>
        <StyledLogo src={logo} alt="logo" width={'60px'} />
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <StyledLink to={"/"}>
            Home
          </StyledLink>
        </li>
        <li className="nav-item">
          <StyledLink to={"/products"}>
            CRUD
          </StyledLink>
        </li>
      </div>
    </StyledNav>
  )
}
