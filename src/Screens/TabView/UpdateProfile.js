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


const UpdateProfile = ({navigation}) => {
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
    const [userid,setUserid]=useState('');
    const [date,setDate]=useState('');
    const [filePath, setFilePath] = useState(null);
    const [show,setShow]=useState(false)

    useEffect(()=>{userinfo()},[])

    const userinfo = async () => {
        const userdata=await get_data("user")

        setUserid(userdata.user.id)
        setName(userdata.user.name)
        setCity(userdata.user.city);
        setCnic(userdata.user.cnic);
        setEmail(userdata.user.email);
        setPhone(userdata.user.phone);
        setAddress(userdata.user.address);
        setCountry(userdata.user.country);
        setNationality(userdata.user.nationality);
        setDate(userdata.user.dob)
        setImage(userdata.user.picture)
    }

    const submit=async ()=>{
        try{
            const data=new FormData();
            data.append("id",userid);
            data.append('name', name,);
            data.append("cnic", cnic);
            data.append("dob", date);
            data.append("phone", phone);
            data.append("address", address);
            data.append("city", city);
            data.append("country", country);
            data.append("nationality", nationality);
            {image && data.append("picture", {uri:image,name:`photo.jpg`,type:`image/jpg` })}

            const res=await Update_profile_api(data)
            if(res.data[0].status===true){Toast.show("Profile Updated Successfully !!!")}
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
          <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
              <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.profilecontainer}>
                  <View style={styles.profileheader}>
                      <Text style={[styles.profileheadertext,{color:colors.skincolor}]}>Profile</Text>
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
                              onChangeText={(text)=>{setName(text)}}
                          />
                      </View>
                  </View>

                  <View style={[styles.profiledetailsection,{backgroundColor:colors.profilebg}]}>
                      <Text style={[{fontSize:18,fontWeight:"bold" ,color:colors.skincolor}]}>Detail</Text>
                      <DI icon1={"call"} icon2={"calendar"} text1={"Phone"} text2={"D.O.B"} keyboardtype1={'numeric'} placeholder1={"Phone"} value1={phone?phone:""}  onChangeText1={(text)=>{setPhone(text)}} date={date} datechange={(date)=>setDate(date)}/>
                      <PI icon1={"mail"} icon2={"location"}  editable1={false} editable2={false} text1={"Email"} text2={"City"} placeholder1={"Email"} placeholder2={"City"} value1={email?email:""} value2={city?city:"Not Available"} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setCity(text)}}/>
                      <PI icon1={"business"} icon2={"user"} editable2={false} text1={"Address"} text2={"CNIC"} placeholder1={"Address"} placeholder2={"CNIC"} value1={address?address:""} value2={cnic?cnic:""} onChangeText1={(text)=>{setAddress(text)}} onChangeText2={(text)=>{setCnic(text)}}/>
                      <PI icon1={"earth"} icon3={"location"} text1={"Country"} text2={"Nationality"} placeholder1={"country"} placeholder2={"Nationality"}  value1={country?country:""} value2={nationality?nationality:""} onChangeText1={(text)=>{setCountry(text)}} onChangeText2={(text)=>{setNationality(text)}}/>

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
