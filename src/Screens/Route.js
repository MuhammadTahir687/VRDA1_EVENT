import React, {useEffect, useState} from 'react';
import {NavigationContainer,DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useColorScheme } from 'react-native';
import { DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import{useDispatch,useSelector} from 'react-redux';
import {Alert} from "react-native";
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
import ResetPassword from "./TabView/ResetPassword";
import VerifyCode from './Auth/VerifyCode';
import {Linking} from 'react-native';
import Vrda1Login from '../Screens/Auth/Vrda1Login'
import {get_data} from "../utilis/AsyncStorage/Controller";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setIsDarkTheme} from "../Store/MainSlice";
import {firebase} from '@react-native-firebase/messaging'
import PushNotification from "react-native-push-notification";
import VerifyCodePassword from "./Auth/ForgotPasswordVerfication";

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
        registerbtntext:"#fafafa",
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
        profilrtext:"#fafafa",
        profildatetext:"#fafafa",
        modaltext:"#fafafa",
        modalbg:"#031a03",
        screenbg:"#030D0D",
        screentext:"#fafafa",
        vcolor:"#fafafa",
        loadercolor:"#FAFAFA",
        headercolor:"#082D25",
        qrtext:"#FAFAFA",
        avatarcolor:"#000",
        loginbackground2:"#030D0D",
        logininputbg:"#030D0D",
        star:"#1CAE81",
        eventdetailavatrbg:"#031a03"



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
        signinbtn:'#1CAE81',
        signinfooter:"#FAFAFA",
        signinfootertext:"orange",
        registerbtn:'#1CAE81',
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
        profilebg:"#FAFAFA",
        profildatetext:"#000",
        modaltext:"#000",
        modalbg:"#fafafa",
        screenbg:"#fafafa",
        screentext:"#000",
        vcolor:"#4c4a4a",
        loadercolor:"#FFA26B",
        headercolor:"#1CAE81",
        qrtext:"#FAFAFA",
        avatarcolor:"#fafafa",
        loginbackground2:"#fafafa",
        logininputbg:"#fafafa",
        star:"red",
        profilrtext:"#000",
        eventdetailavatrbg:"#1CAE81"


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
    useEffect(()=>{notification()},[])

    const notification = () => {
        const messaging=firebase.messaging;
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            PushNotification.localNotification({
                channelId: "reminder",
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                smallIcon: remoteMessage.notification.android.imageUrl,
            });
        });
        return unsubscribe;
    }



    const dispatch=useDispatch();
    const isDarkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme);
    const [value,setValue]=useState(isDarkTheme)
            AsyncStorage.getItem("savetheme").then(savetheme=>{console.log("&&&&&&&&&&&", JSON.parse(savetheme))
                setValue(JSON.parse(savetheme))
            })

    const darkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme)
    const scheme = useColorScheme();
    const theme= value==false?CustomDarkTheme:CustomDefaultTheme;
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
              <Stack.Screen name="ResetPassword" component={ResetPassword}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
              <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
              <Stack.Screen name="All Events" component={AllEvent}/>
              <Stack.Screen name="vrda1login" component={Vrda1Login}/>
              <Stack.Screen name='VerifyCode' component={VerifyCode}/>
              <Stack.Screen name= 'VerifyCodePassword' component={VerifyCodePassword}/>
          </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  )
}
export default Route
