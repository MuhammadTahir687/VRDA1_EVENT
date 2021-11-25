import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import Color from "../Color";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

const Vrda1Btn = ({ text1,onPress }) => {
    const {colors}=useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={styles.sociallogincontainer}>
            <Entypo name="vimeo" color={colors.fbicon}  size={18} style={[styles.sociallogingicon,{backgroundColor:colors.vcolor}]}/>
            <Text style={[styles.socialloginfbtext,{backgroundColor:colors.fbbgcolor,color:colors.btninnertext,borderWidth:1,borderColor:colors.fbborder}]}>{text1}</Text>
        </TouchableOpacity>
    )
}
export default Vrda1Btn
