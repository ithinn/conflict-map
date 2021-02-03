import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link, NavLink   
  } from 'react-router-dom';
import styled from "styled-components";
import PageTitle from "../PageTitle";

export const NavBase = styled.nav`
  width: 60%;
  display: flex;
  border: 1px solid red;
  height: auto;
`;

export const UlBase = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const LiBase = styled.li`
  padding-right: 2em;
  list-style-type: none;
`;

function Header() {
    return(
        <header>
            <PageTitle>Konflikt</PageTitle>
            <UlBase>
                <LiBase>
                    <Link to="/">Datavisualisering</Link>
                </LiBase>
                <LiBase>
                    <Link to="/map">Kart</Link>
                </LiBase>
            </UlBase>
        </header>

    )
}

export default Header;