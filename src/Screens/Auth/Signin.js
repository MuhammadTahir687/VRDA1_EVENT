import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import {Login_api} from '../../utilis/Api/Api_controller';
import {save_data,get_data} from '../../utilis/AsyncStorage/Controller';
import Toast from "react-native-simple-toast";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import auth from '@react-native-firebase/auth';
import Google from "../../SocialLogin/Google";
import HB from "../../utilis/Components/HeaderButton";
import FacebookBtn from "../../utilis/Components/Facebook Button";
import GoogleBtn from '../../utilis/Components/GoogleButton'


const Signin = ({navigation}) => {
    const {colors}=useTheme();
    const [email,setEmail]=useState('talha.akbar366@gmail.com');
    const [password,setPassword]=useState('123456');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(()=>{getuserinfo()},[])

    const getuserinfo = ()=>{
      auth()
      .onAuthStateChanged(async(user)=>{
       if(user){console.log("User===========",user)}
       else{console.log("No User")}
      })
    }

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else {
            const response = await Login_api({email: email, password: password})
            console.log(JSON.stringify(response))
            if (response != "Error"){
                if (response.data.status === true) {
                    setShowicon(true)
                    await save_data("user", response.data)
                    navigation.navigate("App Tab")
                }
                else {Toast.show(response.data.message)}
        }else{Toast.show("Invalid Email or Password ")}}
    }

    return(
       <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
           <HB onPress={()=>{navigation.goBack()}} text1={"Login"} />
           <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>

               <View style={styles.signinmaincontainer}>
                   <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Welcome Back</Text>
                   <Text>Hello there, Sign in to continue!</Text>

                   <Input  text1={'Username or Email'} text2={"Enter Your Username or Email"} value1={email} iconname1={"mail"}  onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                   {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}

                   <View style={styles.signininputcontainer}>
                       <Text>Password</Text>
                       <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#efe8e8",paddingHorizontal:10,borderRadius:10}} >
                       <Ionicons name="lock-closed" color={colors.greencolor} size={20}/>
                           <TextInput
                               style={{flex:1,color:colors.greencolor}}
                               placeholder="Enter Your Password"
                               secureTextEntry={true}
                               value={password}
                               onChangeText={(text)=>{setPassword(text)}}
                               secureTextEntry={visible}
                           />
                           <TouchableOpacity onPress={() => {setVisible(!visible),setShow(!show)}}>
                               <Ionicons name={show === false ? "eye-outline" : "eye-off-outline"} color={colors.greencolor} size={20}/>
                           </TouchableOpacity>
                       </View>
                   </View>
                   {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}

                   <TouchableOpacity>
                       <Text style={[styles.signinfp,{color:colors.errorcolor}]}>Forgot Password?</Text>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn}]}>
                       <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                   </TouchableOpacity>
               </View>

               <FacebookBtn onPress={()=>{onFacebookButtonPress()}} text1={"Signin With Facebook"}/>
               <GoogleBtn onPress={()=>{Google()}} text1={"Signin With Google"}/>

           </ScrollView>

           <View style={[styles.signinqcontainer,{backgroundColor:colors.signinfooter}]}>
               <Text style={styles.loginq1}>Don't have an account?</Text>
               <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                   <Text style={[styles.loginqbtn,{color:colors.signinfootertext}]}> Register</Text>
               </TouchableOpacity>
           </View>
       </SafeAreaView>
    )
}
export default Signin
