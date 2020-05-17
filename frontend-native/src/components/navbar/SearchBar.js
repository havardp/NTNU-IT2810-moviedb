import React, { useContext, useRef } from "react";
import { View, TextInput, Image, AsyncStorage } from 'react-native';
import { observer, useObservable } from 'mobx-react-lite'
import styled from 'styled-components'
import QueryVariableStore from "../../store/QueryVariableStore"
import { Icon } from 'react-native-elements'
import HistoryStore from "../../store/HistoryStore";

const SearchBarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 0px;
  border-color: red;

  ${({ showSearch }) => showSearch && `
      borderBottomWidth: 1px;
  `}

`

const StyledInput = styled.TextInput`
  width: 160px;
  color: red;
`

const Searchbar = observer(() => {
  const textInput = useObservable({
    inFocus: false
  });

  const store = useContext(QueryVariableStore);
  const historyStore = useContext(HistoryStore);

  const inputEl = useRef(null);

  const saveHistory = ({nativeEvent}) => {
    if (nativeEvent.text !== "") {
      //Push movietitle to historyStore, crop historyStore to length of 32, and remove duplicates
      historyStore.history = [nativeEvent.text]
        .concat(historyStore.history)
        .slice(0, 32)
        .filter((value, idx, array) => array.indexOf(value) === idx);

      //Save historyStore to AsyncStorage
      AsyncStorage.setItem("history", JSON.stringify(historyStore.history))
        .then(res => {})
        .catch(err => console.log("AsyncStorage error"));
    }
  };

  return (
    <>
      <SearchBarWrapper showSearch={store.search !== "" || store.searchFocused}>
        <StyledInput
          keyboardAppearance={"dark"}
          autoComplete="off"
          onFocus={() => store.searchFocused = true}
          onBlur={() => store.searchFocused = false}
          ref={inputEl}
          input={store.search !== "" || store.searchFocused}
          onChangeText={(text) => {
            store.search = text
          }}
          value={store.search}
          onSubmitEditing={saveHistory}
        />
        {
          store.searchFocused == false ? (
            <Icon
              color="#E50914"
              name="search"
              onPress={() => inputEl.current.focus()}
            />
          ) : (
            <Icon
              color="#E50914"
              name="close"
              onPress={() => {inputEl.current.blur(); store.searchFocused = false; store.search = ""}}
            />
          )
        }
      </SearchBarWrapper>
    </>
  );
})

export default Searchbar;
