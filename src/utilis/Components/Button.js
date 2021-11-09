import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import Color from "../Color";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Btn = ({ text1,iconname,onPress,backgroundColor,size }) => {
    const {colors}=useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={[{flexDirection:"row",alignItems:"center",borderRadius:50,marginHorizontal:5,paddingVertical:5,paddingHorizontal:5},{backgroundColor:backgroundColor}]}>
            <Ionicons name={iconname} size={size} color="white" style={{paddingRight:2}}/>
                <Text style={{color:"white",fontSize:12}}>{text1}</Text>
        </TouchableOpacity>
    )
}
export default Btn
