import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput, FlatList} from 'react-native';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from "moment";
import Fontisto from "react-native-vector-icons/Fontisto";
import {get_request} from "../../utilis/Api/Requests";
import {Coming_Events} from "../../utilis/Api/Api_controller";


const AllEvent = () => {
    const {colors}=useTheme();
    const [btn,setBtn]=useState(0)
    const [eventdata,setEventdata]=useState([]);
    const [filterdata,setFilterdata]=useState([]);
    const [search,setSearch]=useState('');

    Moment.locale('en');
    const Button=[{id:1,title:"UPCOMING"}, {id:2,title:"PAST EVENT"}]

    useEffect(()=>{  response()},[])

    const response =async(index) => {
        if (index==0){
            await  alert(index+" Upcoming")
            const res= await get_request('/api/coming-events');
            setEventdata(res.event_start);
        }
        else if (index==1){
            await alert(index+" Past")
            const res= await get_request('/api/past-events');
            setEventdata(res.past_events);
        }
        else{
            const res= await get_request('/api/coming-events');
            setEventdata(res.event_start);
        }
    }



    const renderitem = ({item,index}) => {
      return(
          <TouchableOpacity  style={[styles.eventcard1,{borderColor:colors.loginbackground}]}>
              <Image source={{uri:item.image}} style={styles.eventimage}/>
              {item.title.length>21?<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title.slice(0,21)+"..."}</Text>:<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title}</Text>}
              {item.short_description.length>20?<Text style={styles.eventshortdescription}>{item.short_description.slice(0,21)+"..."}</Text>:<Text style={styles.eventshortdescription}>{item.short_description}</Text>}
              <View style={styles.eventdate}>
                  <Text style={{fontSize:16,color:colors.loginbackground}}>{Moment(item.start_time).format('d MMM')}</Text>
              </View>
              <View style={styles.eventlocation}>
                  <Fontisto name="date" />
                  <Text style={styles.eventtime}>{item.start_time}</Text>
              </View>
              <View style={styles.eventlocation}>
                  <Ionicons name="location"/>
                  {item.event_location.length>20? <Text style={styles.eventtime}>{item.event_location.slice(0,20)+"..."}</Text>:<Text style={styles.eventtime}>{item.event_location}</Text>}
              </View>
          </TouchableOpacity>
      )
    }


    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require('../../Assets/background.png')} style={[styles.alleventheader,]}>
                <View style={styles.searchcontainer}>
                    <View style={styles.searchleftcontainer}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["rgba(12,12,12,0.4)", "#1CAE81"]} style={{backgroundColor:"rgba(12,12,12,0.4)",flexDirection:"row",borderBottomLeftRadius:50,borderTopLeftRadius:50,flex:1}}>
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
                    <TouchableOpacity style={[styles.filtercontainer,{backgroundColor:"rgba(12,12,12,0.58)"}]}>
                        <Ionicons name="filter" color="white" size={20}/>
                        <Text style={{color:"white",marginHorizontal:5}}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={[styles.alleventbtncontainer,{borderRadius:50,backgroundColor:colors.skincolor}]}>
                {Button.map( (item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>{setBtn(index); response(index)}} style={[styles.alleventbtn,{backgroundColor:(btn==index)?"white":colors.skincolor,elevation:(btn==index)?6:0,paddingHorizontal:(btn==index)?20:10}]}>
                            <Text style={[styles.alleventbtntext,{color:(btn==index)?colors.skincolor:colors.text}]}>{item.title}</Text>
                        </TouchableOpacity>
                ))}
            </View>
            <FlatList data={eventdata.filter(item => item.title.toUpperCase().includes(search.toUpperCase()))}
                      keyExtractor={(item,index)=>index.toString()}
                      renderItem={renderitem}
            />
        </SafeAreaView>
    )
}
export default AllEvent
