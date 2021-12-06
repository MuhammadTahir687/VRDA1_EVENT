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
import {forgotpassword_api, Login_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Icon} from "react-native-elements";
import onFacebookButtonPress from "../../SocialLogin/Facebook";
import Google from "../../SocialLogin/Google";
import {TextInput} from "react-native-paper";


const ForgotPassword = ({navigation}) => {
    const {colors}=useTheme()
    const [email,setEmail]=useState('')
    const [emailvalidation,setEmailvalidation]=useState('')
    const [loading,setLoading]=useState(false)
    const [value,setValue]=useState(false);

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    const submit=async()=>{
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else{
            // AsyncStorage.setItem("email",JSON.stringify(email))
            // const response=await forgotpassword_api({email:email})
            // console.log("475834753489",response.data)

            navigation.replace("UpdatePassword")
            alert("Link snd to the Email !!!")
        }
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
                  {emailvalidation !='' && <Text style={{color:"red",}}>{emailvalidation}</Text>}

                  <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginTop:30}]}>
                      <Text style={[styles.loginbtntext1,{color:"white"}]}>Sign in</Text>
                  </TouchableOpacity>

                  {/*<Text style={[styles.loginor,{color:colors.profilrtext}]}>or Sign in with</Text>*/}

                  {/*<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>*/}
                  {/*    <TouchableOpacity>*/}
                  {/*        <Icon reverse={true} name='facebook' type='fontisto' color={colors.registerbtn} onPress={()=>{onFacebookButtonPress()}}/>*/}
                  {/*    </TouchableOpacity>*/}
                  {/*    <TouchableOpacity>*/}
                  {/*        <Icon reverse={true} button name='google' type='antdesign' color={colors.registerbtn} onPress={()=>{Google()}}/>*/}
                  {/*    </TouchableOpacity>*/}
                  {/*    <TouchableOpacity onPress={()=>{navigation.navigate("vrda1login")}}>*/}
                  {/*        <Text style={{fontWeight:"bold",fontSize:28,backgroundColor:colors.registerbtn,paddingHorizontal:17,color:"white",paddingVertical:7,borderRadius:50,marginLeft:7}}>V</Text>*/}
                  {/*    </TouchableOpacity>*/}
                  {/*</View>*/}

                  {/*<View style={[styles.signinqcontainer,{backgroundColor:"transparent"}]}>*/}
                  {/*    <Text style={[styles.loginq1,{color:colors.profilrtext}]}>Don't have an account?</Text>*/}
                  {/*    <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>*/}
                  {/*        <Text style={[styles.loginqbtn,{color:'#1CAE81'}]}> Register</Text>*/}
                  {/*    </TouchableOpacity>*/}
                  {/*</View>*/}
              </View>
          </View>


          {/*<HB onPress={()=>{navigation.goBack()}} iconname={"arrow-back"} text1={"Forgot Password"} />*/}
          {/*<View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>*/}
          {/*    <View style={[styles.fpcontainer,{justifyContent:"space-between",flex:1}]}>*/}
          {/*        <View>*/}
          {/*            <Text style={{marginVertical:10,color:colors.inputtext}}>Email</Text>*/}
          {/*            <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,borderRadius:10,paddingHorizontal:10}}>*/}
          {/*                <Ionicons name="mail" size={20} color={colors.inputinnertext}/>*/}
          {/*                <TextInput*/}
          {/*                    style={{flex:1,color:colors.inputinnertext}}*/}
          {/*                    placeholderTextColor={colors.inputtext}*/}
          {/*                    placeholder="Enter Your Email"*/}
          {/*                    value={email}*/}
          {/*                    onChangeText={(text)=>{setEmail(text)}}*/}
          {/*                />*/}
          {/*            </View>*/}
          {/*            {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}*/}
          {/*        </View>*/}
          {/*        <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>*/}
          {/*            <Text style={{textAlign:"center",color:colors.registerbtntext}}>Send Email</Text>*/}
          {/*        </TouchableOpacity>*/}
          {/*    </View>*/}
          {/*</View>*/}
      </SafeAreaView>
  )
}
export default ForgotPassword
