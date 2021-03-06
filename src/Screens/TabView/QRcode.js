import React, {Component, useEffect, useRef, useState} from "react";
import {View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions} from "react-native";
// import {QRCode} from "react-native-custom-qr-codes";
import QRCode from 'react-native-qrcode-svg';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import {Avatar} from "react-native-elements";
import {get_data} from "../../utilis/AsyncStorage/Controller";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import {attendance_api} from "../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";

const QRcode =({route,navigation}) => {
    const scanner=useRef();
    const {colors}=useTheme();
    const eventdata=route.params.data;
    const rootscreen=route.params.root;
    const [qrvalue,setQrvalue]= useState('')
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null);
    const [adminid,setadminid]=useState('')
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;

    useEffect(()=>{userdata()},[])

    const userdata =async () => {
        var qrdata=await get_data('user');
        console.log("hghgfh",eventdata.event_id)
        setadminid(qrdata.user.id)
        setRole(qrdata.user.role)
        setEmail(qrdata.user.email)
        setName(qrdata.user.name)
        setImage(qrdata.user.picture)
        setQrvalue(JSON.stringify(
            {
                user_id: qrdata.user.id,
                user_email: qrdata.user.email,
                user_name: qrdata.user.name,
                event_id: eventdata.event_id,
                event_image: eventdata.image
            }
        ))
        
    }
    const onSuccess = async (e) => {
        const response=JSON.parse(e.data)
        console.log("response",response)
        if(response.user_id !='' || response.user_id !=undefined)
        {
            
             const res=await attendance_api({user_id:response.user_id,event_id:eventdata.event_id,admin_id:adminid})
            console.log("dfdfg============",res.data)
            if(res.data.status==true){
                console.log("dfdfg============",res.data)
                Toast.show(res.data.message)
            }
            else{
                console.log("dfdfg============",res.data)
                Toast.show(res.data.message)
            }
        }
        else{

        }
    }

  return(
      <SafeAreaView style={{flex:1,backgroundColor:colors.screenbg}}>
          <View>
              {rootscreen == 'SEvents' ? <Image source={{uri:'https://event.vrda1.net/'+ eventdata.event_image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]} />:
          <Image source={{uri:'https://event.vrda1.net/'+ eventdata.event_image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]} />}
              <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.eventdetailbackbtn,{backgroundColor:colors.greencolor,}]}>
                  <Ionicons name="arrow-back" size={20} color="white"/>
                  <Text style={{color:"white",fontSize:15}}>Event Detail</Text>
              </TouchableOpacity>
          </View>

          {role!='' && role=="user" ?
              <View style={{flex:1,alignItems:"center",justifyContent:"center",}}>
                  <View style={{elevation:10,alignItems:"center",backgroundColor:colors.headercolor,paddingHorizontal:50,paddingBottom:50,borderRadius:10}}>
                      <View style={{alignItems:"center",bottom:30}}>
                          {image!=null?
                              <Avatar
                              size="large"
                              rounded
                              icon={{name: 'user', type: 'font-awesome',}}
                              source={{uri:image}}
                              containerStyle={{backgroundColor:colors.headercolor,borderColor:colors.avatarcolor,borderWidth:2,elevation:10}}
                          />:
                              <Avatar
                                  size="large"
                                  rounded
                                  icon={{name: 'user', type: 'font-awesome',}}
                                  containerStyle={{backgroundColor:colors.headercolor,borderColor:colors.avatarcolor,borderWidth:2,elevation:10}}
                              />}
                          <Text style={[styles.qrusername,{color:colors.qrtext,marginTop:5}]}>{name}</Text>
                          <Text style={[styles.qrusername,{color:colors.qrtext}]}>{role}</Text>
                      </View>

                      <View style={[styles.qrcontainer,{alignSelf:"center",borderWidth:5,borderColor:"white"}]}>
                          {qrvalue != '' && <QRCode  value={qrvalue}  size={150}/>}
                      </View>
                  </View>
              </View>
              :
              <View style={{flex:1}}>
                  <QRCodeScanner
                      ref={scanner}
                      reactivate={true}
                      reactivateTimeout={2000}
                      containerStyle={{flex:1,alignItems:"center"}}
                      cameraStyle={{width:width/1.5,height:height/1.5}}
                      markerStyle={{borderRadius:10,borderColor:colors.greencolor,borderWidth:5}}
                      onRead={onSuccess}
                      showMarker={true}
                      checkAndroid6Permissions={false}
                      flashMode={RNCamera.Constants.FlashMode.auto}
                  />
              </View>
          }

      </SafeAreaView>
  )
}
export default QRcode
