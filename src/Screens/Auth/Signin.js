import React,{useState} from "react";
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

const Signin = ({navigation}) => {
    const {colors}=useTheme();
    const [email,setEmail]=useState('talha.akbar366@gmail.com');
    const [password,setPassword]=useState('123456');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [showicon,setShowicon]=useState(false);

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
                } else {
                    Toast.show(response.data.message)
                }
        }else{Toast.show("Invalid Email or Password ")}
        }

    }

    // const emailvalidator = () => {
    //     let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    //   if(email==''){setEmailvalidation("Required")}
    //   else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
    //   else {setEmailvalidation('')}
    // }
    // const passwordvalidator = () => {
    //     if(password==""){setPasswordvalidation("Required*")}
    //     else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
    //     else {setPasswordvalidation('')}
    // }
    //
    return(
       <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
           <View style={styles.signinheader}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.signinheadericon}>
                   <Ionicons name="arrow-back" color={Color.white} size={30}/>
               </TouchableOpacity>
               <Text style={[styles.signinheadertext,{color:colors.text}]}>Login</Text>
           </View>
           <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
               <View style={styles.signinmaincontainer}>
                   <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Welcome Back</Text>
                   <Text>Hello there, Sign in to continue!</Text>

                   <Input  text1={'Username or Email'} text2={"Enter Your Username or Email"} value1={email} iconname1={"checkmark-circle"} showicon={showicon} onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                   {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                   <Input  text1={'Password'} text2={"Enter Your Password"} value1={password}  iconname1={"checkmark-circle"} showicon={showicon} onChangeText1={(text)=>{setPassword(text),setPasswordvalidation('')}} />
                   {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}


                   {/*<View style={styles.signininputcontainer}>*/}
                   {/*    <Text>Username or Email</Text>*/}
                   {/*    <TextInput*/}
                   {/*        style={[styles.signininput,{backgroundColor:colors.inputbg,color:colors.greencolor}]}*/}
                   {/*        placeholder="Enter Your Username or Email"*/}
                   {/*        autoCapitalize={"none"}*/}
                   {/*        value={email}*/}
                   {/*        onChangeText={(text)=>{setEmail(text)}}*/}
                   {/*    />*/}
                   {/*</View>*/}

                   {/*<View style={styles.signininputcontainer}>*/}
                   {/*    <Text>Password</Text>*/}
                   {/*    <TextInput*/}
                   {/*        style={[styles.signininput,{backgroundColor:colors.inputbg}]}*/}
                   {/*        placeholder="Enter Your Password"*/}
                   {/*        secureTextEntry={true}*/}
                   {/*        value={password}*/}
                   {/*        onChangeText={(text)=>{setPassword(text)}}*/}
                   {/*    />*/}
                   {/*</View>*/}
                   <TouchableOpacity>
                       <Text style={[styles.signinfp,{color:colors.errorcolor}]}>Forgot Password?</Text>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn}]}>
                       <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                   </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.sociallogincontainer}>
                   <FontAwesome name="facebook" color="white" size={20} style={[styles.socialloginfbicon,{backgroundColor:"#204d8b"}]}/>
                   <Text style={[styles.socialloginfbtext,{backgroundColor:'#fce3d6'}]}>Signin With Facebook</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sociallogincontainer}>
                   <FontAwesome name="google" color="white" size={20} style={[styles.sociallogingicon,{backgroundColor:"#bd2323"}]}/>
                   <Text style={[styles.socialloginfbtext,{backgroundColor:'#fce3d6'}]}>Signin With Google</Text>
               </TouchableOpacity>

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
