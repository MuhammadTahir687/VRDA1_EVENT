import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ScrollView} from "react-native";
import styles from '../../Stylesheet/Style'
import {useTheme} from "@react-navigation/native";
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
    const rootdata=route.params.root;

    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [image,setImage]=useState(null)

    useEffect(()=>{ userinfo()},[])
    const userinfo = async () => {
        const userdata= await get_data("user");
        const profiledata=await get_data('profile')
        setName(userdata.user.name);
        setRole(userdata.user.role);
        setImage(profiledata.picture)
    }

    return(
        <SafeAreaView style={{flex:1,}}>
            <ScrollView style={{backgroundColor:colors.screenbg}}>
                { rootdata=="allevents"?
                    <Image source={{uri:"http://emailsend.mirindaweb.com/"+eventdata.image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]}/>:
                    <Image source={{uri:eventdata.image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]}/>
                }
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.eventdetailbackbtn,{backgroundColor:colors.greencolor,}]}>
                    <Ionicons name="arrow-back" size={20} color="white"/>
                    <Text style={{color:"white",fontSize:15}}>Event Detail</Text>
                </TouchableOpacity>
                <Text style={[styles.eventdetailtitile,{color:colors.greencolor}]}>{eventdata.title}</Text>
                <View style={styles.eventlocation}>
                    <Fontisto name="date" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.greencolor}]} />
                    <Text style={[styles.eventtime,{color:colors.screentext}]}>{Moment(eventdata.start_time).format('D MMM YYYY')}</Text>
                </View>

                <View style={styles.eventlocation}>
                    <Ionicons name="location" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.skincolor}]}/>
                    <Text style={[styles.eventtime,{color:colors.screentext}]}>{eventdata.event_location}</Text>
                </View>
                <View style={styles.eventavatar}>
                    <Avatar
                        size="large"
                        rounded
                        icon={{name: 'user', type: 'font-awesome',}}
                        source={{uri:"http://emailsend.mirindaweb.com/"+image}}
                        containerStyle={{backgroundColor:colors.skincolor,borderWidth:2,borderColor:colors.greencolor}}
                    />
                    <View style={styles.avatartext}>
                        <Text style={[{fontSize:18, color:colors.greencolor}]}>{name}</Text>
                        <Text style={{color:colors.screentext}}>{role}</Text>
                    </View>
                </View>
                <View >
                    <Text style={[styles.eventdetilsh,{color:colors.screentext}]}>About Event</Text>
                    <Text style={[styles.eventdesc,{color:colors.screentext}]}>{eventdata.description}</Text>
                </View>
                {rootdata!="allevents"?<TouchableOpacity onPress={()=>{navigation.navigate("QR Code",{data:eventdata})}}  style={[styles.eventbtn,{backgroundColor:colors.registerbtn}]}>
                    <Text style={{fontSize:18,color:colors.text}}>Enter Event</Text>
                    <MaterialCommunityIcons name="arrow-collapse-right" size={20} color="white" style={styles.cardbtnicon}/>
                </TouchableOpacity>:<View></View>}
            </ScrollView>
        </SafeAreaView>

    )
}
export default EventDetails
