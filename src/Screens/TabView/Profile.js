import React, {Component, useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    RefreshControl
} from "react-native";
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
import {get_request} from "../../utilis/Api/Requests";
import { useIsFocused } from '@react-navigation/native';
import Loader from "../../utilis/Loader";
import { add } from "lodash";


const Profile = ({navigation}) => {
    const {colors}=useTheme();
    const isFocused = useIsFocused();
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
    const[logincheck,setLogincheck]=useState(true);
    const [loading,setLoading]= useState(false)
    const[profiledata,setProfiledata]=useState('')
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{userinfo(); console.log("ffujfjfjfjgjgjjgjjgjgjj",image)},[isFocused])

    const userinfo = async () => {
        setLoading(true)

        const userdata=await get_data("user")
       // alert(JSON.stringify(userdata.profile.user_id))
        const response=await get_request("/api/user-profile/"+userdata.profile.user_id)
        console.log("GET Profile = ", response)
        setLoading(false)
        if(response.status==true){
            setProfiledata(response.data)
            setName(response.user_name.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()));
            setImage(response.data.picture);
            setCountry(response.data.country);
            setCity(response.data.city);
            setDob(response.data.dob);
            setPhone(response.data.phone);
            setAddress(response.data.address);
            setNationality(response.data.nationality);
            setRole(userdata.user.role);
            setCnic(response.data.cnic);
            setOrganization(response.data.organization);
            setEmail(userdata.user.email)
            console.log("Profile Data =============",response.data.picture)
        }
        else{}
    }
    const refresh = async () => {
        await setRefreshing(true);
        await userinfo();
        setRefreshing(false);
    }

    auth().onAuthStateChanged(async(user)=>{
        if(user){setLogincheck(true)}
        else {setLogincheck(false)}
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
                        .then(keys => AsyncStorage.multiRemove(["user","profile","token"])).then( navigation.replace("Login",{data:"text"}))
                }
                else{
                    await AsyncStorage.getAllKeys()
                        .then(keys => AsyncStorage.multiRemove(["user","profile","token"])).then( navigation.replace("Login",{data:"text"}))
                }
                console.log("sign out")
            } catch (error) {console.error(error);}
    }
    return(
      <SafeAreaView  style={{flex:1}}>
          {refreshing==true?null:<Loader animating={loading}/>}
          <StatusBar backgroundColor={"#000"}/>
        <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
            <ScrollView refreshControl={<RefreshControl progressBackgroundColor={"#fafafa"} colors={['#1CAE81']} refreshing={refreshing} onRefresh={refresh}/>} contentContainerStyle={{flexGrow:1}} style={styles.profilecontainer}>
                <View style={styles.profileheader}>
                    <Text style={[styles.profileheadertext,{color:colors.greencolor}]}>Profile</Text>
                    <TouchableOpacity onPress={()=>{logout()}} style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{color:"white",marginRight:10}}>Log Out</Text>
                        <Feather name="log-out" color="white" size={20}/>
                    </TouchableOpacity>
                </View>

                    <View style={[styles.profileavatar,{backgroundColor:colors.profilebg}]}>
                        <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} source={{uri: "https://event.vrda1.net/"+image +'?' + new Date()}} containerStyle={{backgroundColor:colors.greencolor}}/>
                        <View style={styles.avatartext}>
                            <Text style={[styles.avatarname,{color:colors.greencolor}]}>{name}</Text>
                            <Text style={{color:colors.profilrtext}}>{email}</Text>
                        </View>
                    </View>

                <View style={[styles.profiledetailsection,{backgroundColor:colors.profilebg}]}>
                    <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.greencolor}]}>Detail</Text>
                    <PD icon1={"call"} icon2={"calendar"} text1={'Phone'} text2={phone ?phone:""} text3={"D.O.B"} text4={dob?dob:""}/>
                    <PD icon1={"earth"} icon2={"location"} text1={'Country'} text2={country?country:""} text3={"City"} text4={city?city:""}/>
                    <PD icon1={"location"}  icon2={"user"} text1={'Address'} text2={address ?address:""} text3={"CNIC"} text4={cnic?cnic:""}/>
                    <PD icon1={"business"}   text1={'Nationality'} text2={nationality?nationality:""} text4={""} />

                    {role!=''&& role=="user"?
                        <View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Update Profile",{data:profiledata,name:name,email:email})}} style={[styles.updateprofilebtn,{backgroundColor:colors.registerbtn}]}>
                         <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Detail</Text>
                        </TouchableOpacity>
                            {logincheck !=true? <TouchableOpacity onPress={()=>{navigation.navigate("ResetPassword")}} style={[styles.updateprofilebtn,{backgroundColor:colors.registerbtn,marginTop:10}]}>
                            <Text style={{textAlign:"center",color:colors.registerbtntext}}>Update Password</Text>
                            </TouchableOpacity>:<View></View>}
                        </View>
                        :<View></View>}
                </View>

            </ScrollView>

        </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile
