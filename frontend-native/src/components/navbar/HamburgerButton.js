import React from 'react';
import Hamburger from 'react-native-hamburger';
import { Icon } from 'react-native-elements'

const HamburgerButton = ({ navigation })=> {
  return (
    <Icon
      color="#E50914"
      name="menu"
      onPress={() => navigation.toggleDrawer()}
    />
  )
}

export default HamburgerButton
