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
import Btn from "../../utilis/Components/Button";
import PushNotification from "react-native-push-notification";

const Home=({navigation})=>{
    const {colors}=useTheme();
    const [eventdata,setEventdata]=useState([]);
    const [search,setSearch]=useState('');
    const [show,setShow]=useState(false)
    const [icon,setIcon]=useState(false)


    useEffect(()=>{  response()},[])

     const response =async() => {
      const response= await get_request('/api/get-all-events');
      setEventdata(response.data)
         setShow(true)
    }
    Moment.locale('en');

    const handlenotification = () => {
      PushNotification.localNotification({
          channelId: "reminder",
          title:"Notifications",
          message:"jhkdfhgkdfjgkdfjiljvifdiznbn"
      })
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
            <View style={[styles.homeheader,{backgroundColor:colors.loginbackground}]}>
                <View style={{flex:1}}>
                <Text style={[styles.homeheaderh1,{color:colors.text}]}>Current Location</Text>
                <Text style={[styles.homeheaderh,{color:colors.text}]}>New York, USA</Text>
                <View style={styles.homeiconcontianer}>
                    <TouchableOpacity>
                        <Ionicons name="menu" color="white" size={30}/>
                    </TouchableOpacity>
                    <View style={styles.homerighticoncontainer}>
                        <TouchableOpacity onPress={()=>{handlenotification()}}>
                            <FontAwesome name="bell" color="white" size={18} style={[styles.righticon,{backgroundColor:colors.signinHeader}]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('QR Code',{data:eventdata})}}>
                            <MaterialCommunityIcons name="qrcode-scan" color="white" size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>

                <View style={styles.searchcontainer}>
                    <View style={styles.searchleftcontainer}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["rgba(12,12,12,0.4)", "#1CAE81"]} style={{backgroundColor:"rgba(12,12,12,0.4)",flexDirection:"row",borderBottomLeftRadius:50,borderTopLeftRadius:50,flex:1}}>
                        <FontAwesome name="search" color={colors.loginbackground} size={18} style={[styles.homesearchicon,{backgroundColor:'rgba(12,12,12,0.4)',borderWidth:2,borderColor:colors.loginbackground}]}/>
                          <TextInput
                            style={[styles.homesearchinput]}
                            placeholder="Search"
                            placeholderTextColor={colors.loginbackground}
                            onChangeText={(text)=>{setSearch(text)}}
                        />
                        </LinearGradient>

                    </View>
                    <TouchableOpacity onPress={()=>{setIcon(!icon)}} style={[styles.filtercontainer,{backgroundColor:"rgba(12,12,12,0.58)"}]}>
                        <Ionicons name="filter" color="white" size={20}/>
                        <Text style={{color:"white",marginHorizontal:5}}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>

                {icon==true? <View style={{flex:1,flexDirection:"row",justifyContent:"center",bottom:13,alignItems:"center"}}>
                   <TouchableOpacity onPress={()=>{setIcon(false)}} style={{alignItems:"flex-end",justifyContent:"flex-end"}}>
                       <Ionicons name="close" size={20} color="white" style={{borderRadius:50,backgroundColor:colors.skincolor}}/>
                   </TouchableOpacity>
                   <View style={{flexDirection:"row"}} >
                    <Btn text1={'Conference'} iconname={"chatbubble-ellipses-outline"} size={12} backgroundColor={"#12682a"}/>
                    <Btn text1={'Speaker'} iconname={"person-circle-outline"} size={15} backgroundColor={colors.skincolor}/>
                    <Btn text1={'Ted Talk'} iconname={"chatbubbles-outline"} size={12} backgroundColor={"#1aa6bd"}/>
                </View>
               </View>:<View></View>}


                {show==true?<View>
            <View style={styles.homemain1}>
                <Text style={[styles.homemainh1,{color:colors.loginbackground}]}>Upcomming Event</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("All Events")}} style={styles.seeallcontainer}>
                    <Text style={{color:"#938d8d"}}>See All</Text>
                    <AntDesign name="right"/>
                </TouchableOpacity>
            </View>

            <FlatList data={eventdata.filter((item)=>item.title.toUpperCase().includes(search.toUpperCase()))}
                      horizontal={true}
                      renderItem={({ item, index }) => (
                          <TouchableOpacity
                              onPress={()=>{navigation.navigate("Event Detail",{ data:item})}}
                              style={[styles.eventcard,{borderColor:colors.loginbackground,backgroundColor:"white"}]}>
                          <Image source={{uri:item.image}} style={styles.eventimage}/>
                              {item.title.length>21?<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title.slice(0,21)+"..."}</Text>:<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title}</Text>}
                              {item.short_description.length>21?<Text style={styles.eventshortdescription}>{item.short_description.slice(0,21)+"..."}</Text>:<Text style={styles.eventshortdescription}>{item.short_description}</Text>}
                              <View style={styles.eventdate}>
                                  <Text style={{fontSize:16,color:colors.loginbackground}}>{Moment(item.start_time).format('d MMM')}</Text>
                              </View>
                              <View style={styles.eventlocation}>
                                  <Fontisto name="date" />
                                  <Text style={styles.eventtime}>{item.start_time}</Text>
                              </View>

                              <View style={styles.eventlocation}>
                                  <Ionicons name="location"/>
                                  {item.event_location.length>21? <Text style={styles.eventtime}>{item.event_location.slice(0,21)+"..."}</Text>:<Text style={styles.eventtime}>{item.event_location}</Text>}
                              </View>
                          </TouchableOpacity>
                      )}
            />

            <Text style={[styles.homemainh2,{color:colors.loginbackground}]}>Special Event</Text>
            <View style={[styles.homecardcotainer,{backgroundColor:colors.loginbackground}]}>
                <View style={{flex:1}}>
                    <Text style={[styles.homemainh2,{color:colors.text}]}>Motivational Event</Text>
                    <Text style={[styles.cardtext,{color:colors.text}]}>On iOS you can use On iOS you can use the MaskedViewIOS to display text with a gradient. The trick here is to render the text twice; once for the mask, and once to let the gradient have the correct size</Text>
                    <TouchableOpacity style={[styles.cardbtn,{backgroundColor:colors.signinHeader}]}>
                        <Text style={{color:colors.text}}>View Now</Text>
                        <Ionicons name="eye" size={15} color="white" style={styles.cardbtnicon}/>
                    </TouchableOpacity>
                </View>
                    <Image source={require('../../Assets/Avator.png')} style={styles.cardimg}/>
            </View>

                </View>
                    : <View></View>}
            </ScrollView>
        </SafeAreaView>

    )
}
export default Home
