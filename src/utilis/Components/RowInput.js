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
                <Text>{text1}</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#efe8e8",paddingHorizontal:5,borderRadius:10,marginRight:2}} >
                    <TextInput
                        style={[styles.signininput,{flex:1,color:colors.greencolor}]}
                        placeholder={placeholder1}
                        secureTextEntry={securetextentry1}
                        onChangeText={onChangeText1}
                        keyboardType={keyboardtype1}
                        value={value1}
                        onBlur={onBlur1}
                    />
                    { showicon1 ==true && <Ionicons name={iconname1} size={15} color="white" style={{backgroundColor:colors.skincolor,borderRadius:100,padding:3}}/>}
                </View>
                {validation1 !='' && <Text style={{color:"red"}}>{validation1}</Text> }
            </View>
            <View style={styles.signininputcontainer}>
                <Text style={{marginLeft:5}}>{text2}</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#efe8e8",paddingHorizontal:5,borderRadius:10,marginLeft:2.5}} >
                    <TextInput
                        style={[styles.signininput,{flex:1,color:colors.greencolor}]}
                        placeholder={placeholder2}
                        secureTextEntry={securetextentry2}
                        keyboardType={keyboardtype2}
                        onChangeText={onChangeText2}
                        value={value2}
                        onBlur={onBlur2}
                    />
                    { showicon2 ==true && <Ionicons name={iconname1} size={15} color="white" style={{backgroundColor:colors.skincolor,borderRadius:100,padding:3}}/>}
                </View>
                {validation2 !='' && <Text style={{color:"red"}}>{validation2}</Text> }
            </View>
        </View>
    )
}
export default RI
