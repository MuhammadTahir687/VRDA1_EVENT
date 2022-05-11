import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ScrollView, RefreshControl} from "react-native";
import styles from '../../Stylesheet/Style'
import {useTheme} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";;
import {eventvisitor_api, visitorrequest_api} from '../../utilis/Api/Api_controller'
import Fontisto from "react-native-vector-icons/Fontisto";
import Moment from "moment";
import {Avatar} from "react-native-elements";
import {get_data} from "../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";

const EventDetails=({route,navigation})=>{
    const {colors}=useTheme();
    const eventdata=route.params.data;
    const rootdata=route.params.root;
    const user_id=route.params.user;
    const [name,setName]=useState('');
    const [userid,setUserid]=useState(user_id)
    const [role,setRole]=useState('');
    const [eventid,setEventid]=useState(eventdata.event_id)
    const [status,setStatus]=useState('')
    const [image,setImage]=useState(null)
    const [refreshing, setRefreshing] = useState(false);


    useEffect(()=>{ userinfo(),visitorrequest()},[])

    const refresh = async () => {
        await setRefreshing(true);
        await visitorrequest();
        await userinfo();
        setRefreshing(false)
    }
    const userinfo = async () => {
        const userdata= await get_data("user");
        const profiledata=await get_data('profile')
        setUserid(userdata.user.id)
        setName(userdata.user.name);
        setRole(userdata.user.role);
        setImage(profiledata.picture)
        setEventid(eventdata.event_id)
    }

    const visitorrequest =async () => {
        const response=await visitorrequest_api({user_id:userid,event_id:eventdata.event_id})
        if(response.data.status==true){setStatus(response.data.data.event_status.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()))}
        else{
            // Toast.show(response.data.message)
            setStatus('')
        }
    }

    const submitt = async () => {
    const response=await eventvisitor_api({user_id:userid,event_id:eventdata.event_id,visiting_status:"pending"});
        if(role=="user") {
            await refresh();
        if(response.data.status==true){
            if (response.data.user_status == "pending") {alert(response.data.message)}
            else if (response.data.user_status == "accepted") {navigation.navigate("QR Code", {data: eventdata, root:rootdata})}
            else if (response.data.user_status == "rejected") {alert(response.data.message)}
        }
        else{
            setRefreshing(false)
            Toast.show(response.data.message)
        }
    }
    else{navigation.navigate("QR Code", {data: eventdata, root:rootdata})}
}

    return(
        <SafeAreaView style={{flex:1,}}>
            <ScrollView refreshControl={<RefreshControl progressBackgroundColor={'#1CAE81'} colors={["#fafafa"]} refreshing={refreshing} onRefresh={refresh}/>} style={{backgroundColor:colors.screenbg,flex:1}} contentContainerStyle={{flexGrow:1}}>
        
                    <Image source={{uri:"https://event.vrda1.net/"+eventdata.event_image}} style={[styles.eventdetailheader,{backgroundColor:"white"}]}/>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={[styles.eventdetailbackbtn,{backgroundColor:colors.greencolor,}]}>
                    <Ionicons name="arrow-back" size={20} color="white"/>
                    <Text style={{color:"white",fontSize:15}}>Event Detail</Text>
                </TouchableOpacity>

                <View style={{flex:1,marginHorizontal:10}}>
                <Text style={[styles.eventdetailtitile,{color:colors.greencolor}]}>{eventdata.event_name}</Text>

                <View style={{flexDirection:"row"}}>
                <View style={styles.eventlocation}>
                    <Fontisto name="date" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.greencolor}]} />
                    <Text style={[styles.eventtime,{color:colors.screentext}]}>{Moment(eventdata.event_start_time).format('D MMM YYYY')}</Text>
                </View>
                    {status !="" && role!="admin" ?<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:"white",fontSize:15,padding:10,backgroundColor:colors.greencolor,borderRadius:5,textAlign:"center"}}>{status}</Text>
                    </View>:<View></View>}
                </View>

                <View  style={styles.eventlocation}>
                    <Ionicons name="location" color="white"  size={20} style={[styles.dateicon,{backgroundColor:colors.greencolor}]}/>
                    <Text style={[styles.eventtime,{color:colors.screentext}]}>{eventdata.event_location}</Text>
                </View>

                <View style={[styles.eventavatar,{backgroundColor:colors.eventdetailavatrbg,padding:10,borderRadius:10,marginTop:10}]}>
                    <Avatar
                        size="large"
                        rounded
                        icon={{name: 'user', type: 'font-awesome',}}
                        source={{uri:"https://event.vrda1.net/"+ eventdata.event_speaker_img}}
                        containerStyle={{backgroundColor:colors.skincolor,borderWidth:2,borderColor:colors.greencolor}}
                    />
                    <View style={styles.avatartext}>
                        <Text style={[{fontSize:18, color:"white"}]}>{eventdata.event_speaker_name}</Text>
                        <Text style={{color:"white"}}>Speaker</Text>
                    </View>
                </View>

                <View>
                    <Text style={[styles.eventdetilsh,{color:colors.screentext}]}>About Event</Text>
                    <Text style={[styles.eventdesc,{color:colors.screentext}]}>{eventdata.event_long_description}</Text>
                </View>
                {rootdata!="allevents"?<TouchableOpacity onPress={()=>{submitt()}}  style={[styles.eventbtn,{backgroundColor:colors.registerbtn}]}>
                    <Text style={{fontSize:18,color:colors.text}}>Enter Event</Text>
                    <MaterialCommunityIcons name="arrow-collapse-right" size={20} color="white" style={styles.cardbtnicon}/>
                </TouchableOpacity>:<View></View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default EventDetails
