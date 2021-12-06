import React, { useState, useEffect } from "react";
import {Text, View, ImageBackground, Image, SafeAreaView, ActivityIndicator, StatusBar} from "react-native";
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem("token").then((token) => {
                    if (token == null) {
                        try {
                            navigation.replace("Login");
                            console.log("Success",token);
                        } catch {
                            console.log(error);
                        }

                    } else {
                        try {
                            navigation.replace("App Tab");
                            console.log("ccccccc",token);
                        } catch {
                            console.log(error);
                        }
                    }
                },
            );
        }, 3000);
    }, []);




        // setTimeout(async () => {
        //     navigation.replace("Login")
        // }, 3000);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#1CAE81"}  />
            <ImageBackground source={require("../Assets/Splash.png")} style={{ width: "100%", height: "100%",alignItems:"center",justifyContent:"center" }}>
                <Image source={require('../Assets/NewLogo.png')} style={{resizeMode:"contain",width:200,height:200}}/>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default Splash;
