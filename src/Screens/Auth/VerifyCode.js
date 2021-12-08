import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import RI from "../../utilis/Components/RowInput";
import ID from "../../utilis/Components/InputDate";
import {Login_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TextInput} from "react-native-paper";
import OTPInputView from '@twotalltotems/react-native-otp-input'


const VerifyCode = ({navigation}) => {
    const {colors}=useTheme()
    const[code,setCode]=useState('')
    const [value,setValue]=useState(false);

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})


    return(

        <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground2}}>
            <StatusBar backgroundColor={colors.loginbackground2}/>
            <View style={{flex:1,justifyContent:"center"}}>
                { value ==true  || value==null? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>:
                    <Image source={require('../../Assets/White_New_Login.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>
                }
                <View style={{alignItems:"center",justifyContent:"center",marginHorizontal:20}}>
                    <OTPInputView
                        style={{width: '90%', height: 100}}
                        pinCount={6}
                        codeInputFieldStyle={{borderWidth:1,borderColor:colors.inputinnertext,color:colors.inputinnertext}}
                    />
                </View>
                <TouchableOpacity  style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginHorizontal:20}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Verify</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
export default VerifyCode
