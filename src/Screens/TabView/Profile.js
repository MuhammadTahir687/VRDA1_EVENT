import React, {Component, useEffect, useState} from "react";
import {View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView} from "react-native";
import styles from '../../Stylesheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Avatar} from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import PD from "../../utilis/Components/ProfileDetail";
import {get_data} from "../../utilis/AsyncStorage/Controller";
import {Tooltip} from "react-native-elements";


const Profile = ({navigation}) => {
    const {colors}=useTheme();
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState('');
    const [address,setAddress]=useState('');
    const [country,setCountry]=useState('');
    const [city,setCity]=useState('');
    const [cnic,setCnic]=useState('')
    const [nationality,setNationality]=useState('');
    const [phone,setPhone]=useState('');
    const [dob,setDob]=useState('');
    const [organization,setOrganization]=useState('');
    const [email,setEmail]=useState('');

    useEffect(()=>{userinfo()},[])

    const userinfo = async () => {
        const userdata=await get_data("user")
        setName(userdata.user.name);
        setImage(userdata.user.image);
        setCountry(userdata.user.country);
        setCity(userdata.user.city);
        setDob(userdata.user.dob);
        setPhone(userdata.user.phone);
        setAddress(userdata.user.address);
        setNationality(userdata.user.nationality);
        setRole(userdata.user.role);
        setCnic(userdata.user.cnic);
        setOrganization(userdata.user.organization);
        setEmail(userdata.user.email)
    }

    return(
      <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
            <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.profilecontainer}>
                <View style={styles.profileheader}>
                    <Text style={[styles.profileheadertext,{color:colors.skincolor}]}>Profile</Text>
                    <FontAwesome name="edit" color="white" size={20}/>
                </View>

                    <View style={[styles.profileavatar,{backgroundColor:"white"}]}>
                        <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} containerStyle={{backgroundColor:colors.skincolor}}/>
                        <View style={styles.avatartext}>
                            <Text style={[styles.avatarname,{color:colors.skincolor}]}>{email}</Text>
                            <Text style={[styles.avatarname,{color:colors.skincolor}]}>{name}</Text>
                            <Text>{role}</Text>
                        </View>
                    </View>

                <View style={[styles.profiledetailsection,{backgroundColor:"white"}]}>
                    <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.skincolor}]}>Detail</Text>
                    <PD icon1={"call"} icon2={"calendar"} text1={'Phone'} text2={phone?phone:""} text3={"D.O.B"} text4={dob}/>
                    <PD icon1={"earth"} icon2={"location"} text1={'Country'} text2={country?country:""} text3={"City"} text4={city}/>
                    <PD icon1={"location"}  icon2={"user"} text1={'Address'} text2={address?address:""} text3={"CNIC"} text4={cnic}/>
                    <PD icon1={"business"}   text1={'Nationality'} text2={nationality?nationality:""} text4={""} />

                    {role!=''&& role=="user" ? <TouchableOpacity onPress={()=>{navigation.navigate("Update Profile")}} style={[styles.updateprofilebtn,{backgroundColor:colors.skincolor}]}>
                         <Text style={{textAlign:"center",color:colors.text}}>Update Detail</Text>
                    </TouchableOpacity>:<View></View>}
                </View>

            </ScrollView>

        </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile
