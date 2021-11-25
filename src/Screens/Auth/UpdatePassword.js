import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Linking} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import RI from "../../utilis/Components/RowInput";
import ID from "../../utilis/Components/InputDate";
import {Login_api,resetpassword_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UpdatePassword = ({navigation}) => {
    const {colors}=useTheme()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [confirmpasswordvalidation,setConfirmpasswordvalidation]=useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);

    AsyncStorage.getItem("email").then(email=>{setEmail(JSON.parse(email))})

    const submit=async ()=>{
        if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else{
            try {
                const body={email:email,password:password,confirm_password:confirmpassword}
                const response=await resetpassword_api(body)
                console.log("=======================",response.data)
                if (response != "Error"){
                    if (response.data.status === true) {
                       Toast.show(response.data.message)
                        navigation.replace("Signin",{data:"text"})
                    }
                    else {Toast.show(response.data.message)}
                }else{Toast.show("Network Error ")}
            }
            catch (e) {
                Toast.show(e)
            }

        }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
            <HB onPress={()=>{ navigation.replace("Login",{data:"text"})}} iconname={"arrow-back"} text1={"Update Password"} />
            <View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>
                <ScrollView contentContainerStyle={[styles.fpcontainer,{justifyContent:"space-between"}]}>
                    <View style={{flex:1}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{marginVertical:10,color:colors.inputtext}}>Password</Text>
                            <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
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
                        <View>
                            <Text style={{marginVertical:10,color:colors.inputtext}}>Confirm Password</Text>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
                                <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
                                <TextInput
                                    style={{flex:1,color:colors.inputinnertext}}
                                    placeholder="Enter Your Confirm Password"
                                    placeholderTextColor={colors.inputinnertext}
                                    value={confirmpassword}
                                    onChangeText={(text)=>{setConfirmpassword(text)}}
                                    secureTextEntry={visible1}
                                />
                                <TouchableOpacity onPress={() => {setVisible1(!visible1),setShow1(!show1)}}>
                                    <Ionicons name={show1 === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {confirmpasswordvalidation !='' && <Text style={{color:"red"}}>{confirmpasswordvalidation}</Text>}
                    </View>

                </ScrollView>
                <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{marginHorizontal:10,marginBottom:10,backgroundColor:colors.registerbtn}]}>
                    <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default UpdatePassword
