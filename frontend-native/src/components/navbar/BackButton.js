import React from "react"
import Icon from 'react-native-vector-icons/FontAwesome5';

const BackButton = ({ navigation }) => {
  return (
    <Icon name="arrow-alt-circle-left" size={30} color="#900" style={{padding: 0}} backgroundColor="white" onPress={() => {navigation.goBack()}}  />
  )
}

export default BackButton
