import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link, NavLink   
  } from 'react-router-dom';
import styled from "styled-components";
import PageTitle from "../PageTitle";
import tanks from "../../img/tanks-01.png";

export const NavBase = styled.nav`
  width: 60%;
  display: flex;
  height: auto;
`;

export const UlBase = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 770px) {
    justify-content: center;
  }
`;

export const LiBase = styled.li`
  padding-right: 2em;
  list-style-type: none;
  font-size: 1.5rem;
`;

function Header() {
    return(
        <header>
            <div>
            <img src={tanks} />
            <PageTitle>Konflikt</PageTitle>
            </div>
          
            <NavBase>
            <UlBase>
                <LiBase>
                    <Link style={{ textDecoration: 'none' }} to="/viz">Datavisualisering</Link>
                </LiBase>
                <LiBase>
                    <Link style={{ textDecoration: 'none' }} to="/">Kart</Link>
                </LiBase>
            </UlBase>
            </NavBase>
        </header>

    )
}

export default Header;