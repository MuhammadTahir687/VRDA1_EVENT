import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import {useTheme} from "@react-navigation/native";
import {useDispatch,useSelector} from 'react-redux';
import {setIsDarkTheme,} from "../../Store/MainSlice";


const Login = ({navigation}) => {
    const dispatch=useDispatch();
    const isDarkTheme=useSelector((state:RootState)=>state.themeReducer.isDarkTheme);
    const {colors}=useTheme();
  return(
     <SafeAreaView style={{flex:1,backgroundColor:colors.loginbackground}}>
         <View style={{flex:1,justifyContent:"center"}}>
             <Image source={require('../../Assets/calendar.png')} style={styles.loginimage}/>
         </View>
         <View style={styles.loginhcontainer}>
             <Text style={[styles.welcome,{color:colors.text}]}>Welcome</Text>
             <Text style={[styles.loginh2,{color:colors.text}]}>Life is an Event</Text>
             <Text style={[styles.loginh3,{color:colors.text}]}>Make it Memorable</Text>
         </View>
         <View style={styles.logincontainer3}>
             <TouchableOpacity  onPress={()=>{navigation.navigate("Signin")}} style={[styles.loginbtncontainer1,{backgroundColor:colors.loginbuttonsbg}]}>
                 <Text style={styles.loginbtntext}>Login as a User</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.loginbtncontainer2,{borderColor:colors.loginborder}]}>
                 <Text style={[styles.loginbtntext2,{color:colors.text}]}>Login as a Admin</Text>
             </TouchableOpacity>
             <View style={styles.loginqcontainer}>
             <Text style={[styles.loginq,{color:colors.text}]}>Already have an account?</Text>
             <TouchableOpacity><Text style={[styles.loginqbtn,{color:colors.loginsubbtn}]}> Login</Text></TouchableOpacity>
             </View>
             <TouchableOpacity onPress={()=>{dispatch(setIsDarkTheme(!isDarkTheme))}} style={{backgroundColor:colors.background}}>
                 <Text style={{color:colors.text}}>Change Theme</Text>
             </TouchableOpacity>
         </View>
     </SafeAreaView>
  )
}
export default Login
