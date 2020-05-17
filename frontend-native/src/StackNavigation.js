import React from 'React'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AdditionalDetailScreen from './screens/AdditionalDetailScreen'
import BackButton from './components/navbar/BackButton'
import DrawerNavigator from './DrawerNavigation.js'

const StackNavigator = createStackNavigator(
  {
    //this links to the drawer navigator, which further links to the moviegallery etc.
    Navigation: {
      screen: DrawerNavigator,
      navigationOptions: {
        header: null,
      },
    },
    //this is the additional details screen which you get to when you click on a movie card
    AdditionalDetails: {
      screen: AdditionalDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerLeft: <BackButton navigation={navigation}/> ,
      })
    }
  },
  {
    header: "screen",
  }
);



export default createAppContainer(StackNavigator);
