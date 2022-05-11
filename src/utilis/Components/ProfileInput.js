import React from "react";
import {View, Text, TextInput} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import {useTheme} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../Stylesheet/Style";


const PI = ({icon1,icon2,value1,value2,editable1,editable2,keyboardtype1,keyboardtype2,onChangeText1,onBlur1,onChangeText2,onBlur2,text1,text2,placeholder1,placeholder2,icon3,validation2}) => {
    const {colors}=useTheme()
    return(
        <View style={styles.piconatiner}>
            <View style={styles.pi1container}>
                <Ionicons name={icon1} size={21} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>
                <View style={styles.p1textview}>
                    <Text style={[styles.pi1text,{color:colors.profilrtext}]}>{text1}</Text>
                     <TextInput
                        style={[styles.avatarinput,{color:(editable1==false)?"white":colors.profilrtext,borderColor:colors.profilrtext,backgroundColor:(editable1==false)?colors.registerbtn:"transparent"}]}
                        placeholder={placeholder1}
                        onChangeText={onChangeText1}
                        placeholderTextColor={colors.inputtext}
                        onBlur={onBlur1}
                        value={value1}
                        editable={editable1}
                        keyboardType={keyboardtype1}
                    />
                </View>
            </View>
            <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                {icon2 && <Entypo name={icon2} size={21} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>}
                {icon3 && <Ionicons name={icon3} size={21} color="white"style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>}
                <View style={styles.p1textview}>
                    <Text style={[styles.pi1text,{color:colors.profilrtext}]}>{text2}</Text>
                    <TextInput
                        style={[styles.avatarinput,{color:colors.profilrtext,borderColor:colors.profilrtext}]}
                        placeholder={placeholder2}
                        onChangeText={onChangeText2}
                        placeholderTextColor={colors.inputtext}
                        onBlur={onBlur2}
                        value={value2}
                        editable={editable2}
                        keyboardType={keyboardtype2}
                    />
                    {validation2 !='' && <Text style={{color:"red"}}>{validation2}</Text>}
                </View>
            </View>
        </View>
    )

}
export default PI
