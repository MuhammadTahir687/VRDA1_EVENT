import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import {Input} from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";

const Register = ({navigation}) => {
    const {colors}=useTheme();
    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.signinHeader}}>
            <View style={styles.signinheader}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.signinheadericon}>
                    <Ionicons name="arrow-back" color={Color.white} size={30}/>
                </TouchableOpacity>
                <Text style={[styles.signinheadertext,{color:colors.text}]}>Register</Text>
            </View>
            <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
                <View style={styles.signinmaincontainer}>
                    <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Let's Get Started</Text>
                    <Text>Hello there, register to continue!</Text>

                    <View style={styles.signininputcontainer}>
                        <Text>Username or Email</Text>
                        <TextInput
                            style={[styles.signininput,{backgroundColor:colors.inputbg}]}
                            placeholder="Enter Your Username or Email"
                            autoCapitalize={"none"}
                        />
                    </View>
                    <View style={styles.rowinputcontainer}>
                    <View style={styles.signininputcontainer}>
                        <Text>Password</Text>
                        <TextInput
                            style={[styles.signininput,{backgroundColor:colors.inputbg,marginRight:4}]}
                            placeholder="Enter Your Password"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.signininputcontainer}>
                        <Text style={{marginLeft:5}}>Confirm Password</Text>
                        <TextInput
                            style={[styles.signininput,{backgroundColor:colors.inputbg,marginLeft:4}]}
                            placeholder="Enter Your Password"
                            secureTextEntry={true}
                        />
                    </View>
                    </View>
                    <View style={styles.rowinputcontainer}>
                        <View style={styles.signininputcontainer}>
                            <Text>Phone</Text>
                            <TextInput
                                style={[styles.signininput,{backgroundColor:colors.inputbg,marginRight:4}]}
                                placeholder="Enter Your Phone"
                               keyboardType={"numeric"}
                            />
                        </View>
                        <View style={styles.signininputcontainer}>
                            <Text style={{marginLeft:5}}>D.O.B</Text>
                            <TextInput
                                style={[styles.signininput,{backgroundColor:colors.inputbg,marginLeft:4}]}
                                placeholder="Enter Your D.O.B"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={styles.rowinputcontainer}>
                        <View style={styles.signininputcontainer}>
                            <Text>CNIC</Text>
                            <TextInput
                                style={[styles.signininput,{backgroundColor:colors.inputbg,marginRight:4}]}
                                placeholder="Enter Your CNIC"

                            />
                        </View>
                        <View style={styles.signininputcontainer}>
                            <Text style={{marginLeft:5}}>Country</Text>
                            <TextInput
                                style={[styles.signininput,{backgroundColor:colors.inputbg,marginLeft:4}]}
                                placeholder="Enter Your Country"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Signin")}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn,marginBottom:10}]}>
                        <Text style={{textAlign:"center",color:"orange"}}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
