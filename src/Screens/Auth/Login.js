import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, Image, Linking, ScrollView, StatusBar} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import {useTheme} from "@react-navigation/native";
import {useDispatch,useSelector} from 'react-redux';
import {setIsDarkTheme} from "../../Store/MainSlice";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from 'react-native-elements'
import { TextInput } from 'react-native-paper';
import { Icon, SocialIcon } from 'react-native-elements'
import {Login_api} from "../../utilis/Api/Api_controller";
import {useToast} from "react-native-styled-toast";
import auth, {firebase} from '@react-native-firebase/auth';
import Google from "../../SocialLogin/Google";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import Toast from "react-native-simple-toast";



const Login = ({navigation}) => {

    const dispatch=useDispatch();
    const isDarkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme);
    const {colors}=useTheme();
    const { toast } = useToast()
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [email,setEmail]=useState('talha.akbar366@gmail.com');
    const [password,setPassword]=useState('123456');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [token,settoken]=useState(false)
    const [loading,setLoading]=useState(false)

    async  function setTheam(){
        dispatch(setIsDarkTheme(!isDarkTheme))
        // await save_data('savetheme',isDarkTheme)
        await AsyncStorage.setItem(
            "savetheme", JSON.stringify(isDarkTheme)
        );
    }

    useEffect(()=>{getInitialURL()},[])

    const getInitialURL=async()=> {
        const url = await Linking.getInitialURL();
        if (url != null) {
            // console.log("==========================",url)
            navigation.navigate("UpdatePassword")
            return url;
        }
        else{
            //code here
        }
    }

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
                    toast({
                        duration:0,
                        intent:"ERROR",
                        accentColor:"red",
                        message: response.data.message,
                        toastStyles: {
                            bg: 'white',
                        },

                        color: 'black',
                        iconColor: 'red',
                        iconFamily: 'Entypo',
                        iconName: 'info',
                        closeButtonStyles: {
                            // px: 2,
                            bg: 'red',
                            borderRadius: 50
                        },
                        closeIconColor: 'white',
                        hideAccent: false
                    })


                }
            }else{
                // Toast.show("Invalid Email or Password ")
                toast({
                    duration:0,
                    accentColor:"red",
                    message: response.data.message,
                    toastStyles: {
                        bg: 'lightblue',
                        borderRadius: 16
                    },
                    color: 'white',
                    iconColor: 'white',
                    iconFamily: 'Entypo',
                    iconName: 'info',
                    closeButtonStyles: {
                        px: 4,
                        bg: 'darkgrey',
                        borderRadius: 16
                    },
                    closeIconColor: 'white',
                    hideAccent: false
                })

            }
        }
    }


    return(
     <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
         <View style={{flex:1,justifyContent:"center"}}>
             <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>
            <View style={{marginHorizontal:20}}>
                <TextInput
                    label="Email"
                    placeholder={"Enter Email"}
                    selectionColor={"#1CAE81"}
                    outlineColor={"#1CAE81"}
                    dense={false}
                    style={{backgroundColor:"white",borderRadius:50,marginTop:20}}
                    theme={{roundness:10,colors:{placeholder:"#1CAE81",text:"#1CAE81",primary:"#1CAE81",secandory:"black",underlineColor:"green"}}}
                    mode={"outlined"}
                    value={email}
                    onChangeText={(text)=>{setEmail(text),setEmailvalidation('')}}
                    left={<TextInput.Icon name="email" color={"#1CAE81"}  />}

                />
                {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                <TextInput
                    label="Password"
                    placeholder={"Enter Password"}
                    mode={"outlined"}
                    secureTextEntry={visible}
                    selectionColor={"#1CAE81"}
                    outlineColor={"#1CAE81"}
                    dense={false}
                    style={{backgroundColor:"white",borderRadius:50,marginTop:20}}
                    theme={{roundness:10,colors:{placeholder:"#1CAE81",text:"#1CAE81",primary:"#1CAE81",secandory:"black",underlineColor:"green"}}}
                    left={<TextInput.Icon name="lock" color={"#1CAE81"}   />}
                    right={<TextInput.Icon name={show === false ? "eye-off-outline" : "eye-outline"} color={"#1CAE81"} onPress={() => {setVisible(!visible),setShow(!show)}} />}
                    textStyle={{color:"red"}}
                    value={password}
                    onChangeText={(text)=>{setPassword(text),setPasswordvalidation('')}}

                />
                {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
                <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPassword")}}>
                    <Text style={[styles.signinfp,{color:colors.fgp}]}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:"#1CAE81"}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Sign in</Text>
                </TouchableOpacity>

                <Text style={styles.loginor}>or Sign in with</Text>

                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Icon
                        reverse={true}
                        name='facebook'
                        type='fontisto'
                        color='#1CAE81'
                        onPress={()=>{onFacebookButtonPress()}}

                    />
                    <Icon
                        reverse={true}
                        button
                        name='google'
                        type='antdesign'
                        color='#1CAE81'
                        onPress={()=>{Google()}}

                    />
                <TouchableOpacity onPress={()=>{navigation.navigate("vrda1login")}}><Text style={{fontWeight:"bold",fontSize:28,backgroundColor:"#1CAE81",paddingHorizontal:15,color:"white",paddingVertical:5,borderRadius:50,marginLeft:7}}>V</Text></TouchableOpacity>
                </View>
                <View style={[styles.signinqcontainer,{backgroundColor:"transparent"}]}>
                    <Text style={[styles.loginq1,{color:colors.inputtext}]}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                        <Text style={[styles.loginqbtn,{color:'#1CAE81'}]}> Register</Text>
                    </TouchableOpacity>
                </View>
                {token==true &&navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })}
                <TouchableOpacity onPress={setTheam}>
                        <Text style={{color:"black"}}>Change Theme</Text>
                    </TouchableOpacity>
            </View>

         </View>




         {/*<StatusBar backgroundColor={colors.loginbackground1}/>*/}
         {/*<ScrollView contentContainerStyle={{flexGrow:1}}>*/}
         {/*    <View style={{flex:1,paddingTop:"25%",marginHorizontal:10}} >*/}
         {/*    <Image source={require('../../Assets/calendar.png')} style={styles.loginimage}/>*/}
         {/*<View style={styles.loginhcontainer}>*/}
         {/*    <Text style={[styles.welcome,{color:colors.text}]}>Welcome</Text>*/}
         {/*    <Text style={[styles.loginh2,{color:colors.text}]}>Life is an Event</Text>*/}
         {/*    <Text style={[styles.loginh3,{color:colors.text}]}>Make it Memorable</Text>*/}
         {/*</View>*/}
         {/*<View style={styles.logincontainer3}>*/}
         {/*    <TouchableOpacity  onPress={()=>{navigation.navigate("Signin",{data:"text"})}} style={[styles.loginbtncontainer1,{backgroundColor:colors.loginbuttonsbg}]}>*/}
         {/*        <Text style={styles.loginbtntext}>User Login</Text>*/}
         {/*    </TouchableOpacity>*/}
         {/*    <TouchableOpacity onPress={()=>{navigation.navigate("Signin",{data:"admin"})}} style={[styles.loginbtncontainer2,{borderColor:colors.loginborder}]}>*/}
         {/*        <Text style={[styles.loginbtntext2,{color:colors.text}]}>Admin Login</Text>*/}
         {/*    </TouchableOpacity>*/}
             {/*<View style={styles.loginqcontainer}>*/}
             {/*<Text style={[styles.loginq,{color:colors.text}]}>Already have an account?</Text>*/}
             {/*<TouchableOpacity>*/}
             {/*    <Text style={[styles.loginqbtn,{color:colors.loginsubbtn}]}> Login</Text>*/}
             {/*</TouchableOpacity>*/}
             {/*</View>*/}
         {/*    <TouchableOpacity onPress={*/}
         {/*        setTheam*/}
         {/*    }>*/}
         {/*        <Text style={{color:colors.text}}>Change Theme</Text>*/}
         {/*    </TouchableOpacity>*/}
         {/*</View>*/}
         {/*    </View>*/}
         {/*    <Text style={{color:"white",textAlign:"center",bottom:5,fontSize:12}}>Powered by VRDA1.com</Text>*/}
         {/*</ScrollView>*/}

     </SafeAreaView>
  )
}
export default Login
