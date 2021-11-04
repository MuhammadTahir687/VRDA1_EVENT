import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";

const Input = ({ text1, text2,onChangeText1, onBlur1,value1,backgroundColor,showicon ,color,iconname1 }) => {
    const {colors}=useTheme();
    return (
        <View style={{marginTop:10}}>
            <Text>{text1}</Text>
            <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#efe8e8",paddingHorizontal:10,borderRadius:10}} >
            <TextInput
                style={{flex:1,color:colors.greencolor}}
                placeholder={text2}
                onChangeText={onChangeText1}
                value={value1}
                onBlur={onBlur1}
            />
                {showicon==true && <Ionicons name={iconname1} size={15} color="white" style={{backgroundColor:colors.skincolor,borderRadius:100,padding:3}} />}
            </View>
        </View>
    )
}
export default Input
