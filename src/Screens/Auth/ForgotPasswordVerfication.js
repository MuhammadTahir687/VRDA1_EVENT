import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar} from "react-native";
import styles from "../../Stylesheet/Style";
import {useTheme} from "@react-navigation/native";
import {password_verifycode_api,forgotpassword_api} from "../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useToast} from "react-native-styled-toast";
import SweetAlert from 'react-native-sweet-alert';

const VerifyCodePassword = ({navigation,route}) => {
    const {colors}=useTheme()
    const { toast } = useToast()
    const emailid=route.params.data;
    const check=route.params.screencheck;
    const[code,setCode]=useState('')
    const [value,setValue]=useState(false);
    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    const submit = async () => {
        let body={verify_code:code}
        const response =await password_verifycode_api(body)
        console.log("Poasword Veify Code ===========",response.data)
        try {
            if(response.data.status==true) 
            {
                SweetAlert.showAlertWithOptions({
                    title: '',
                    subTitle: response.data.message,
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                  },
                    callback => navigation.replace("UpdatePassword",{data:"text"}));
                
        }
            else{
                SweetAlert.showAlertWithOptions({
                    title: '',
                    subTitle: response.data.message,
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'warning',
                    cancellable: true
                  });
            
            }
        }
        catch (e){Toast.show(e)}
}
    const resendcode =async () => {
        const response=await forgotpassword_api({email:emailid});
        console.log("475834753489",response.data)
        SweetAlert.showAlertWithOptions({
            title: '',
            subTitle: response.data.message,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'success',
            cancellable: true
          });
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
                <TouchableOpacity onPress={()=>{submit()}}  style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginHorizontal:20}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{resendcode()}}  style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginHorizontal:20}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Resend Code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default VerifyCodePassword
