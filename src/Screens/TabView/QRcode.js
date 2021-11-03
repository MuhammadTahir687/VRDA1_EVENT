import React, {Component, useState} from "react";
import {View, Text, SafeAreaView, Image} from "react-native";
import {QRCode} from "react-native-custom-qr-codes";
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import {Avatar} from "react-native-elements";


const QRcode = ({route,navigation}) => {
    const eventdata=route.params.data;
    const [qrvalue,setQrvalue]= useState('http://facebook.github.io/react-native/')
    const {colors}=useTheme();
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

          <View style={[styles.qrcontainer]}>
              <QRCode content={qrvalue} size={200}   />
          </View>

      </SafeAreaView>
  )
}
export default QRcode
