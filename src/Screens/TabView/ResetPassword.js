import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Image} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import RI from "../../utilis/Components/RowInput";
import ID from "../../utilis/Components/InputDate";
import {Login_api,changepassword_api} from "../../utilis/Api/Api_controller";
import {get_data, save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import {post_request} from "../../utilis/Api/Requests";
import {TextInput} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ResetPassword = ({navigation}) => {
    const {colors}=useTheme()
    const [email,setEmail]=useState('')
    const [oldpassword,setOldpassword]=useState('');
    const [oldpasswordvalidation,setOldpasswordvalidation]=useState('');
    const [password,setPassword]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [confirmpasswordvalidation,setConfirmpasswordvalidation]=useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [visible2, setVisible2] = useState(true);
    const [loading,setLoading]=useState(false)
    const [value,setValue]=useState(false);

    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    useEffect(()=>{getdata()},[])

    const getdata = async () => {
        const userdata=await get_data('user')
        setEmail(userdata.user.email)
    }

    const submit=async()=>{
        if (oldpassword==''){setOldpasswordvalidation("Required*")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else{

            const body={email:email,old_password:oldpassword,new_password:password,new_confirm_password:confirmpassword}
            const response= await changepassword_api(body)
            console.log("------------",response.data)
            if (response != "Error"){
                if (response.data.status === true) {
                    navigation.replace("Login",{data:"text"})
                }
                else {Toast.show(response.data.message)}
            }else{Toast.show("Something Went Wrong !!! ")}
        }
    }
    return(

        <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground2}}>
            <StatusBar backgroundColor={colors.loginbackground2}/>
            <View style={{flex:1,justifyContent:"center"}}>
                { value ==true  || value==null? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>:
                    <Image source={require('../../Assets/White_New_Login.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center"}}/>
                }
                <View style={{marginHorizontal:20}}>
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
                        value={oldpassword}
                        onChangeText={(text)=>{setOldpassword(text),setOldpasswordvalidation('')}}

                    />
                    {oldpasswordvalidation !='' && <Text style={{color:"red"}}>{oldpasswordvalidation}</Text>}
                    <TextInput
                        label="Password"
                        placeholder={"Enter Password"}
                        mode={"outlined"}
                        secureTextEntry={visible1}
                        selectionColor={colors.inputinnertext}
                        outlineColor={colors.inputinnertext}
                        dense={false}
                        style={{backgroundColor:colors.logininputbg,borderRadius:50,marginTop:20}}
                        theme={{roundness:10,colors:{placeholder:colors.inputinnertext,text:colors.inputinnertext,primary:colors.inputinnertext,secandory:"black",underlineColor:"green"}}}
                        left={<TextInput.Icon name="lock" color={colors.inputinnertext}   />}
                        right={<TextInput.Icon name={show1 === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} onPress={() => {setVisible1(!visible1),setShow1(!show1)}} />}
                        textStyle={{color:"red"}}
                        value={password}
                        onChangeText={(text)=>{setPassword(text),setPasswordvalidation('')}}

                    />
                    {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
                    <TextInput
                        label="Confirm Password"
                        placeholder={"Enter Confirm Password"}
                        mode={"outlined"}
                        secureTextEntry={visible2}
                        selectionColor={colors.inputinnertext}
                        outlineColor={colors.inputinnertext}
                        dense={false}
                        style={{backgroundColor:colors.logininputbg,borderRadius:50,marginTop:20}}
                        theme={{roundness:10,colors:{placeholder:colors.inputinnertext,text:colors.inputinnertext,primary:colors.inputinnertext,secandory:"black",underlineColor:"green"}}}
                        left={<TextInput.Icon name="lock" color={colors.inputinnertext}   />}
                        right={<TextInput.Icon name={show2 === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} onPress={() => {setVisible2(!visible2),setShow2(!show2)}} />}
                        textStyle={{color:"red"}}
                        value={confirmpassword}
                        onChangeText={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}}

                    />
                    {confirmpasswordvalidation!='' && <Text style={{color:"red"}}>{confirmpasswordvalidation}</Text>}
                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginTop:30}]}>
                        <Text style={[styles.loginbtntext1,{color:"white"}]}>Sign in</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>





        // <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
        //     <HB onPress={()=>{ navigation.goBack()}} iconname={"arrow-back"} text1={"Update Password"} />
        //     <View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>
        //         <ScrollView contentContainerStyle={[styles.fpcontainer,{justifyContent:"space-between"}]}>
        //             <View style={{flex:1}}>
        //                 <View>
        //                     <Text style={{marginVertical:10,color:colors.inputtext}}>OLD Password</Text>
        //                     <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
        //                         <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
        //                         <TextInput
        //                             style={{flex:1,color:colors.inputinnertext}}
        //                             placeholder="Enter Your OLD Password"
        //                             placeholderTextColor={colors.inputinnertext}
        //                             value={oldpassword}
        //                             onChangeText={(text)=>{setOldpassword(text),setOldpasswordvalidation('')}}
        //                             secureTextEntry={visible2}
        //                         />
        //                         <TouchableOpacity onPress={() => {setVisible2(!visible2),setShow2(!show2)}}>
        //                             <Ionicons name={show2 === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 {oldpasswordvalidation !='' && <Text style={{color:"red"}}>{oldpasswordvalidation}</Text>}
        //                 <View>
        //                     <Text style={{marginVertical:10,color:colors.inputtext}}>New Password</Text>
        //                     <View style={{flexDirection:"row",alignItems:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
        //                         <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
        //                         <TextInput
        //                             style={{flex:1,color:colors.inputinnertext}}
        //                             placeholder="Enter Your New Password"
        //                             placeholderTextColor={colors.inputinnertext}
        //                             value={password}
        //                             onChangeText={(text)=>{setPassword(text),setPasswordvalidation('')}}
        //                             secureTextEntry={visible}
        //                         />
        //                         <TouchableOpacity onPress={() => {setVisible(!visible),setShow(!show)}}>
        //                             <Ionicons name={show === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
        //                 <View>
        //                     <Text style={{marginVertical:10,color:colors.inputtext}}>Confirm Password</Text>
        //                     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.inputbg,paddingHorizontal:10,borderRadius:10}} >
        //                         <Ionicons name="lock-closed" color={colors.inputinnertext} size={20}/>
        //                         <TextInput
        //                             style={{flex:1,color:colors.inputinnertext}}
        //                             placeholder="Enter Your Confirm Password"
        //                             placeholderTextColor={colors.inputinnertext}
        //                             value={confirmpassword}
        //                             onChangeText={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}}
        //                             secureTextEntry={visible1}
        //                         />
        //                         <TouchableOpacity onPress={() => {setVisible1(!visible1),setShow1(!show1)}}>
        //                             <Ionicons name={show1 === false ? "eye-off-outline" : "eye-outline"} color={colors.inputinnertext} size={20}/>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 {confirmpasswordvalidation !='' && <Text style={{color:"red"}}>{confirmpasswordvalidation}</Text>}
        //             </View>
        //
        //         </ScrollView>
        //         <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{marginHorizontal:10,marginBottom:5,backgroundColor:colors.registerbtn}]}>
        //             <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Password</Text>
        //         </TouchableOpacity>
        //     </View>
        //
        // </SafeAreaView>
    )
}
export default ResetPassword
