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


const QRcode =({route,navigation}) => {
    const scanner=useRef();
    const {colors}=useTheme();
    const eventdata=route.params.data;
    const [qrvalue,setQrvalue]= useState('')
    const [role,setRole]= useState('')
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;

    useEffect(()=>{userdata()},[])

    const userdata =async () => {
        var qrdata=await get_data('user');
        setRole(qrdata.user.role)
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
      <SafeAreaView style={{flex:1}}>
          <View>
          <Image source={{uri:eventdata.image}} style={styles.eventdetailheader} />
          </View>
          {/*<View style={styles.qravatar}>*/}
          {/*    <Avatar*/}
          {/*        size="large"*/}
          {/*        rounded*/}
          {/*        icon={{name: 'user', type: 'font-awesome',}}*/}
          {/*        source={{uri:eventdata.image}}*/}
          {/*        containerStyle={{backgroundColor:colors.skincolor,borderWidth:2,borderColor:colors.skincolor,top:20,zIndex:2}}*/}
          {/*    />*/}
          {/*    <Text style={[styles.qrusername,{color:colors.text,backgroundColor:colors.skincolor,borderColor:colors.greencolor}]}>NICOLAS</Text>*/}
          {/*</View>*/}

          {role!='' && role=="user" ?
              <View style={[styles.qrcontainer,{alignSelf:"center"}]}>
              {qrvalue != '' && <QRCode  value={qrvalue} size={150}/>}
           </View>:
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
