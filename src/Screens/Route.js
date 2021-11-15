import React, {useEffect, useState} from 'react';
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
import ForgotPassword from "./Auth/ForgotPassword";
import UpdatePassword from "./Auth/UpdatePassword";
// import linking from "../Linking";
import {Linking} from 'react-native';


const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        loginbackground: '#1CAE81',
        loginbuttonsbg:"#FAFAFA",
        loginborder:"#FAFAFA",
        loginsubbtn:"orange",
        signinHeader:"#FFA26B",
        signinmain:"#030D0D",
        signinfooter:"#030D0D",
        signinfootertext:"#FFA26B",
        signinh1:"#1CAE81",
        inputbg:"#2C2E2D",
        errorcolor:"red",
        signinbtn:'#082D25',
        registerbtn:'#082D25',
        registerbtntext:"orange",
        text:"#FAFAFA",
        greencolor: '#1CAE81',
        skincolor:"#FFA26B",

        inputtext:"#979494",
        inputinnertext:'#FAFAFA',
        btninnertext:"#fafafa",
        fbcolor:"#FAFAFA",
        fbicon:"#FFA26B",
        fbborder:"#FAFAFA",
        gcolor:"#fafafa",
        fgp:"#FFA26B",
        tabicon:"#FAFAFA",
        loginbackground1:"#000",
        profilebg:"#030D0D",
        profilrtext:"#fafafa"

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
        skincolor:"#FFA26B",

        // inputtext:"#1CAE81",
        inputinnertext:'#1CAE81',
        btninnertext:"#FFA26B",
        fbcolor:"#204d8b",
        fbbgcolor:"#fce3d6",
        fbicon:"#fafafa",
        fbborder:"#fce3d6",
        gcolor:"#b31717",
        fgp:"#ea0e0e",
        tabicon:"#000",
        loginbackground1:"#1CAE81",
        profilebg:"#FAFAFA"

    },
};



const config={
    screens: {
        UpdatePassword:{
            path:"upps/:id",
            parse:{
                id:(id)=>`${id}`,
            }
        },
        Register: 'user',
        Signin:"sign",


    },
}
    const linking={
        prefixes:['https://www.eventapp.com'],
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
              <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
              <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
              <Stack.Screen name="All Events" component={AllEvent}/>
          </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  )
}
export default Route
