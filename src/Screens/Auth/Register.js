import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from "react-native";
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

    const submit =async () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if(email==""){setEmailvalidation("Required*")}
        else if(regex.test(email)==false){setEmailvalidation("Incorrect Email")}
        else if(name==''){setNamevalidation('Required*')}
        else if(cnic==''){setCnicvalidation("Required*")}
        else if(password==""){setPasswordvalidation("Required*")}
        else if (password.length<6){setPasswordvalidation("Password must be atleast 6 alphabet")}
        else if (confirmpassword==''){setConfirmpasswordvalidation("Required*")}
        else if (password != confirmpassword){setConfirmpasswordvalidation("Password not match")}
        else if (phone==''){setPhonevalidation("Required*")}
        else if (phone.length<7){setPhonevalidation("Phone must be atleast 7 digit")}
        else if(date==''){setDatevalidation("Required*")}
        else if(country==''){setCountryvalidation("Required*")}
        else if(nationality==''){setNationalityvalidation("Required*")}
        else{
            const data=new FormData();
            data.append('name', name,);
            data.append("email", email);
            data.append("password", password);
            data.append("c_password", confirmpassword);
            data.append("cnic", cnic);
            data.append("dob", date);
            data.append("phone", phone);
            data.append("country", country);
            data.append("nationality", nationality);
            {filePath && data.append("picture", filePath)}
            setLoading(true)
            const res=await register_api(data)
           if(res!=='Error'){
               if(res.data.success==true){
                   setLoading(false)
                   Toast.show(res.data.message)
                   navigation.navigate("Signin",{data:"text"})
               }
               else{Toast.show("Email Address already Taken")
               setLoading(false)}
           }
        else{ Toast.show("Email Address already Taken")
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
            <HB onPress={()=>{navigation.goBack()}} iconname={"arrow-back"} text1={"Register"} />
            <ScrollView style={[styles.signinmain,{backgroundColor:colors.signinmain}]}>
                <View style={styles.signinmaincontainer}>
                    <Text style={[styles.signinmainh1,{color:colors.signinh1}]}>Let's Get Started</Text>
                    <Text>Hello there, register to continue!</Text>

                    <Input  text1={'Email'} text2={"Enter Your Email"} value1={email} iconname1={"mail"}  onChangeText1={(text)=>{setEmail(text),setEmailvalidation('')}} />
                    {emailvalidation !='' && <Text style={{color:"red"}}>{emailvalidation}</Text>}
                    <RI text1={"Name"} text2={"CNIC"} validation1={namevalidation} validation2={cnicvalidation} value1={name} value2={cnic} placeholder1={"Enter Your Name"} placeholder2={"Enter Your CNIC"} iconname1={"person"} iconname2={"card"}  securetextentry1={false} securetextentry2={false} keyboardtype2={"phone-pad"} onChangeText1={(text)=>{setName(text),setNamevalidation('')}} onChangeText2={(text)=>{setCnic(text),setCnicvalidation('')}} />
                    <RI text1={"Password"} text2={"Confirm Password"} validation1={passwordvalidation} validation2={confirmpasswordvalidation} value1={password} value2={confirmpassword} placeholder1={"Enter Your Password"} placeholder2={"Enter Your Password"} iconname1={"lock-closed"} iconname2={"lock-closed"}  securetextentry1={true} securetextentry2={true} onChangeText1={(text)=>{setPassword(text),setPasswordvalidation('')}} onChangeText2={(text)=>{setConfirmpassword(text),setConfirmpasswordvalidation('')}} />
                    <ID text1={"Phone"} text2={"D.O.B"} validation1={phonevalidation} validation2={datevalidation} value1={phone} keyboardtype1={"phone-pad"}  placeholder1={"Enter Your Phone"} date={date} datechange={(date)=>{setDate(date),setDatevalidation('')}} iconname1={"call"} iconname2={"calendar"}  onChangeText1={(text)=>{setPhone(text),setPhonevalidation('')}}/>
                    <RI text1={"Country"} text2={"Nationality"} validation1={countryvalidation} validation2={nationalityvalidation} value1={country} value2={nationality}  placeholder1={"Enter Your Country"} placeholder2={"Enter Your Nationality"} iconname1={"earth"} iconname2={"earth"}  onChangeText1={(text)=>{setCountry(text),setCountryvalidation('')}} onChangeText2={(text)=>{setNationality(text),setNationalityvalidation('')}}/>

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
                    <TouchableOpacity onPress={()=>{takephotofromgallery(),setImagevalidation('')}}  style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Upload Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{submit()}} style={[styles.signinbtn,{backgroundColor:colors.registerbtn}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("Signin",{data:"text"})}} style={[styles.signinbtn,{backgroundColor:colors.signinbtn,marginBottom:10}]}>
                        <Text style={{textAlign:"center",color:colors.registerbtntext}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Register
