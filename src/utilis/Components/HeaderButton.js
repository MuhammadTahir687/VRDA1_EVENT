import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import Color from "../Color";

const HB = ({ text1,iconname,onPress }) => {
    const {colors}=useTheme();
    return (
        <View style={styles.signinheader}>
            <TouchableOpacity onPress={onPress} style={styles.signinheadericon}>
                {iconname && <Ionicons name={iconname} color={Color.white} size={30}/>}
            </TouchableOpacity>
            <Text style={[styles.signinheadertext,{color:colors.text}]}>{text1}</Text>
        </View>
    )
}
export default HB
