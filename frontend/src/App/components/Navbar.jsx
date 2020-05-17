import React, { useEffect, useContext } from "react";
import { observer, useObservable } from 'mobx-react-lite'
import styled from 'styled-components'
import HamburgerStatus from "../store/HamburgerStore.js"
import SearchBar from "./SearchBar.jsx"
import HamburgerButton from './HamburgerButton'

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #222222;
  padding: 20px;
  position: fixed;
  width: 100%;
  z-index: 1;
  top: ${props => props.visible}
  height: 80px;
  transition: top 0.3s
`

const HeaderWrapper = styled.h4`
  color: #E50914;
`

const Navbar = observer(() => {
  const burger = useContext(HamburgerStatus)
  //using scrollstore for a bolean true or false, which says if the last scroll was downwards or upwards
  //if the last scroll was down, the navbar is hidden, if it was up, the navbar is shown

  const scrollStore = useObservable({
    pos: window.pageYOffset,
    visible: true
  })

  useEffect(()=> {
    window.addEventListener("scroll", handleScroll); //adds the evenlistener on component mount
    return(() => {
       window.removeEventListener("scroll", handleScroll); //removes the event listener on component unmount
    })
  }, [])

  const handleScroll = () => {
    if(!burger.show)
    scrollStore.visible = (scrollStore.pos > window.pageYOffset || window.pageYOffset <= 0);
    scrollStore.pos = window.pageYOffset
  };
  return (
    <>
      <NavbarWrapper visible={scrollStore.visible ? "0px" : "-150px"}>
        <HeaderWrapper>Movie DB</HeaderWrapper>
        <div style={{display: "flex"}}>
          <SearchBar />
          <HamburgerButton />
        </div>
      </NavbarWrapper>
    </>
  );
})

export default Navbar
