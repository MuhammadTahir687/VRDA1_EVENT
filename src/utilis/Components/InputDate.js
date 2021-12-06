import React, { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import styles from "../../Stylesheet/Style";
import DatePicker from "react-native-datepicker";

const ID = ({ text1, text2,text3,text4,validation1,validation2,placeholder1,placeholder2,onChangeText1,onChangeText2,keyboardtype1,keyboardtype2,securetextentry1,securetextentry2, onBlur1,value1,value2,backgroundColor,showicon1,showicon2 ,color,iconname1,iconname2,datechange,date }) => {
    const {colors}=useTheme();
    return (
        <View style={styles.rowinputcontainer}>

            <View style={styles.signininputcontainer}>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"normal",color:colors.inputinnertext}}>{text1}</Text>
                {text3 && <Text style={{fontWeight:"normal",color:colors.star}}>{text3}</Text>}
                </View>
                <View style={{flex:1,borderWidth:1,borderColor:colors.inputinnertext,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.loginbackground2,paddingHorizontal:5,borderRadius:10,marginRight:2}} >
                    <Ionicons name={iconname1} size={20} color={colors.inputinnertext} />
                    <TextInput
                        style={[styles.signininput,{flex:1,color:colors.inputinnertext}]}
                        placeholder={placeholder1}
                        placeholderTextColor={colors.inputinnertext}
                        secureTextEntry={securetextentry1}
                        onChangeText={onChangeText1}
                        keyboardType={keyboardtype1}
                        onBlur={onBlur1}
                    />
                </View>
                {validation1 !='' && <Text style={{color:"red"}}>{validation1}</Text> }
            </View>
            <View style={styles.signininputcontainer}>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"normal",color:colors.inputinnertext}}>{text2}</Text>
                {text4 && <Text style={{fontWeight:"normal",color:colors.star}}>{text4}</Text>}
                </View>
                <View style={{flex:1,borderWidth:1,borderColor:colors.inputinnertext,flexDirection:"row",alignItems:"center",justifyContent:"flex-start",backgroundColor:colors.loginbackground2,borderRadius:10,marginLeft:2.5,}} >
                    <Ionicons name={iconname2} size={20} color={colors.inputinnertext} style={{paddingLeft:6,paddingRight:5}}/>
                    <DatePicker
                        // style={{width:"100%"}}
                        date={date}
                        showIcon={false}
                        placeholder="D.O.B"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateText:{color:colors.inputinnertext},
                            dateInput: { alignItems: "flex-start",borderColor:"#000",borderWidth:0, },
                            placeholderText: {color:colors.inputinnertext},
                        }}
                        onDateChange={datechange}
                    />
                </View>
                {validation2 !='' && <Text style={{color:"red"}}>{validation2}</Text> }
            </View>
        </View>
    )
}
export default ID
