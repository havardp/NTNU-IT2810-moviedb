import React, { useContext } from "react";
import {NavigationActions} from 'react-navigation';
import { Text, View, Picker, ScrollView} from 'react-native';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import RadioForm from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';
import QueryVariableStore from "../store/QueryVariableStore"

const StyledScrollView = styled(ScrollView)`
  background-color: #2C2C2C;
`

const StyledView = styled.View`
  flex: 1;
  background-color: #2C2C2C;
  padding: 40px 0;
`

const StyledButton = styled.Button`
  margin: 10px;
`

const DrawerScreen = observer(({ navigation }) => {
  const store = useContext(QueryVariableStore)
  const genres = ["", "Comedy", "Drama", "Animation", "Action", "Crime", "Horror", "Sci-Fi"]
  var radio_props = [
    {label: 'No genre Specified', value: 0 },
    {label: 'Comedy', value: 1 },
    {label: 'Drama', value: 2 },
    {label: 'Animation', value: 3 },
    {label: 'Action', value: 4 },
    {label: 'Crime', value: 5 },
    {label: 'Horror', value: 6 },
    {label: 'Sci-Fi', value: 7 }
  ];

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  }
  return (
    <StyledScrollView>


    <StyledView>
      <View style={{padding: 5}}>
        <StyledButton title="Movie Gallery"  color={navigation.state.routes[navigation.state.index].routeName == "MovieGallery" ? "#B22222" : "#444"} onPress={navigateToScreen('MovieGallery')}/>
      </View>
      <View style={{padding: 5, paddingBottom: 10}}>
        <StyledButton title="Advanced View" color={navigation.state.routes[navigation.state.index].routeName == "AdvancedView" ? "#B22222" : "#444"} onPress={navigateToScreen('AdvancedView')}/>
      </View>
      <Divider style={{ backgroundColor: 'black', height: 2 }} />
      {navigation.state.routes[navigation.state.index].routeName == "MovieGallery" &&
      <>
        <View style={{flex: 0, flexDirection:"row"}}>
          <Text style={{padding: 13, fontSize:16, color: "#B22222"}}>Sort by: </Text>
          <Picker
            selectedValue={store.sort.columnName}
            style={{color: "red", flex: 1}}
            onValueChange={(itemValue) =>
              store.sort.columnName = itemValue
            }>
            <Picker.Item label="Title" value="originalTitle" />
            <Picker.Item label="Year" value="year" />
          </Picker>
        </View>
        <View style={{flex: 0, flexDirection:"row"}}>
          <Text style={{padding: 13, fontSize:16, color: "#B22222"}}>Order by: </Text>
          <Picker
            selectedValue={store.sort.order}
            style={{color: "red", flex: 1}}
            onValueChange={(itemValue) =>
              store.sort.order = itemValue
            }>
            <Picker.Item label="Ascending" value="asc" />
            <Picker.Item label="Descending" value="desc" />
          </Picker>
        </View>
        <Divider style={{ backgroundColor: 'black', height: 2 }} />
        <View style={{flex: 1}}>
          <Text style={{padding: 13, fontSize:16, color: "#B22222"}}>Filter by genre: </Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => store.genres = genres[value]}
            style={{marginLeft: 40}}
            buttonColor={'#B22222'}
            labelColor={'#B22222'}
            selectedButtonColor={'#B22222'}
            selectedLabelColor={'red'}
          />
        </View>
      </>
      }
    </StyledView>
    </StyledScrollView>
  );
});

export default DrawerScreen;
