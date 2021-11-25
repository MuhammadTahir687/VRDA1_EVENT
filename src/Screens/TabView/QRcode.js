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


const QRcode =({route,navigation}) => {
    const scanner=useRef();
    const {colors}=useTheme();
    const eventdata=route.params.data;
    const [qrvalue,setQrvalue]= useState('')
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null);
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;

    useEffect(()=>{userdata()},[])

    const userdata =async () => {
        var qrdata=await get_data('user');
        setRole(qrdata.user.role)
        setEmail(qrdata.user.email)
        setName(qrdata.user.name)
        setImage(qrdata.user.picture)
        setQrvalue(JSON.stringify(
            {
                user_id: qrdata.user.id,
                user_email: qrdata.user.email,
                user_name: qrdata.user.name,
                event_id: eventdata.id,
                event_image: eventdata.image
            }
        ))
    }
    const onSuccess = (e) => {
        console.log("====================",e.data)
        alert(e.data)
        // return scanner.current.reactivate()
    }

  return(
      <SafeAreaView style={{flex:1,backgroundColor:colors.screenbg}}>
          <View>
          <Image source={{uri:eventdata.image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]} />
              <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.eventdetailbackbtn,{backgroundColor:colors.greencolor,}]}>
                  <Ionicons name="arrow-back" size={20} color="white"/>
                  <Text style={{color:"white",fontSize:15}}>Event Detail</Text>
              </TouchableOpacity>
          </View>
          {/*<View style={styles.qravatar}>*/}
          {/*    <Avatar*/}
          {/*        size="large"*/}
          {/*        rounded*/}
          {/*        icon={{name: 'user', type: 'font-awesome',}}*/}
          {/*        source={{uri:eventdata.image}}*/}
          {/*        containerStyle={{backgroundColor:colors.skincolor,borderWidth:0,borderColor:colors.skincolor}}*/}
          {/*    />*/}

          {/*    <Text style={[styles.qrusername,]}>{name}</Text>*/}
          {/*    <Text style={[styles.qrusername,]}>{role}</Text>*/}
          {/*    <Text style={[styles.qrusername,]}>{email}</Text>*/}
          {/*</View>*/}

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
                      // ref={scanner}
                      reactivate={true}
                      reactivateTimeout={2000}
                      containerStyle={{flex:1,alignItems:"center"}}
                      cameraStyle={{width:width/1.5,height:height/1.5}}
                      markerStyle={{borderRadius:10,borderColor:colors.skincolor,borderWidth:5}}
                      onRead={onSuccess}
                      showMarker={true}
                      flashMode={RNCamera.Constants.FlashMode.auto}
                  />
              </View>
          }

      </SafeAreaView>
  )
}
export default QRcode
