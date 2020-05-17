import React from 'react';
import { View, Button, KeyboardAvoidingView } from 'react-native';
import { Header } from "react-navigation-stack";
import MovieGallery from '../components/MovieGallery'
import NavBar from "../components/navbar/NavBar"
import HistoryList from "../components/HistoryList.js"
import styled from 'styled-components'

const StyledView = styled.KeyboardAvoidingView`
  background-color: #414141;
  flex: 1;
`

const GalleryScreen = ({ navigation }) => {
  return (
    <>
      <StyledView
        behavior="padding"
        keyboardVerticalOffset={Header.HEIGHT + 24}>
        <NavBar navigation={navigation}/>
        <View>
          <MovieGallery navigation={navigation}/>
          <HistoryList />
        </View>
      </StyledView>
    </>
  );
}

export default GalleryScreen;
