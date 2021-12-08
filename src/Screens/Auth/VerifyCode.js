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
import {Login_api,verifycode_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TextInput} from "react-native-paper";
import OTPInputView from '@twotalltotems/react-native-otp-input'


const VerifyCode = ({navigation,route}) => {
    const {colors}=useTheme()
    const emailid=route.params.data;
    const check=route.params.screencheck;
    const[code,setCode]=useState('')
    const [value,setValue]=useState(false);

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    const submit = async () => {
        let body={verify_code:code}
      const response =await verifycode_api(body)
        try {
            if(response.data.status==true)
            {
                if(check=="register"){
                    navigation.replace("Login",{data:"text"})
                }
                else {
                    navigation.replace('Home')
                }
            }
            else{Toast.show(response.data.message)}
        }
        catch (e){Toast.show(e)}
    }
    const resendemail =async () => {
      // const response=await
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground2}}>
            <StatusBar backgroundColor={colors.loginbackground2}/>
            <View style={{flex:1,justifyContent:"center"}}>
                { value ==true  || value==null? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>:
                    <Image source={require('../../Assets/White_New_Login.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>
                }
                <View style={{margin:20}}>
                    <Text style={{textAlign:"center",color:colors.inputinnertext,fontWeight:"bold",fontSize:20}}>Verify Your Email</Text>
                    <Text style={{textAlign:"center",color:colors.inputinnertext}}>We sent a verification code to <Text style={{fontWeight:"bold"}}>{emailid}</Text>. Please add the verification code</Text>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginHorizontal:20}}>
                    <OTPInputView
                        style={{width: '90%', height: 100}}
                        pinCount={6}
                        codeInputHighlightStyle={{color:colors.inputinnertext}}
                        codeInputFieldStyle={{borderWidth:1,borderColor:colors.inputinnertext,color:colors.inputinnertext}}
                        onCodeFilled = {(code) => {setCode(code), console.log(`Code is ${code}, you are good to go!`)}}
                    />
                </View>
                <TouchableOpacity onPress={()=>{resendemail()}}  style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginHorizontal:20}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Resend Code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{submit()}}  style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginHorizontal:20}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Verify</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
export default VerifyCode
