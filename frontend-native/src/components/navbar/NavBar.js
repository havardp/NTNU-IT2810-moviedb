import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './SearchBar'
import HamburgerButton from './HamburgerButton'
import styled from 'styled-components'
import { Header } from 'react-native-elements'


const NavBar = ({ navigation }) => {
  return (
    <Header
      placement="left"
      leftComponent={<HamburgerButton navigation={navigation}/>}
      centerComponent={{ text: 'Movie DB', style: { color: '#E50914' } }}
      rightComponent={navigation.state.routeName === "MovieGallery" ? <Searchbar /> : null}
      containerStyle={{
        backgroundColor: "#222222",
        justifyContent: 'space-around',
        borderBottomWidth: 0,
      }}
    />
  );
}


export default NavBar;
