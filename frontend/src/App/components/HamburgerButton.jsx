import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import HamburgerStatus from "../store/HamburgerStore.js"
import HamburgerMenu from 'react-hamburger-menu'
import styled from 'styled-components'

const Wrapper = styled.div`
  &:hover{
    cursor:pointer
  }
`

const HamburgerButton = observer(()=> {
  const store = useContext(HamburgerStatus)
  return (
    <Wrapper data-cy={"hamburgerButton"}>
      <HamburgerMenu isOpen={store.show} menuClicked={() => {store.show = !store.show}} color={"#E50914"}/>
    </Wrapper>
  )
})

export default HamburgerButton
