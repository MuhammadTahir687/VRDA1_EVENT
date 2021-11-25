import React, {Component, useEffect, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import Color from "../Color";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { useToast } from 'react-native-styled-toast'
import { ToastContext } from 'react-native-styled-toast'


const CustomToast = ({ text1,show,onPress }) => {
    const {colors}=useTheme();
    const { toast } = useToast()

    useEffect(()=>{
        toast({
            duration: 0,
            accentColor: "red",
            message: "jhgjhgjgj",
            toastStyles: {
                bg: 'white',
            },

            color: 'black',
            iconColor: 'red',
            iconFamily: 'Entypo',
            iconName: 'info',
            closeButtonStyles: {
                // px: 2,
                bg: 'red',
                borderRadius: 50
            },
            closeIconColor: 'white',
            hideAccent: false
        })
    },[])




}
export default CustomToast
