import React from 'react';
import { View, Button } from 'react-native';
import AdvancedView from '../components/AdvancedView'
import NavBar from "../components/navbar/NavBar"
import styled from 'styled-components'

const StyledView = styled.View`
  background-color: #414141;
  flex: 1;
`

const AdvancedViewScreen = ({ navigation }) => {
  return (
    <>
      <StyledView>
        <NavBar navigation={navigation}/>
        <AdvancedView/>
      </StyledView>
    </>
  );
}

export default AdvancedViewScreen;
