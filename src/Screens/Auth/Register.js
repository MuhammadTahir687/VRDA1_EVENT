import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image} from "react-native";
import styles from "../../Stylesheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../../utilis/Color";
import Input from "../../utilis/Components/FormInput";
import {useTheme} from "@react-navigation/native";
import RI from "../../utilis/Components/RowInput";
import ID from "../../utilis/Components/InputDate";
import {Login_api, register_api} from "../../utilis/Api/Api_controller";
import {save_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import HB from "../../utilis/Components/HeaderButton";
import ImagePicker from "react-native-image-crop-picker";
import {post_request} from "../../utilis/Api/Requests";
import Loader from "../../utilis/Loader";
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './src/types'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";

const Register = ({navigation}) => {
    const {colors}=useTheme();
    const [loading,setLoading]= useState(false)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [confirmpasswordvalidation,setConfirmpasswordvalidation]=useState('');
    const [emailvalidation,setEmailvalidation]=useState('');
    const [passwordvalidation,setPasswordvalidation]=useState('');
    const [phone,setPhone]=useState('')
    const [phonevalidation,setPhonevalidation]=useState('');
    const [cnic,setCnic]=useState('');
    const [cnicvalidation,setCnicvalidation]=useState('');
    const [country,setCountry]=useState('');
    const [countryvalidation,setCountryvalidation]=useState('');
    const [date,setDate]=useState('');
    const [datevalidation,setDatevalidation]=useState('');
    const [name,setName]=useState('');
    const [namevalidation,setNamevalidation]=useState('');
    const [nationality,setNationality]=useState('');
    const [nationalityvalidation,setNationalityvalidation]=useState('');
    const [imagename,setImagename]=useState(null)
    const [filePath, setFilePath] = useState(null);
    const [imagevalidation,setImagevalidation]=useState('');
    const [show,setShow]=useState(false)


    const [countryCode, setCountryCode] = useState('')
    const [withCountryNameButton, setWithCountryNameButton] = useState(true,)
    const [withCountryNameText, setWithCountryNameText] = useState(true,)
    const [withFlag, setWithFlag] = useState(false)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [show1,setShow1]=useState(false)
    const [count,setcount]=useState('')
    const [value,setValue]=useState(false)
    const[agecheck,setAgecheck]=useState('');

    const onSelect = (country: Country) => {setCountryCode(country.cca2),AsyncStorage.setItem("countrycode",JSON.stringify(country.cca2)),setCountry(country),setCountryvalidation('')}
    AsyncStorage.getItem("savetheme").then(savetheme=>{setValue(JSON.parse(savetheme))})

    const onChange = (text) => {
        const input = text;
        if (/^[a-zA-Z]+$/.test(input) || input == "") {
            setName(input);
        }
    };

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        let strongRegex =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(name==''){setNamevalidation('Required*')}
        else if(name.length<3){setNamevalidation("Name Must be atleast 3 alphabets")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if(strongRegex.test(password)==false){setPasswordvalidation("Password include (A,a,Special Characters){min 6}")}
        else if (password.length>36){setPasswordvalidation("Password Length Exceeded")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else if (phone==''){setPhonevalidation("Required*")}
        else if (phone.length<7){setPhonevalidation("Phone must be atleast 7 digit")}
        else if(date==''){setDatevalidation("Required*")}
        // else if(agecheck<18){setDatevalidation('Your age must be atleat 18 years')}
        else if(country==''){setCountryvalidation("Required*")}
        else{
            const data=new FormData();
            data.append('name', name,);
            data.append("email", email);
            data.append("password", password);
            data.append("c_password", confirmpassword);
            data.append("cnic", cnic);
            data.append("dob", date);
            data.append("phone", phone);
            data.append("country", country.name);
            data.append("nationality", nationality);
            {filePath && data.append("picture", filePath)}
            setLoading(true)
            const res=await register_api(data)
           if(res !='Error'){
               if(res.data.status==true){
                   setLoading(false);
                   Toast.show(res.data.message);
                   navigation.navigate("VerifyCode",{data:email,screencheck:"register"})
               }
               else{
                setLoading(false)
                   console.log("#######",res)
                   Toast.show(resp.data.message);
                  
               }
           }
        else{
               console.log("####77777###",res)
            Toast.show('The email has already been taken')

        setLoading(false)}
        }
        }
    const takephotofromgallery = () => {
        ImagePicker.openPicker({ width: 300, height: 400, cropping: true, })
            .then(image => {setFilePath(image.path),setShow(true),setImagename(image.path),console.log(image.path)}).catch((error) => {console.log("error")});
    };
    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.headercolor}}>
            <Loader animating={loading}/>
            {/*<HB onPress={()=>{navigation.goBack()}} iconname={"arrow-back"} text1={"Register"} />*/}
            <ScrollView style={[{backgroundColor:colors.signinmain}]}>
                <View style={styles.signinmaincontainer}>
                    {/*<Text>Hello there, register to continue!</Text>*/}
                    { value ==true  || value==null? <Image source={require('../../Assets/New_Logo.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center",marginTop:20}}/>:
                        <Image source={require('../../Assets/White_New_Login.png')} style={{width:150,height:100,resizeMode:"contain",alignSelf:"center",marginTop:20}}/>
                    }
                    <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Register</Text>
                    <Input  text1={'Email'} text2={"Enter Your Email"} text3={"*"} value1={email} iconname1={"mail"}  onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                    {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                    <RI text1={"Name"} text2={"CNIC"} text3={"*"} validation1={namevalidation} validation2={cnicvalidation} value1={name} value2={cnic} placeholder1={"Enter Your Name"} placeholder2={"Enter Your CNIC"} iconname1={"person"} iconname2={"card"}  securetextentry1={false} securetextentry2={false} keyboardtype1={""} keyboardtype2={"phone-pad"} onChangeText1={(text)=>{setNamevalidation('');onChange(text)}} onChangeText2={(text)=>{setCnic(text),setCnicvalidation('')}} />
                    <RI text1={"Password"} text2={"Confirm Password"} text3={"*"} text4={"*"} validation1={passwordvalidation} validation2={confirmpasswordvalidation} value1={password} value2={confirmpassword} placeholder1={"Enter Your Password"} placeholder2={"Enter Your Password"} iconname1={"lock-closed"} iconname2={"lock-closed"}  securetextentry1={true} securetextentry2={true} onChangeText1={(text)=>{setPassword(text),setPasswordvalidation('')}} onChangeText2={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}} />
                    <ID text1={"Phone"} text2={"D.O.B"} text3={"*"} text4={"*"} validation1={phonevalidation} validation2={datevalidation} value1={phone} keyboardtype1={"phone-pad"}  placeholder1={"Enter Your Phone"} date={date} datechange={(date)=>{setDate(date);calculate_age(date);setDatevalidation('')}} iconname1={"call"} iconname2={"calendar"}  onChangeText1={(text)=>{setPhone(text),setPhonevalidation('')}}/>


                    <View style={styles.rowinputcontainer}>
                        <View style={styles.signininputcontainer}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontWeight:"normal",color:colors.inputinnertext}}>Country</Text>
                                <Text style={{fontWeight:"normal",color:colors.star}}>*</Text>
                            </View>
                            <View style={{flex:1,backgroundColor:colors.loginbackground2,borderRadius:10,borderWidth:1,borderColor:colors.inputinnertext,marginRight:2}}>

                            <ScrollView horizontal={true} style={{flexGrow:1,paddingVertical:10,}} contentContainerStyle={{alignItems:"center"}}  >
                                <Ionicons name="earth" size={20} color={colors.inputinnertext} style={{margin:5}}/>
                                <CountryPicker
                                    placeholder={<Text style={{color:(value==false)?"#fafafa":"#1CAE81"}}>Select Country</Text>}
                                    theme={{fontSize:15, primaryColor: 'red', primaryColorVariant: '#eee', backgroundColor: colors.loginbackground2, onBackgroundTextColor: colors.inputinnertext, placeholderTextColor: 'red',}}
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
                            {countryvalidation !='' && <Text style={{color:"red",fontSize:12}}>{countryvalidation}</Text> }
                        </View>
                        <View style={styles.signininputcontainer}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontWeight:"normal",color:colors.inputinnertext}}>Nationality</Text>
                            </View>
                            <View style={{flex:1,borderWidth:1,borderColor:colors.inputinnertext,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:colors.loginbackground2,paddingHorizontal:5,borderRadius:10,marginLeft:2.5}} >
                                <Ionicons name={"earth"} size={20} color={colors.inputinnertext} />
                                <TextInput
                                    style={[styles.signininput,{flex:1,color:colors.inputinnertext}]}
                                    placeholder="Enter Your Nationality"
                                    placeholderTextColor={colors.inputinnertext}
                                    secureTextEntry={false}
                                    onChangeText={(text)=>{setNationality(text),setNationalityvalidation('')}}
                                    value={nationality}
                                />
                            </View>
                            {nationalityvalidation !='' && <Text style={{color:"red",fontSize:12}}>{nationalityvalidation}</Text> }
                        </View>
                    </View>

                   <View style={styles.registerimagecontainer}>
                       <FontAwesome name="file-image-o" color={colors.inputinnertext} size={25} style={{marginRight:5}}/>
                       <View style={[styles.registerimagename,{borderColor:colors.inputinnertext}]}>
                           {show==false ? <Text style={{color:colors.inputinnertext}}>Select Image</Text>: imagename!=null? <Text style={{color:colors.inputinnertext}}>{imagename.slice(71)}</Text> :<Text></Text>}
                           <TouchableOpacity onPress={()=>{setImagename(null),setFilePath(null),setShow(false),setImagevalidation('')}}>
                               <Ionicons name="close" color={colors.inputinnertext} size={20}/>
                           </TouchableOpacity>

                       </View>
                   </View>
                    {imagevalidation !='' && <Text style={{color:"red",fontSize:12}}>{imagevalidation}</Text> }
                    <TouchableOpacity onPress={()=>{takephotofromgallery(),setImagevalidation('')}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Upload Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.loginbtn,{backgroundColor:colors.registerbtn,marginBottom:10}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Register</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
