import React, {Component, useEffect, useState} from "react";
import {View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView} from "react-native";
import {GoogleSignin, GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';
import {LoginManager} from "react-native-fbsdk-next";
import styles from '../../Stylesheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Avatar} from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import PD from "../../utilis/Components/ProfileDetail";
import {get_data} from "../../utilis/AsyncStorage/Controller";
import {Tooltip} from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({navigation}) => {
    const {colors}=useTheme();
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null);
    const [address,setAddress]=useState('');
    const [country,setCountry]=useState('');
    const [city,setCity]=useState('');
    const [cnic,setCnic]=useState('')
    const [nationality,setNationality]=useState('');
    const [phone,setPhone]=useState('');
    const [dob,setDob]=useState('');
    const [organization,setOrganization]=useState('');
    const [email,setEmail]=useState('');
    const[logincheck,setLogincheck]=useState(true);

    useEffect(()=>{userinfo()},[])

    const userinfo = async () => {
        const userdata=await get_data("user")
        const profiledata=await get_data("profile")
        console.log("********************",userdata.user.picture)
        setName(userdata.user.name);
        setImage(userdata.user.picture);
        setCountry(profiledata.country);
        setCity(profiledata.city);
        setDob(profiledata.dob);
        setPhone(profiledata.phone);
        setAddress(profiledata.address);
        setNationality(profiledata.nationality);
        setRole(userdata.user.role);
        setCnic(profiledata.cnic);
        setOrganization(profiledata.organization);
        setEmail(userdata.user.email)
    }

    auth().onAuthStateChanged(async(user)=>{
        if(user){
            setLogincheck(true)
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$",user)
        }
        else {setLogincheck(false), console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ No User")}

    })
    const logout =async () => {
            try {
                const user= await auth().currentUser;
                if(user!=null){
                    await LoginManager.logOut();
                    // await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    await auth().signOut()
                    await AsyncStorage.getAllKeys()
                        .then(keys => AsyncStorage.multiRemove([user,profile,token])).then( navigation.replace("Login",{data:"text"}))
                }
                else{
                    await AsyncStorage.getAllKeys()
                        .then(keys => AsyncStorage.multiRemove(["user","profile","token"])).then( navigation.replace("Login",{data:"text"}))
                }
                console.log("sign out")
            } catch (error) {console.error(error);}

    }


    return(
      <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
            <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.profilecontainer}>
                <View style={styles.profileheader}>
                    <Text style={[styles.profileheadertext,{color:colors.skincolor}]}>Profile</Text>
                    <TouchableOpacity onPress={()=>{logout()}} style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{color:"white",marginRight:10}}>Log Out</Text>
                        <Feather name="log-out" color="white" size={20}/>
                    </TouchableOpacity>

                </View>

                    <View style={[styles.profileavatar,{backgroundColor:colors.profilebg}]}>
                        <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} source={{uri:"http://emailsend.mirindaweb.com/"+image}} containerStyle={{backgroundColor:colors.skincolor}}/>
                        <View style={styles.avatartext}>
                            <Text style={[styles.avatarname,{color:colors.skincolor}]}>{email}</Text>
                            <Text style={[styles.avatarname,{color:colors.skincolor}]}>{name}</Text>
                            <Text style={{color:colors.profilrtext}}>{role}</Text>
                        </View>
                    </View>

                <View style={[styles.profiledetailsection,{backgroundColor:colors.profilebg}]}>
                    <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.skincolor}]}>Detail</Text>
                    <PD icon1={"call"} icon2={"calendar"} text1={'Phone'} text2={phone?phone:""} text3={"D.O.B"} text4={dob?dob:""}/>
                    <PD icon1={"earth"} icon2={"location"} text1={'Country'} text2={country?country:""} text3={"City"} text4={city?city:""}/>
                    <PD icon1={"location"}  icon2={"user"} text1={'Address'} text2={address?address:""} text3={"CNIC"} text4={cnic?cnic:""}/>
                    <PD icon1={"business"}   text1={'Nationality'} text2={nationality?nationality:""} text4={""} />

                    {role!=''&& role=="user" && logincheck==false ?
                        <View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Update Profile")}} style={[styles.updateprofilebtn,{backgroundColor:colors.registerbtn}]}>
                         <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("ResetPassword")}} style={[styles.updateprofilebtn,{backgroundColor:colors.registerbtn,marginTop:10}]}>
                            <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Password</Text>
                        </TouchableOpacity>
                        </View>

                        :<View></View>}
                </View>

            </ScrollView>

        </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile
