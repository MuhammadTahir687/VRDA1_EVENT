import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, TextInput} from "react-native";
import styles from "../../Stylesheet/Style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Avatar} from "react-native-elements";
import PD from "../../utilis/Components/ProfileDetail";
import {useTheme} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import PI from '../../utilis/Components/ProfileInput';
import {get_data} from "../../utilis/AsyncStorage/Controller";
import {Update_profile_api} from '../../utilis/Api/Api_controller';
import Toast from "react-native-simple-toast";
import DatePicker from "react-native-datepicker";
import DI from '../../utilis/Components/InputDatepicker';
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_request} from "../../utilis/Api/Requests";
import Loader from "../../utilis/Loader";
import { CountryCode, Country } from './src/types'
import CountryPicker from "react-native-country-picker-modal";
import {border} from "native-base/lib/typescript/theme/styled-system";



const UpdateProfile = ({navigation,route}) => {
    const {colors}=useTheme();
    const profiledata=route.params.data;
    const username=route.params.name;
    const emailid=route.params.email;
    const [name,setName]=useState(username);
    const [nameValidation,setNamevalidation]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null);
    const [address,setAddress]=useState(profiledata.address);
    const [country,setCountry]=useState(profiledata.country);
    const [city,setCity]=useState(profiledata.city);
    const [cnic,setCnic]=useState(profiledata.cnic)
    const [nationality,setNationality]=useState(profiledata.nationality);
    const [phone,setPhone]=useState(profiledata.phone);
    const [dob,setDob]=useState(profiledata.dob);
    const [organization,setOrganization]=useState('');
    const [email,setEmail]=useState(emailid);
    const [userid,setUserid]=useState(profiledata.user_id);
    const [date,setDate]=useState(profiledata.dob);
    const [filePath, setFilePath] = useState(null);
    const [show,setShow]=useState(false)
    const [loading,setLoading]= useState(false)
    const [countryCode, setCountryCode] = useState('')
    const [withCountryNameButton, setWithCountryNameButton] = useState(true,)
    const [withCountryNameText, setWithCountryNameText] = useState(true,)
    const [withFlag, setWithFlag] = useState(false)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [value,setValue]=useState(false)

    const onSelect = (country: Country) => {setCountryCode(country.cca2),AsyncStorage.setItem("countrycode",JSON.stringify(country.cca2)),setCountry(country.name),console.log(country.cca2)}
    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})
    AsyncStorage.getItem("countrycode").then(countrycode=>{setCountryCode(JSON.parse(countrycode))})


    const onChange = (text) => {
        const input = text;
        if (/^[a-zA-Z ]*$/.test(input) || input == "") {
            setName(input);
        }
    };

    const submit=async ()=>{

        try{
            console.log("Image====",image)
            const data=new FormData();
            data.append("id",userid);
            data.append('name', name)
            data.append("cnic", cnic);
            {date && data.append("dob", date)}
            data.append("phone", phone);
            data.append("address", address);
            data.append("city", city);
            data.append("country", country)
            data.append("nationality", nationality);
            {image && data.append("picture",image)}
            // {image && data.append("picture", {uri:image,name:`photo.jpg`,type:`image/jpg` })}
            if(name.length<3){setNamevalidation("Name must be atleast 3 Alphabets")}
            else{
                const res=await Update_profile_api(data)
                if(res.data[0].status==true){Toast.show("Profile Updated Successfully !!!")}
                else{Toast.show("Something Went Wrong !!!")}
            }
        }
        catch (e) {Toast.show(e)}
    }

    const takephotofromgallery = () => {
        ImagePicker.openPicker({ width: 300, height: 400, cropping: true, })
            .then(image => {setImage(image.path),setShow(true)}).catch((error) => {console.log("error")});
    };
  return(
      <SafeAreaView style={{flex:1}}>
          <Loader animating={loading}/>
          <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
              <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.profilecontainer}>
                  <View style={styles.profileheader}>
                      <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flexDirection:"row",alignItems:"center"}}>
                          <Ionicons name={"arrow-back"} color={colors.skincolor} size={20}  />
                          <Text style={[styles.profileheadertext,{color:colors.skincolor}]}>Profile</Text>
                      </TouchableOpacity>

                      <FontAwesome name="edit" color="white" size={20}/>
                  </View>

                  <View style={[styles.profileavatar,{backgroundColor:colors.profilebg}]}>
                      {show==false ?
                          <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} onPress={()=>{takephotofromgallery()}} source={{uri:"https://event.vrda1.net/"+profiledata.picture+'?' + new Date()}} containerStyle={{backgroundColor:colors.skincolor}}/>
                          :
                          <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} onPress={()=>{takephotofromgallery()}} source={{uri:image}} containerStyle={{backgroundColor:colors.skincolor}}/>
                      }
                      <View style={styles.avatartext}>
                          <TextInput
                              style={[styles.avatarinput,{color:colors.profilrtext,borderColor:colors.profilrtext}]}
                              placeholder="Name"
                              value={name}
                              onChangeText={(text)=>{onChange(text)}}
                          />
                          {nameValidation !='' && <Text style={{color:"red"}}>{nameValidation}</Text>}
                      </View>
                  </View>

                  <View style={[styles.profiledetailsection,{backgroundColor:colors.profilebg}]}>
                      <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.skincolor}]}>Detail</Text>
                      <DI icon1={"call"} icon2={"calendar"} text1={"Phone"} text2={"D.O.B"} keyboardtype1={'phone-pad'} placeholder1={"Phone"} value1={phone?phone:""}  onChangeText1={(text)=>{setPhone(text)}} date={date} datechange={(date)=>setDate(date)}/>
                      <PI icon1={"mail"} icon2={"location"}  editable1={false} editable2={true} text1={"Email"} text2={"City"} placeholder1={"Email"} placeholder2={"City"} value1={email?email:""} value2={city?city:""} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setCity(text)}}/>
                      <PI icon1={"business"} icon2={"user"} editable2={true} text1={"Address"} text2={"CNIC"} placeholder1={"Address"} placeholder2={"CNIC"} value1={address?address:""} keyboardtype2={'phone-pad'} value2={cnic?cnic:""} onChangeText1={(text)=>{setAddress(text)}} onChangeText2={(text)=>{setCnic(text)}}/>{/*<PI icon1={"earth"} icon3={"location"} text1={"Country"} text2={"Nationality"} placeholder1={"country"} placeholder2={"Nationality"}  value1={country?country:""} value2={nationality?nationality:""} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setNationality(text)}}/>*/}

                      <View style={styles.piconatiner}>
                          <View style={styles.pi1container}>
                              <Ionicons name={"earth"} size={21} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>
                              <View style={[styles.p1textview,{borderBottomWidth:1,borderBottomColor:colors.profilrtext}]}>
                                  <Text style={[styles.pi1text,{color:colors.profilrtext}]}>Country</Text>
                                  <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}}>
                                  <CountryPicker
                                      placeholder={<Text style={{color:(value==false)?"#979494":"#979494"}}>Select Country</Text>}
                                      theme={{fontSize:13, primaryColor: 'red', primaryColorVariant: '#eee', backgroundColor: colors.loginbackground2, onBackgroundTextColor: colors.profilrtext, placeholderTextColor: 'red',}}
                                      {...{
                                          countryCode,
                                          withFilter,
                                          // withFlag,
                                          withCountryNameButton,
                                          withCountryNameText,
                                          withAlphaFilter,
                                          withCallingCode,
                                          withEmoji,
                                          onSelect,
                                      }}/>
                                  </ScrollView>
                              </View>
                          </View>
                          <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                          <Ionicons name={"location"} size={21} color="white"style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>
                              <View style={styles.p1textview}>
                                  <Text style={[styles.pi1text,{color:colors.profilrtext}]}>Nationality</Text>
                                  <TextInput
                                      style={[styles.avatarinput,{color:colors.profilrtext,borderColor:colors.profilrtext}]}
                                      placeholder={"Nationality"}
                                      onChangeText={(text)=>{setNationality(text)}}
                                      placeholderTextColor={colors.inputtext}
                                      value={nationality}
                                  />
                              </View>
                          </View>
                      </View>

                      <TouchableOpacity onPress={()=>{submit()}} style={[styles.updateprofilebtn,{backgroundColor:colors.registerbtn}]}>
                          <Text style={{textAlign:"center",color:colors.registerbtntext}}>Save Changes</Text>
                      </TouchableOpacity>
                  </View>

              </ScrollView>

          </ImageBackground>
      </SafeAreaView>

  )
}
export default UpdateProfile
