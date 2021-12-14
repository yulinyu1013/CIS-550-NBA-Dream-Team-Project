import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const NavBar = () => {
  return(
    <Navbar type="dark" theme="danger" expand="md">
      <NavbarBrand href="/">NBA Dream Team</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/game">
              Game
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/player" >
              Player
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/team" >
              Team
            </NavLink>
          </NavItem>
        </Nav>
  </Navbar>
        )
}

export default NavBar;
