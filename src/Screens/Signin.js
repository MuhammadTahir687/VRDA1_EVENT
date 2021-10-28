import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
import styles from "../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../utilis/Color";
import {Input} from "../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";

const Signin = ({navigation}) => {
    const {colors}=useTheme();
    return(
       <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
           <View style={styles.signinheader}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.signinheadericon}>
                   <Ionicons name="arrow-back" color={Color.white} size={30}/>
               </TouchableOpacity>
               <Text style={[styles.signinheadertext,{color:colors.text}]}>Login</Text>
           </View>
           <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
               <View style={styles.signinmaincontainer}>
                   <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Welcome Back</Text>
                   <Text>Hello there, Sign in to continue!</Text>

                   <View style={styles.signininputcontainer}>
                       <Text>Username or Email</Text>
                       <TextInput
                           style={[styles.signininput,{backgroundColor:colors.inputbg}]}
                           placeholder="Enter Your Username or Email"
                           autoCapitalize={"none"}
                       />
                   </View>

                   <View style={styles.signininputcontainer}>
                       <Text>Password</Text>
                       <TextInput
                           style={[styles.signininput,{backgroundColor:colors.inputbg}]}
                           placeholder="Enter Your Password"
                           secureTextEntry={true}
                       />
                   </View>
                   <TouchableOpacity>
                       <Text style={[styles.signinfp,{color:colors.errorcolor}]}>Forgot Password?</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.signinbtn,{backgroundColor:colors.signinbtn}]}>
                       <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                   </TouchableOpacity>
               </View>

           </ScrollView>
           <View style={[styles.signinqcontainer,{backgroundColor:colors.text}]}>
               <Text style={styles.loginq1}>Don't have an account?</Text>
               <TouchableOpacity><Text style={[styles.loginqbtn,{color:"orange"}]}> Register</Text></TouchableOpacity>
           </View>
       </SafeAreaView>
    )
}
export default Signin
