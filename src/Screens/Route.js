import React, {useState} from 'react';
import {NavigationContainer,DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useColorScheme } from 'react-native';
import { DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import{useDispatch,useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import Splash from "./Splash";
import Login from './Auth/Login';
import Signin from "./Auth/Signin";
import Register from "./Auth/Register";
import AppTab from "./TabView/TabNavigator";
import EventDetails from "./TabView/EventDetails";
import QRcode from "./TabView/QRcode";
import Profile from "./TabView/Profile";
import UpdateProfile from "./TabView/UpdateProfile";
import AllEvent from "./TabView/AllEvents";
// import linking from "../Linking";
import {Linking} from 'react-native';


const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        loginbackground: '#070707',
        loginbuttonsbg:"#FAFAFA",
        loginborder:"#FAFAFA",
        loginsubbtn:"orange",
        signinHeader:"#000",
        signinmain:"#FFA26B",
        signinfooter:"#FFA26B",
        signinfootertext:"#FAFAFA",
        signinh1:"#1CAE81",
        inputbg:"#FAFAFA",
        errorcolor:"red",
        signinbtn:'#fce3d6',
        registerbtn:'#FAFAFA',
        registerbtntext:"orange",
        text:"#FAFAFA",
        greencolor: '#1CAE81',
        skincolor:"#FFA26B"
    },
};

const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        loginbackground: '#1CAE81',
        loginbuttonsbg:"#FAFAFA",
        loginborder:"#FAFAFA",
        loginsubbtn:"orange",
        signinHeader:"#FFA26B",
        signinmain: "#FAFAFA",
        signinh1:"#1CAE81",
        inputbg:"#e2dcdc",
        errorcolor:"red",
        signinbtn:'#fce3d6',
        signinfooter:"#FAFAFA",
        signinfootertext:"orange",
        registerbtn:'#FFA26B',
        registerbtntext:"#FAFAFA",
        text:"#FAFAFA",
        greencolor: '#1CAE81',
        skincolor:"#FFA26B"
    },
};
const config={
    screens: {
        Register: 'user',
        Signin:"sign"
    },
}
    const linking={
        prefixes:['event://'],

        config,
    }
const Route = () => {

    const scheme = useColorScheme();
    const darkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme)
    const theme= darkTheme?CustomDarkTheme:CustomDefaultTheme;
    const Stack = createNativeStackNavigator();

  return(
      <PaperProvider theme={theme}>
      <NavigationContainer theme={theme} linking={linking}>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false,animation:"slide_from_right"}} >
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Register" component={Register}/>
              <Stack.Screen name="App Tab" component={AppTab}/>
              <Stack.Screen name="Event Detail" component={EventDetails}/>
              <Stack.Screen name="QR Code" component={QRcode}/>
              <Stack.Screen name="Update Profile" component={UpdateProfile}/>
              <Stack.Screen name="All Events" component={AllEvent}/>
          </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  )
}
export default Route
