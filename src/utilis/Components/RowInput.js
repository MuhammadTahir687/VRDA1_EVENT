import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";

const RI = ({ text1, text2,placeholder1,placeholder2,validation1,validation2,onChangeText1,onChangeText2,keyboardtype1,keyboardtype2,securetextentry1,securetextentry2, onBlur1,onBlur2,value1,value2,backgroundColor,showicon1,showicon2 ,color,iconname1,iconname2, }) => {
    const {colors}=useTheme();
    return (
        <View style={styles.rowinputcontainer}>
            <View style={styles.signininputcontainer}>
                <Text style={{color:colors.inputtext}}>{text1}</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:5,borderRadius:10,marginRight:2}} >
                    <Ionicons name={iconname1} size={20} color={colors.inputinnertext}/>
                    <TextInput
                        style={[styles.signininput,{flex:1,color:colors.inputinnertext}]}
                        placeholder={placeholder1}
                        placeholderTextColor={colors.inputtext}
                        secureTextEntry={securetextentry1}
                        onChangeText={onChangeText1}
                        keyboardType={keyboardtype1}
                        value={value1}
                        onBlur={onBlur1}
                    />
                </View>
                {validation1 !='' && <Text style={{color:"red",fontSize:12}}>{validation1}</Text> }
            </View>
            <View style={styles.signininputcontainer}>
                <Text style={{marginLeft:5,color:colors.inputtext}}>{text2}</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:5,borderRadius:10,marginLeft:2.5}} >
                    <Ionicons name={iconname2} size={20} color={colors.inputinnertext}/>
                    <TextInput
                        style={[styles.signininput,{flex:1,color:colors.inputinnertext}]}
                        placeholder={placeholder2}
                        placeholderTextColor={colors.inputtext}
                        secureTextEntry={securetextentry2}
                        keyboardType={keyboardtype2}
                        onChangeText={onChangeText2}
                        value={value2}
                        onBlur={onBlur2}
                    />
                </View>
                {validation2 !='' && <Text style={{color:"red",fontSize:12}}>{validation2}</Text> }
            </View>
        </View>
    )
}
export default RI
