import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { observer} from 'mobx-react-lite';
import QueryVariableStore from "../store/QueryVariableStore";
import HistoryStore from "../store/HistoryStore";

const EntryWrapper = styled.View`
  background-color: #222a;
`;

const Entry = styled.View`
  width: 100%;
  padding: 12px;
  background-color: #333a;
  border-bottom-width: 0.5;
  border-bottom-color: #222;
`;

const EntryText = styled.Text`
  font-size: 16;
  color: #aaa;
`;

const HistoryList = observer(() => {
  const store = useContext(QueryVariableStore);

  const historyStore = useContext(HistoryStore);

  //Load history from AsyncStorage and clear history on error.
  AsyncStorage.getItem("history")
    .then(res => JSON.parse(res))
    .then(history => history !== null ? historyStore.history = history : historyStore.history = [])
    .catch(err => historyStore.history = []);

  //Only whow history when search bar is in focus
  if (!store.searchFocused) {
    return (<></>)
  } else {
    return (
      <>
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          overScrollMode="always"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 5, backgroundColor: "#333a", height: "100%", width: "100%"}}>
          <EntryWrapper>
            {
               historyStore.history.map((entry, idx) => (
                <TouchableOpacity
                  onPress={() => {
                    //Search for selected history item
                    store.searchFocused = false;
                    store.search = entry;
                    Keyboard.dismiss();
                  }}
                  key={idx}>
                  <Entry>
                    <EntryText>
                      {entry}
                    </EntryText>
                  </Entry>
                </TouchableOpacity>
              ))
            }
          </EntryWrapper>
        </ScrollView>
      </>
    )
  }
});

export default HistoryList;