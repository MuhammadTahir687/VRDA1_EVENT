import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, StatusBar} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import {Login_api,forgotpassword_api} from '../../utilis/Api/Api_controller';
import {save_data,get_data} from '../../utilis/AsyncStorage/Controller';
import Toast from "react-native-simple-toast";
// import onFacebookButtonPress from "../../SocialLogin/Facebook";
// import auth, {firebase} from '@react-native-firebase/auth';
// import Google from "../../SocialLogin/Google";
import HB from "../../utilis/Components/HeaderButton";
import FacebookBtn from "../../utilis/Components/Facebook Button";
import GoogleBtn from '../../utilis/Components/GoogleButton';
import Vrda1Btn from '../../utilis/Components/Vrda1Btn'
import Loader from "../../utilis/Loader";
// import { useToast } from 'react-native-styled-toast';
import CustomToast from "../../utilis/Components/Toast";
// import { ToastContext } from 'react-native-styled-toast'


const Signin = ({navigation,route}) => {
    const {colors}=useTheme();
    // const { toast } = useToast()
    const [email,setEmail]=useState('talha.akbar366@gmail.com');
    const [password,setPassword]=useState('123456');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    // const [type,setType]=useState('')
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [loading,setLoading]=useState(false)
    const {data}=route.params;
    const [token,settoken]=useState(false)

      auth()
      .onAuthStateChanged(async(user)=>{
       if(user){
           setLoading(false)
           console.log("User===**********=",user.providerData[0].email)
           console.log("======66666666666666666==========",type)
          const response = await Login_api({email: user.providerData[0].email, password: user.uid,type:type,name:user.displayName,user_id:"",first_name:"",last_name:"",phone:user.phoneNumber,picture:user.photoURL})
           console.log("************************",response.data)
           if (response != "Error"){
               if (response.data.status === true) {
                   await save_data("user", response.data)
                   await save_data("profile", response.data.profile)
                   await save_data("token",response.data.access_token)
                    console.log("=============",response.data.profile.adress)
                   setLoading(false)
                   settoken(true)
                   // navigation.replace("App Tab")
               }
               else { setLoading(false),Toast.show(response.data.message)}
           }else{setLoading(false),Toast.show("Invalid Email or Password ")}

       }
       else{setLoading(false),console.log("No User")}
      },[])

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else {
            const body={email: email, password: password,type:"normal"}
            const response = await Login_api(body)
            console.log(response)
            if (response != "Error"){
                if (response.data.status === true) {
                    await save_data("user", response.data)
                    await save_data("profile", response.data.profile)
                    await save_data("token",response.data.access_token)
                     console.log("=============",response.data)
                    navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })
                    // navigation.replace("App Tab")
                }
                else {
                    // Toast.show(response.data.message)
                    // toast({
                    //     duration:0,
                    //     intent:"ERROR",
                    //     accentColor:"red",
                    //     message: response.data.message,
                    //     toastStyles: {
                    //         bg: 'white',
                    //     },

                    //     color: 'black',
                    //     iconColor: 'red',
                    //     iconFamily: 'Entypo',
                    //     iconName: 'info',
                    //     closeButtonStyles: {
                    //         // px: 2,
                    //         bg: 'red',
                    //         borderRadius: 50
                    //     },
                    //     closeIconColor: 'white',
                    //     hideAccent: false
                    // })


                }
        }else{
                // Toast.show("Invalid Email or Password ")
                // toast({
                //     duration:0,
                //     accentColor:"red",
                //     message: response.data.message,
                //     toastStyles: {
                //         bg: 'lightblue',
                //         borderRadius: 16
                //     },
                //     color: 'white',
                //     iconColor: 'white',
                //     iconFamily: 'Entypo',
                //     iconName: 'info',
                //     closeButtonStyles: {
                //         px: 4,
                //         bg: 'darkgrey',
                //         borderRadius: 16
                //     },
                //     closeIconColor: 'white',
                //     hideAccent: false
                // })

            }
            }
    }

    return(
       <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
           <StatusBar backgroundColor={colors.headercolor}/>
           <Loader animating={loading}/>
           <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
               <HB onPress={()=>{navigation.goBack()}} text1={"Login"} />
               {/*<Image source={require('../../Assets/VRDa1_hi_Res_logo_Vertical_white.png')} style={[styles.vrda1loginimage,{flex:2,marginRight:50}]}/>*/}
           </View>

           <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>

               <View style={styles.signinmaincontainer}>
                   <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Welcome Back</Text>
                   <Text style={{color:colors.inputtext}}>Hello there, Sign in to continue!</Text>

                   <Input  text1={'Email'} text2={"Enter Your Email"} value1={email} iconname1={"mail"}  onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                   {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}

                   <View style={styles.signininputcontainer}>
                       <Text style={{color:colors.inputtext}}>Password</Text>
                       <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
                       <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
                           <TextInput
                               style={{flex:1,color:colors.inputinnertext}}
                               placeholder="Enter Your Password"
                               placeholderTextColor={colors.inputinnertext}
                               value={password}
                               onChangeText={(text)=>{setPassword(text)}}
                               secureTextEntry={visible}
                           />
                           <TouchableOpacity onPress={() => {setVisible(!visible),setShow(!show)}}>
                               <Ionicons name={show === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
                           </TouchableOpacity>
                       </View>
                   </View>
                   {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}

                   {data!="admin" &&
                   <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPassword")}}>
                       <Text style={[styles.signinfp,{color:colors.fgp}]}>Forgot Password?</Text>
                   </TouchableOpacity>}

                   <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn}]}>
                       <Text style={{textAlign:"center",color:colors.btninnertext}}>Sign In</Text>
                   </TouchableOpacity>
               </View>

               {/* {data!="admin" && <FacebookBtn onPress={()=>{onFacebookButtonPress()}} text1={"Facebook"}/>}
               {data!="admin" && <GoogleBtn onPress={()=>{Google()}} text1={"Google"}/>} */}
               {data!="admin" && <Vrda1Btn onPress={()=>{navigation.replace("vrda1login")}} text1={"VRDa1"}/>}

           </ScrollView>
           {token==true &&navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })}

           {data!= 'admin'&& <View style={[styles.signinqcontainer,{backgroundColor:colors.signinfooter}]}>
               <Text style={[styles.loginq1,{color:colors.inputtext}]}>Don't have an account?</Text>
               <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                   <Text style={[styles.loginqbtn,{color:colors.signinfootertext}]}> Register</Text>
               </TouchableOpacity>
           </View>}
       </SafeAreaView>
    )
}
export default Signin
