import React, {useEffect, useState,useRef} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput, FlatList,Animated} from 'react-native';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from "moment";
import Fontisto from "react-native-vector-icons/Fontisto";
import {get_request} from "../../utilis/Api/Requests";
import {Coming_Events} from "../../utilis/Api/Api_controller";
import Loader from "../../utilis/Loader";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 130;
const AllEvent = ({navigation}) => {
    const {colors}=useTheme();
    const offset = useRef(new Animated.Value(0)).current;

    const [btn,setBtn]=useState(0)
    const [eventdata,setEventdata]=useState([]);
    const [filterdata,setFilterdata]=useState([]);
    const [search,setSearch]=useState('');
    const [loading,setLoading]= useState(true);

    Moment.locale('en');
    const Button=[{id:1,title:"UPCOMING"}, {id:2,title:"PAST EVENT"}]

    useEffect(()=>{  response()},[])

    const response =async(index) => {
        if (index==0){
            setLoading(true)
            const res= await get_request('/api/coming-events');
            setLoading(false)
            setEventdata(res.event_start);
        }
        else if (index==1){
            setLoading(true)
            const res= await get_request('/api/past-events');
            setLoading(false)
            setEventdata(res.past_events);
        }
        else{
            setBtn(0)
            setLoading(true)
            const res= await get_request('/api/coming-events');
            setLoading(false)
            setEventdata(res.event_start);
        }
    }

    const insets = useSafeAreaInsets();
    const headerHeight = offset.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top +72],
        extrapolate: 'clamp'
    });

    return(
        <SafeAreaView style={{flex:1}}>
            <Loader animating={loading}/>
            <Animated.View style={{height: headerHeight,backgroundColor:"#1cae81",borderBottomLeftRadius:80,borderBottomRightRadius:80}}>
                <View style={styles.searchcontainer1}>
                    <View style={styles.searchleftcontainer}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["rgba(12,12,12,0.4)", "#1CAE81"]} style={{backgroundColor:"rgba(12,12,12,0.4)",flexDirection:"row",borderRadius:50,flex:1}}>
                            <FontAwesome name="search" color={colors.loginbackground} size={18} style={[styles.homesearchicon,{backgroundColor:'rgba(12,12,12,0.4)',borderWidth:2,borderColor:colors.loginbackground}]}/>
                            <TextInput
                                style={[styles.homesearchinput]}
                                placeholder="Search"
                                value={search}
                                placeholderTextColor={colors.loginbackground}
                                onChangeText={(text) => {setSearch(text);}}
                            />
                        </LinearGradient>
                    </View>
                </View>
            </Animated.View>

            <View style={[styles.alleventbtncontainer,{borderRadius:50,backgroundColor:'rgba(24,90,71,0.98)'}]}>
                {Button.map( (item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>{setBtn(index); response(index)}} style={[styles.alleventbtn,{backgroundColor:(btn==index)?"white":'rgba(24,90,71,0.68)',elevation:(btn==index)?6:0,paddingHorizontal:(btn==index)?20:10}]}>
                            <Text style={[styles.alleventbtntext,{color:(btn==index)?'rgba(24,90,71,0.68)':colors.text}]}>{item.title}</Text>
                        </TouchableOpacity>
                ))}
            </View>
            {eventdata!=null && <FlatList data={eventdata.filter((item)=>item.event_name.toUpperCase().includes(search.toUpperCase()) || item.event_location.toUpperCase().includes(search.toUpperCase()))}
                      keyExtractor={(item,index)=>index.toString()}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], { useNativeDriver: false })}
                                          scrollEventThrottle={16}

                      renderItem={({ item, index }) => (
                          <TouchableOpacity onPress={()=>{navigation.navigate("Event Detail",{ data:item,root:"allevents"})}}  style={[styles.eventcard1,{borderColor:colors.loginbackground,backgroundColor:"white",elevation:10}]}>
                              <Image source={{uri: "https://event.vrda1.net/"+item.event_image}} style={styles.eventimage1}/>
                              {item.event_name.length>21?<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.event_name.slice(0,31)+"..."}</Text>:<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.event_name}</Text>}
                              <View style={styles.eventlocation}>
                                  <Fontisto name="date" />
                                  <Text style={styles.eventtime}>{item.event_start_time}</Text>
                              </View>
                              <View style={styles.eventlocation}>
                                  <Ionicons name="location"/>
                                  {item.event_location.length>20? <Text style={styles.eventtime}>{item.event_location.slice(0,20)+"..."}</Text>:<Text style={styles.eventtime}>{item.event_location}</Text>}
                              </View>
                              <View style={styles.eventdate1}>
                                  <Text style={{fontSize:16,color:colors.loginbackground}}>{Moment(item.event_start_time).format('D MMM')}</Text>
                              </View>
                          </TouchableOpacity>
                      )}
            />}
        </SafeAreaView>
    )
}
export default AllEvent
