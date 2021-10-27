import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Input = ({ text1, text2,onChangeText, onBlur,value,backgroundColor, color }) => {
    return (

        <View style={{marginTop:10}}>
            <Text>{text1}</Text>
            <TextInput
                style={{backgroundColor:"#efe8e8",borderRadius:10}}
                placeholder={text2}
                // onChangeText={onChangeText}
                // value={value}
                // onBlur={onBlur}
            />
        </View>
    )
}
export default Input
