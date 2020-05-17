import React, { useContext } from 'react';
import { Image, TouchableOpacity, AsyncStorage } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import styled from 'styled-components';
import serverURL from "../../serverURL.js";
import HistoryStore from "../store/HistoryStore";

const StyledText = styled.Text`
  text-align: center;
  padding: 10px;
  font-size: 20px;
  color: #B22222;
  font-weight: bold;
`;

const ImageWrapper = styled.View`
  align-items: center;
`;

const MovieCard = ({ movie, navigation }) => {

  const historyStore = useContext(HistoryStore);

  const movieCardOnPress = () => {
    //Push movietitle to historyStore, crop historyStore to length of 32, and remove duplicates
    historyStore.history = [movie.originalTitle]
      .concat(historyStore.history)
      .slice(0, 32)
      .filter((value, idx, array) => array.indexOf(value) === idx);

    //Save historyStore to AsyncStorage
    AsyncStorage.setItem("history", JSON.stringify(historyStore.history))
      .then(res => {})
      .catch(err => console.log("AsyncStorage error"));

    navigation.navigate("AdditionalDetails", {movie: movie})
  };

  return (
    <>
      <TouchableOpacity onPress={movieCardOnPress}>
        <Card style={{padding: 10, margin: 10}} backgroundColor="#333"  cornerRadius={10}>
          <ImageWrapper>
            <Image style={{height: 400, width: 300}} source={{uri: serverURL + "/img/" + movie.poster}} />
          </ImageWrapper>
          <StyledText>{movie.originalTitle}</StyledText>
        </Card>
      </TouchableOpacity>
    </>
  );
}

export default MovieCard;
