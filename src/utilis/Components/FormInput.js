import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";

const Input = ({ text1, text2,text3,onPress2,onChangeText1, onBlur1,value1,backgroundColor,showicon ,color,iconname1 }) => {
    const {colors}=useTheme();
    return (
        <View style={{marginTop:10}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"normal",color:colors.inputinnertext}}>{text1}</Text>
                {text3 && <Text style={{fontWeight:"normal",color:colors.star}}>{text3}</Text>}
            </View>

            <View style={{flex:1,borderWidth:1,padding:(Platform.OS == 'android'?0:14),borderColor:colors.inputinnertext,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.loginbackground2,paddingHorizontal:10,borderRadius:10}} >
                <Ionicons name={iconname1} size={20} color={colors.inputinnertext}/>
            <TextInput
                style={{flex:1,color:colors.inputinnertext}}
                placeholder={text2}
                placeholderTextColor={colors.inputinnertext}
                onChangeText={onChangeText1}
                value={value1}
                onBlur={onBlur1}
            />

            </View>
        </View>
    )
}
export default Input
