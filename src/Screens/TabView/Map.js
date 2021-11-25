import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput, FlatList} from 'react-native';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from "moment";
import Fontisto from "react-native-vector-icons/Fontisto";
import {get_request} from "../../utilis/Api/Requests";
import {Coming_Events} from "../../utilis/Api/Api_controller";
import MapView from 'react-native-maps';

const MAP = ({navigation}) => {
    const {colors}=useTheme();
  return(
      <SafeAreaView style={{flex:1}}>
          <MapView style={{width:"100%",height:"100%"}}
              initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}
          />

      </SafeAreaView>
  )
}
export default MAP
