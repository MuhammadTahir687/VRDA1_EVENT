import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Image} from "react-native";
import styles from "../../Stylesheet/Style";
import {useTheme} from "@react-navigation/native";
import {changepassword_api} from "../../utilis/Api/Api_controller";
import {get_data, save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
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
        console.log("Email from async***********",userdata.user.email)
    }


    const submit=async()=>{
        let strongRegex =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
        if (oldpassword==''){setOldpasswordvalidation("Required*")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if(strongRegex.test(password)==false){setPasswordvalidation("Password include (A,a,Special Characters){min 6}")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else{
            const body={email:email,old_password:oldpassword,new_password:password,new_confirm_password:confirmpassword}
            const response= await changepassword_api(body)
            console.log("------------",response.data)
            if (response != "Error"){
                if (response.data.status === true) {
                    navigation.replace("Login")
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
                        label=" Old Password"
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
                        label="New Password"
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
                        <Text style={[styles.loginbtntext1,{color:"white"}]}>Update Password</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}
export default ResetPassword
