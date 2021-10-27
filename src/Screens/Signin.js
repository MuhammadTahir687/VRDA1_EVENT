import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
import styles from "../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../utilis/Color";
import {Input} from "../utilis/Components/FormInput";

const Signin = ({navigation}) => {
    return(
       <SafeAreaView style={{flex:1,backgroundColor:Color.secondary}}>
           <View style={styles.signinheader}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.signinheadericon}>
                   <Ionicons name="arrow-back" color={Color.white} size={30}/>
               </TouchableOpacity>
               <Text style={styles.signinheadertext}>Login</Text>
           </View>
           <ScrollView style={styles.signinmain}>
               <View style={styles.signinmaincontainer}>
                   <Text style={styles.signinmainh1}>Welcome Back</Text>
                   <Text>Hello there, Sign in to continue!</Text>

                   <View style={styles.signininputcontainer}>
                       <Text>Username or Email</Text>
                       <TextInput
                           style={styles.signininput}
                           placeholder="Enter Your Username or Email"
                           autoCapitalize={"none"}
                       />
                   </View>

                   <View style={styles.signininputcontainer}>
                       <Text>Password</Text>
                       <TextInput
                           style={styles.signininput}
                           placeholder="Enter Your Password"
                           secureTextEntry={true}
                       />
                   </View>
                   <TouchableOpacity>
                       <Text style={styles.signinfp}>Forgot Password?</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.signinbtn}>
                       <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                   </TouchableOpacity>
               </View>

           </ScrollView>
           <View style={styles.signinqcontainer}>
               <Text style={styles.loginq1}>Don't have an account?</Text>
               <TouchableOpacity><Text style={styles.loginqbtn}> Register</Text></TouchableOpacity>
           </View>
       </SafeAreaView>
    )
}
export default Signin
