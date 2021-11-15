import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";

const Input = ({ text1, text2,onPress2,onChangeText1, onBlur1,value1,backgroundColor,showicon ,color,iconname1 }) => {
    const {colors}=useTheme();
    return (
        <View style={{marginTop:10}}>
            <Text style={{fontWeight:"normal",color:colors.inputtext}}>{text1}</Text>
            <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
                <Ionicons name={iconname1} size={20} color={colors.inputinnertext}/>
            <TextInput
                style={{flex:1,color:colors.inputinnertext}}
                placeholder={text2}
                placeholderTextColor={colors.inputtext}
                onChangeText={onChangeText1}
                value={value1}
                onBlur={onBlur1}
            />

            </View>
        </View>
    )
}
export default Input
