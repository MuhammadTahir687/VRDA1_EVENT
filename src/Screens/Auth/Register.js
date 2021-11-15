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
import HB from "../../utilis/Components/HeaderButton";

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
    const [date,setDate]=useState('');
    const [datevalidation,setDatevalidation]=useState('');
    const [name,setName]=useState('');
    const [namevalidation,setNamevalidation]=useState('');
    const [nationality,setNationality]=useState('');
    const [nationalityvalidation,setNationalityvalidation]=useState('');

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(name==''){setNamevalidation('Required*')}
        else if(cnic==''){setCnicvalidation("Required*")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else if (phone==''){setPhonevalidation("Required*")}
        else if (phone.length<7){setPhonevalidation("Phone must be atleast 7 digit")}
        else if(date==''){setDatevalidation("Required*")}
        else if(country==''){setCountryvalidation("Required*")}
        else if(nationality==''){setNationalityvalidation("Required*")}
        else{alert("Hello")}
        }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
            <HB onPress={()=>{navigation.goBack()}} text1={"Register"} />
            <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
                <View style={styles.signinmaincontainer}>
                    <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Let's Get Started</Text>
                    <Text>Hello there, register to continue!</Text>

                    <Input  text1={'Username or Email'} text2={"Enter Your Username or Email"} value1={email} iconname1={"mail"}  onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                    {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                    <RI text1={"Name"} text2={"CNIC"} validation1={namevalidation} validation2={cnicvalidation} value1={name} value2={cnic} placeholder1={"Enter Your Name"} placeholder2={"Enter Your CNIC"} iconname1={"person"} iconname2={"card"}  securetextentry1={false} securetextentry2={false} keyboardtype2={"numeric"} onChangeText1={(text)=>{setName(text),setNamevalidation('')}} onChangeText2={(text)=>{setCnic(text),setCnicvalidation('')}} />
                    <RI text1={"Password"} text2={"Confirm Password"} validation1={passwordvalidation} validation2={confirmpasswordvalidation} value1={password} value2={confirmpassword} placeholder1={"Enter Your Password"} placeholder2={"Enter Your Password"} iconname1={"lock-closed"} iconname2={"lock-closed"}  securetextentry1={true} securetextentry2={true} onChangeText1={(text)=>{setPassword(text),setPasswordvalidation('')}} onChangeText2={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}} />
                    <ID text1={"Phone"} text2={"D.O.B"} validation1={phonevalidation} validation2={datevalidation} value1={phone} keyboardtype1={"numeric"}  placeholder1={"Enter Your Phone"} date={date} datechange={(date)=>{setDate(date),setDatevalidation('')}} iconname1={"call"} iconname2={"calendar"}  onChangeText1={(text)=>{setPhone(text),setPhonevalidation('')}}/>
                    <RI text1={"Country"} text2={"Nationality"} validation1={countryvalidation} validation2={nationalityvalidation} value1={country} value2={nationality}  placeholder1={"Enter Your Country"} placeholder2={"Enter Your Nationality"} iconname1={"earth"} iconname2={"earth"}  onChangeText1={(text)=>{setCountry(text),setCountryvalidation('')}} onChangeText2={(text)=>{setNationality(text),setNationalityvalidation('')}}/>

                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("Signin",{data:"text"})}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn,marginBottom:10}]}>
                        <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
