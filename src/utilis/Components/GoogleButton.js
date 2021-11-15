import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import Color from "../Color";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const GoogleBtn = ({ text1,onPress }) => {
    const {colors}=useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={styles.sociallogincontainer}>
            <FontAwesome name="google" color={colors.fbicon}  size={20} style={[styles.sociallogingicon,{backgroundColor:colors.gcolor}]}/>
            <Text style={[styles.socialloginfbtext,{backgroundColor:colors.fbbgcolor,color:colors.btninnertext,borderWidth:1,borderColor:colors.fbborder}]}>{text1}</Text>
        </TouchableOpacity>
    )
}
export default GoogleBtn
