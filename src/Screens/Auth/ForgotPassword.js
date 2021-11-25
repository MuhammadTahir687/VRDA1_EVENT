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
import {forgotpassword_api, Login_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ForgotPassword = ({navigation}) => {
    const {colors}=useTheme()
    const [email,setEmail]=useState('')
    const [emailvalidation,setEmailvalidation]=useState('')

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
      <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
          <HB onPress={()=>{navigation.goBack()}} iconname={"arrow-back"} text1={"Forgot Password"} />
          <View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>
              <View style={[styles.fpcontainer,{justifyContent:"space-between",flex:1}]}>
                  <View>
                      <Text style={{marginVertical:10,color:colors.inputtext}}>Email</Text>
                      <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,borderRadius:10,paddingHorizontal:10}}>
                          <Ionicons name="mail" size={20} color={colors.inputinnertext}/>
                          <TextInput
                              style={{flex:1,color:colors.inputinnertext}}
                              placeholderTextColor={colors.inputtext}
                              placeholder="Enter Your Email"
                              value={email}
                              onChangeText={(text)=>{setEmail(text)}}
                          />
                      </View>
                      {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                  </View>
                  <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                      <Text style={{textAlign:"center",color:colors.registerbtntext}}>Send Email</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </SafeAreaView>
  )
}
export default ForgotPassword
