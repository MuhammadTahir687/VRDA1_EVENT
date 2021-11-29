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



const UpdateProfile = ({navigation}) => {
    const {colors}=useTheme();
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null);
    const [address,setAddress]=useState('');
    const [country,setCountry]=useState(null);
    const [city,setCity]=useState('');
    const [cnic,setCnic]=useState('')
    const [nationality,setNationality]=useState('');
    const [phone,setPhone]=useState('');
    const [dob,setDob]=useState('');
    const [organization,setOrganization]=useState('');
    const [email,setEmail]=useState('');
    const [userid,setUserid]=useState('');
    const [date,setDate]=useState('');
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

    const onSelect = (country: Country) => {setCountryCode(country.cca2),setCountry(country)}
    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    useEffect(()=>{userinfo()},[])

    const userinfo = async () => {
        setLoading(true)
        const userdata=await get_data("user")
        const response=await get_request("/api/user-profile/"+userdata.user.id)
        console.log("fbjdbgsj",response.data.picture)
        setLoading(false)
        if(response.status==true){
            setUserid(userdata.user.id)
            setName(response.data.first_name + response.data.last_name );
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

        }
        else{
            //Nothing to do
        }
    }

    const onChange = (text) => {
        const input = text;
        if (/^[a-zA-Z]+$/.test(input) || input == "") {
            setName(input);
        }
    };

    const submit=async ()=>{

        try{
            const data=new FormData();
            data.append("id",userid);
            data.append('name', 'name')
            data.append("cnic", cnic);
            {date && data.append("dob", date)}
            data.append("phone", phone);
            data.append("address", address);
            data.append("city", city);
            {country && data.append("country", country.name);}
            data.append("nationality", nationality);
            {image && data.append("picture", {uri:image,name:`photo.jpg`,type:`image/jpg` })}

            const res=await Update_profile_api(data)
            if(res.data[0].status==true){Toast.show("Profile Updated Successfully !!!")}
            else{Toast.show("Something Went Wrong !!!")}
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
                          <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome',}} onPress={()=>{takephotofromgallery()}} source={{uri:"http://emailsend.mirindaweb.com/"+image}} containerStyle={{backgroundColor:colors.skincolor}}/>
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
                      </View>
                  </View>

                  <View style={[styles.profiledetailsection,{backgroundColor:colors.profilebg}]}>
                      <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.skincolor}]}>Detail</Text>
                      <DI icon1={"call"} icon2={"calendar"} text1={"Phone"} text2={"D.O.B"} keyboardtype1={'number-pad'} placeholder1={"Phone"} value1={phone?phone:""}  onChangeText1={(text)=>{setPhone(text)}} date={date} datechange={(date)=>setDate(date)}/>
                      <PI icon1={"mail"} icon2={"location"}  editable1={false} editable2={true} text1={"Email"} text2={"City"} placeholder1={"Email"} placeholder2={"City"} value1={email?email:""} value2={city?city:""} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setCity(text)}}/>
                      <PI icon1={"business"} icon2={"user"} editable2={true} text1={"Address"} text2={"CNIC"} placeholder1={"Address"} placeholder2={"CNIC"} value1={address?address:""} keyboardtype2={'phone-pad'} value2={cnic?cnic:""} onChangeText1={(text)=>{setAddress(text)}} onChangeText2={(text)=>{setCnic(text)}}/>
                      {/*<PI icon1={"earth"} icon3={"location"} text1={"Country"} text2={"Nationality"} placeholder1={"country"} placeholder2={"Nationality"}  value1={country?country:""} value2={nationality?nationality:""} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setNationality(text)}}/>*/}

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
