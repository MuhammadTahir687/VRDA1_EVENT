import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Linking,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Platform
} from "react-native";
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
// import {useToast} from "react-native-styled-toast";
import auth, {firebase} from '@react-native-firebase/auth';
import Google from "../../SocialLogin/Google";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import SweetAlert from 'react-native-sweet-alert';
import Loader from "../../utilis/Loader";
import {forgotpassword_api} from "../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";


const Login = ({navigation}) => {

    const dispatch=useDispatch();
    const isDarkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme);
    const {colors}=useTheme();
    // const { toast } = useToast()
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [token,settoken]=useState(false)
    const [loading,setLoading]=useState(false)
    const [value,setValue]=useState(false);
    const[fcmtoken,setFcmtoken]=useState('');

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    async  function setTheam(){
        dispatch(setIsDarkTheme(!isDarkTheme))
        await AsyncStorage.setItem("savetheme", JSON.stringify(isDarkTheme));
    }

    useEffect(()=>{getToken()},[])

    const getToken = async () => {
        try {
            const token = await firebase.messaging().getToken();
            if (token)
                setFcmtoken(token)
                console.log("FCM Token========",token)
        } catch (error) {
            console.log(error);
        }
    }

    auth()
        .onAuthStateChanged(async(user)=>{
            if(user){
                setLoading(true)
                console.log("User===**********=",user.providerData[0].email)
                console.log("======66666666666666666==========",type)
                const response = await Login_api({email: user.providerData[0].email, password: user.uid,type:type,name:user.displayName,user_id:"",first_name:"",last_name:"",phone:user.phoneNumber,picture:user.photoURL,device_token:fcmtoken})
                console.log("************************",response.data)
                if (response != "Error"){
                    if (response.data.status === true) {
                        await save_data("user", response.data)
                        await save_data("profile", response.data.profile)
                        await save_data("token",response.data.access_token)
                        console.log("=============",response.data)
                        setLoading(false)
                        settoken(true)
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
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 character")}
        else {
            setLoading(true)
            const body={email: email, password: password,type:"normal",device_token:fcmtoken}
            const response = await Login_api(body)
            console.log("login =================",response)
            if (response != "Error"){
                if (response.data.status === true) {
                    await save_data("user", response.data)
                    await save_data("profile", response.data.profile)
                    await save_data("token",response.data.access_token)
                    console.log("=============",response.data)
                    setLoading(false)
                    navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })
                }
                else if(response.data.verified==false){
                    setLoading(true)
                    await forgotpassword_api({email:email})
                    navigation.replace("VerifyCode",{data:email,screencheck:"login"})
                }
                else {
                    setLoading(false)
                  { Platform.OS=="android"?
                   SweetAlert.showAlertWithOptions({
                        title: '',
                        subTitle: response.data.message,
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: '#000',
                        otherButtonTitle: 'Cancel',
                        otherButtonColor: '#dedede',
                        style: 'warning',
                        cancellable: true
                      })
                      :
                      alert(response.data.message)
                    }
                }
            }else{
                setLoading(false)
                // toast({duration:0, message: response.data.message, accentColor:"red", toastStyles: {bg: 'lightblue', borderRadius: 16}, color: 'white', iconColor: 'white', iconFamily: 'Entypo', iconName: 'info', closeButtonStyles: {px: 4, bg: 'darkgrey', borderRadius: 16}, closeIconColor: 'white', hideAccent: false})

            }
        }
    }


    return(

     <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground2}}>
         {/*<ActivityIndicator animating={loading} color={"red"} size={"large"} style={{position:"absolute"}} />*/}
         <StatusBar backgroundColor={colors.loginbackground2} barStyle="dark-content" translucent={true}/>
         <Loader animating={loading} />

         <View style={{flex:1,justifyContent:"center"}}>
             { value ==true || value==null ? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>:
                 <Image source={require('../../Assets/White_New_Login.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>
             }
            <View style={{marginHorizontal:20}}>
                <TextInput
                    label="Email"
                    placeholder={"Enter Email"}
                    selectionColor={colors.inputinnertext}
                    outlineColor={colors.inputinnertext}
                    dense={false}
                    style={{backgroundColor:colors.logininputbg,borderRadius:50,marginTop:20}}
                    theme={{roundness:10,colors:{placeholder:colors.inputinnertext,text:colors.inputinnertext,primary:colors.inputinnertext,secandory:"black",underlineColor:"green"}}}
                    mode={"outlined"}
                    value={email}
                    onChangeText={(text)=>{setEmail(text),setEmailvalidation('')}}
                    left={<TextInput.Icon name="email" color={colors.inputinnertext}  />}

                />
                {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                <TextInput
                    label="Password"
                    placeholder={"Enter Password"}
                    mode={"outlined"}
                    secureTextEntry={visible}
                    selectionColor={colors.inputinnertext}
                    outlineColor={colors.inputinnertext}
                    dense={false}
                    style={{backgroundColor:colors.logininputbg,borderRadius:50,marginTop:20}}
                    theme={{roundness:10,colors:{placeholder:colors.inputinnertext,text:colors.inputinnertext,primary:colors.inputinnertext,secandory:"black",underlineColor:"green"}}}
                    left={<TextInput.Icon name="lock" color={colors.inputinnertext}   />}
                    right={<TextInput.Icon name={show === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} onPress={() => {setVisible(!visible),setShow(!show)}} />}
                    textStyle={{color:"red"}}
                    value={password}
                    onChangeText={(text)=>{setPassword(text),setPasswordvalidation('')}}

                />
                {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
                <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPassword")}} style={{alignSelf:"flex-end"}}>
                    <Text style={[styles.signinfp,{color:colors.fgp}]}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn}]}>
                    <Text style={[styles.loginbtntext1,{color:"white"}]}>Sign in</Text>
                </TouchableOpacity>

                <Text style={[styles.loginor,{color:colors.profilrtext}]}>or Sign in with</Text>

                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                  {/* <TouchableOpacity>
                      <Icon reverse={true} name='facebook' type='fontisto' color={colors.registerbtn} onPress={()=>{onFacebookButtonPress()}}/>
                  </TouchableOpacity> */}
                  <TouchableOpacity>
                      <Icon reverse={true} button name='google' type='antdesign' color={colors.registerbtn} onPress={()=>{Google()}}/>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>{navigation.navigate("vrda1login")}}>
                    <Text style={{fontWeight:"bold",fontSize:28,textAlign:"center",paddingTop:(Platform.OS=="ios"?10:7),backgroundColor:colors.registerbtn,paddingHorizontal:0,color:"white",paddingVertical:0,width:50,height:50,borderRadius:50/2,overflow: 'hidden',marginLeft:0}}>V</Text>
                </TouchableOpacity>
                  
               
                </View>
                <View style={[styles.signinqcontainer,{backgroundColor:"transparent"}]}>
                    <Text style={[styles.loginq1,{color:colors.profilrtext}]}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                        <Text style={[styles.loginqbtn,{color:'#1CAE81'}]}> Register</Text>
                    </TouchableOpacity>
                </View>
                {token==true &&navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })}
            </View>
         </View>
     </SafeAreaView>
  )
}
export default Login
