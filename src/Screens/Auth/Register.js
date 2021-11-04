import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
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

const Register = ({navigation}) => {
    const {colors}=useTheme();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [confirmpasswordvalidation,setConfirmpasswordvalidation]=useState('');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [phone,setPhone]=useState('')
    const [phonevalidation,setPhonevalidation]=useState('');
    const [cnic,setCnic]=useState('');
    const [cnicvalidation,setCnicvalidation]=useState('');
    const [country,setCountry]=useState('');
    const [countryvalidation,setCountryvalidation]=useState('');
    const [showicon1,setShowicon1]=useState(false);
    const [showicon2,setShowicon2]=useState(false);
    const [date,setDate]=useState('');
    const [datevalidation,setDatevalidation]=useState('');

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else if (phone==''){setPhonevalidation("Required*")}
        else if (phone.length<7){setPhonevalidation("Phone must be atleast 7 digit")}
        else if(date==''){setDatevalidation("Required*")}
        else if(cnic==''){setCnicvalidation("Required*")}
        else if(country==''){setCountryvalidation("Required*")}
        else{
             setShowicon1(true)
            setShowicon2(true)
            alert("Hello")
        //     setShowicon(true)
        //     const response = await Login_api({email:email,password:password})
        //     if(response.data.status===true){
        //         await save_data("user",response.data)
        //         navigation.navigate("App Tab")
        //     }
        //     else{Toast.show(response.data.message)}
        }

    }
    const emailvalidator = () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==''){setEmailvalidation("Required")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else {setEmailvalidation(''),setShowicon1(true)}
    }
    const passwordvalidator = () => {
        if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else {setPasswordvalidation(''),setShowicon1(true)}
    }
    const confirmpasswordvalidator = () => {
        if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setPasswordvalidation("Password not match")}
        else {setPasswordvalidation(''),setConfirmpasswordvalidation(''),setShowicon2(true)}
    }
    const phonevalidator = () => {
        if (phone==''){setPhonevalidation("Required*")}
        else if (phone.length<7){setPhonevalidation("Phone must be atleast 7 digit")}
        else {setPhonevalidation(''),setShowicon1(true)}
    }
    const datevalidator = () => {
       if(date==''){setDatevalidation("Required*")}
        else {setDatevalidation(''),setShowicon2(true)}
    }
    const cnicvalidator = () => {
         if(cnic==''){setCnicvalidation("Required*")}
        else {setCnicvalidation(''),setShowicon1(true)}
    }
    const countryvalidator = () => {
        if(country==''){setCountryvalidation("Required*")}
        else {setCountryvalidation(''),setShowicon2(true)}
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
            <View style={styles.signinheader}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.signinheadericon}>
                    <Ionicons name="arrow-back" color={Color.white} size={30}/>
                </TouchableOpacity>
                <Text style={[styles.signinheadertext,{color:colors.text}]}>Register</Text>
            </View>
            <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
                <View style={styles.signinmaincontainer}>
                    <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Let's Get Started</Text>
                    <Text>Hello there, register to continue!</Text>

                    <Input  text1={'Username or Email'} text2={"Enter Your Username or Email"}  value1={email} iconname1={"checkmark-circle"} showicon={showicon1} onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                    {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                    <RI text1={"Password"} text2={"Confirm Password"} validation1={passwordvalidation} validation2={confirmpasswordvalidation} value1={password} value2={confirmpassword} showicon1={showicon1} showicon2={showicon2} placeholder1={"Enter Your Password"} placeholder2={"Enter Your Password"} iconname1={"checkmark-circle"} securetextentry1={true} securetextentry2={true} onChangeText1={(text)=>{setPassword(text),setPasswordvalidation('')}} onChangeText2={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}} />
                    <ID text1={"Phone"} text2={"D.O.B"} validation1={phonevalidation} validation2={datevalidation} value1={phone} keyboardtype1={"numeric"} showicon1={showicon1} showicon2={showicon2}  placeholder1={"Enter Your Phone"} date={date} datechange={(date)=>{setDate(date),setDatevalidation('')}} iconname1={"checkmark-circle"} onChangeText1={(text)=>{setPhone(text),setPhonevalidation('')}}/>
                    <RI text1={"CNIC"} text2={"Country"} validation1={cnicvalidation} validation2={countryvalidation} value1={cnic} value2={country} showicon1={showicon1} showicon2={showicon2} placeholder1={"Enter Your CNIC"} placeholder2={"Enter Your Country"} iconname1={"checkmark-circle"} keyboardtype1={"numeric"} onChangeText1={(text)=>{setCnic(text),setCnicvalidation('')}} onChangeText2={(text)=>{setCountry(text),setCountryvalidation('')}}/>

                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("Signin")}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn,marginBottom:10}]}>
                        <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
