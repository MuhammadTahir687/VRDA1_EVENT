import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";

const Input = ({ text1, text2,onChangeText1, onBlur1,value1,backgroundColor, color }) => {
    const {colors}=useTheme();
    return (
        <View style={{marginTop:10}}>
            <Text>{text1}</Text>
            <TextInput
                style={{backgroundColor:"#efe8e8",borderRadius:10,color:colors.greencolor}}
                placeholder={text2}
                onChangeText={onChangeText1}
                value={value1}
                onBlur={onBlur1}
            />
        </View>
    )
}
export default Input
