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
import {Login_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";


const UpdatePassword = ({navigation}) => {
    const {colors}=useTheme()
    const [password,setPassword]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [confirmpasswordvalidation,setConfirmpasswordvalidation]=useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);

    const submit=()=>{
        if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else{
            navigation.replace("Signin",{data:"text"})
            alert("Password Update !!!")
        }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.skincolor}}>
            <HB onPress={()=>{ navigation.replace("Signin",{data:"text"})}} text1={"Update Password"} />
            <View style={[styles.signinmain1,{backgroundColor:colors.signinmain}]}>
                <View style={[styles.fpcontainer,{justifyContent:"space-between",flex:1}]}>
                    <View style={{flex:1}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{marginVertical:10}}>Password</Text>
                            <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"#efe8e8",paddingHorizontal:10,borderRadius:10}} >
                                <Ionicons name="lock-closed" color={colors.greencolor} size={20}/>
                                <TextInput
                                    style={{flex:1,color:colors.greencolor}}
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChangeText={(text)=>{setPassword(text)}}
                                    secureTextEntry={visible}
                                />
                                <TouchableOpacity onPress={() => {setVisible(!visible),setShow(!show)}}>
                                    <Ionicons name={show === false ? "eye-off-outline" : "eye-outline"} color={colors.greencolor} size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {passwordvalidation !='' && <Text style={{color:"red"}}>{passwordvalidation}</Text>}
                        <View>
                            <Text style={{marginVertical:10}}>Confirm Password</Text>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#efe8e8",paddingHorizontal:10,borderRadius:10}} >
                                <Ionicons name="lock-closed" color={colors.greencolor} size={20}/>
                                <TextInput
                                    style={{flex:1,color:colors.greencolor}}
                                    placeholder="Enter Your Confirm Password"
                                    value={confirmpassword}
                                    onChangeText={(text)=>{setConfirmpassword(text)}}
                                    secureTextEntry={visible1}
                                />
                                <TouchableOpacity onPress={() => {setVisible1(!visible1),setShow1(!show1)}}>
                                    <Ionicons name={show1 === false ? "eye-off-outline" : "eye-outline"} color={colors.greencolor} size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {confirmpasswordvalidation !='' && <Text style={{color:"red"}}>{confirmpasswordvalidation}</Text>}
                    </View>
                    <TouchableOpacity onPress={()=>{submit()}}  style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default UpdatePassword
