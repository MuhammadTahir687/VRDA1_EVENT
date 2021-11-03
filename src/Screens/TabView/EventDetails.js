import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ScrollView} from "react-native";
import styles from '../../Stylesheet/Style'
import {useTheme} from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Events_details} from '../../utilis/Api/Api_controller'
import {get_request} from "../../utilis/Api/Requests";
import Fontisto from "react-native-vector-icons/Fontisto";
import Moment from "moment";
import {Avatar} from "react-native-elements";
import {get_data} from "../../utilis/AsyncStorage/Controller";

const EventDetails=({route,navigation})=>{
    const {colors}=useTheme();
    const eventdata=route.params.data;

    const [name,setName]=useState('');
    const [role,setRole]=useState('');

    useEffect(()=>{ userinfo()},[])
    const userinfo = async () => {
        const userdata= await get_data("user");
        setName(userdata.user.name);
        setRole(userdata.user.role);
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
              <Image source={{uri:eventdata.image}} style={styles.eventdetailheader}/>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.eventdetailbackbtn,{backgroundColor:colors.greencolor,}]}>
                    <Ionicons name="arrow-back" size={20} color="white"/>
                    <Text style={{color:"white",fontSize:15}}>Event Detail</Text>
                </TouchableOpacity>
                <Text style={[styles.eventdetailtitile,{color:colors.greencolor}]}>{eventdata.title}</Text>
                <View style={styles.eventlocation}>
                    <Fontisto name="date" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.greencolor}]} />
                    <Text style={styles.eventtime}>{Moment(eventdata.start_time).format('d MMM YYYY')}</Text>
                </View>

                <View style={styles.eventlocation}>
                    <Ionicons name="location" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.skincolor}]}/>
                    <Text style={styles.eventtime}>{eventdata.event_location}</Text>
                </View>
                <View style={styles.eventavatar}>
                    <Avatar
                        size="large"
                        rounded
                        icon={{name: 'user', type: 'font-awesome',}}
                        source={{uri:eventdata.image}}
                        containerStyle={{backgroundColor:colors.skincolor,borderWidth:2,borderColor:colors.greencolor}}
                    />
                    <View style={styles.avatartext}>
                        <Text style={[{fontSize:18, color:colors.greencolor}]}>{name}</Text>
                        <Text>{role}</Text>
                    </View>
                </View>
                <View >
                    <Text style={styles.eventdetilsh}>About Event</Text>
                    <Text style={styles.eventdesc}>{eventdata.description}</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("QR Code",{data:eventdata})}}  style={[styles.eventbtn,{backgroundColor:colors.skincolor}]}>
                    <Text style={{fontSize:18,color:colors.text}}>Enter Event</Text>
                    <MaterialCommunityIcons name="arrow-collapse-right" size={20} color="white" style={styles.cardbtnicon}/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    )
}
export default EventDetails
