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


const Vrda1Login = ({navigation}) => {
    const {colors}=useTheme()
    const dispatch=useDispatch();
    const isDarkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [type,setType]=useState('')
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [visible2, setVisible2] = useState(true);
    const [value,setValue]=useState(false);

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    const submit=async()=>{
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else{
            const response = await Login_api({email:email, password:password,type:"vrda1",name:"",user_id:"",first_name:"",last_name:"",phone:"",picture:""})
            console.log(JSON.stringify(response))
            if (response != "Error"){
                if (response.data.status === true) {
                    await save_data("user", response.data)
                    await save_data("profile", response.data.profile)
                    // await save_data("token",response.data.access_token)
                    //  console.log("=============",response.data.profile.adress)
                    // navigation.replace("App Tab")
                    navigation.reset({ index: 0, routes: [{ name: "App Tab" }], })
                }
                else {Toast.show(response.data.message)}
            }else{Toast.show("Invalid Email or Password ")}}
        }

    return(

        <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground2}}>
            <StatusBar backgroundColor={colors.loginbackground2}/>
            <View style={{flex:1,justifyContent:"center"}}>
                { value ==true? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>:
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
                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginTop:30}]}>
                        <Text style={[styles.loginbtntext1,{color:"white"}]}>Sign in</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

        // <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
        //     <HB onPress={()=>{ navigation.goBack()}} iconname={"arrow-back"} text1={"Login"} />
        //     <View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>
        //         {value==true?<Image source={require('../../Assets/VRDa1_hi_Res_logo_Vertical.png')} style={styles.vrda1loginimage}/>
        //             :
        //             <Image source={require('../../Assets/VRDa1_hi_Res_logo_Vertical_white.png')} style={styles.vrda1loginimage}/>
        //
        //         }
        //         <ScrollView contentContainerStyle={[styles.fpcontainer,{justifyContent:"space-between"}]}>
        //             <View style={{flex:1}}>
        //                 <View>
        //                     <Text style={{marginVertical:10,color:colors.inputtext}}>Email</Text>
        //                     <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
        //                         <Ionicons name="mail" color={colors.inputinnertext} size={20}/>
        //                         <TextInput
        //                             style={{flex:1,color:colors.inputinnertext}}
        //                             placeholder="Enter Your Email"
        //                             placeholderTextColor={colors.inputinnertext}
        //                             value={email}
        //                             onChangeText={(text)=>{setEmail(text)}}
        //                         />
        //                     </View>
        //                 </View>
        //                 {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
        //                 <View>
        //                     <Text style={{marginVertical:10,color:colors.inputtext}}>New Password</Text>
        //                     <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
        //                         <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
        //                         <TextInput
        //                             style={{flex:1,color:colors.inputinnertext}}
        //                             placeholder="Enter Your New Password"
        //                             placeholderTextColor={colors.inputinnertext}
        //                             value={password}
        //                             onChangeText={(text)=>{setPassword(text)}}
        //                             secureTextEntry={visible}
        //                         />
        //                         <TouchableOpacity onPress={() => {setVisible(!visible),setShow(!show)}}>
        //                             <Ionicons name={show === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
        //             </View>
        //
        //         </ScrollView>
        //         <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{marginHorizontal:10,marginBottom:5,backgroundColor:colors.registerbtn}]}>
        //             <Text style={{textAlign:"center",color:colors.registerbtntext}}>Sign In</Text>
        //         </TouchableOpacity>
        //     </View>
        //
        // </SafeAreaView>
    )
}
export default Vrda1Login
