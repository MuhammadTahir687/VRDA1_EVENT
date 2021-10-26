import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Image, SafeAreaView, ActivityIndicator } from "react-native";
import {useNavigation} from "@react-navigation/native";

const Splash = ({navigation}) => {
        setTimeout(async () => {
            navigation.replace("Login")
        }, 3000);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require("../Assets/Splash.png")} style={{ width: "100%", height: "100%",alignItems:"center",justifyContent:"center" }}>
                <Image source={require('../Assets/NewLogo.png')} style={{resizeMode:"contain",width:200,height:200}}/>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default Splash;
