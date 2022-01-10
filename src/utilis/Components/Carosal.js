import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView, TextInput,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import {useEffect, useState} from "react";
import {get_request} from "../Api/Requests";
import Moment from "moment";

const Carosel=({searchtext})=>{

    const [event,setEvent]=useState([])
    const [search,setSearch]=useState('')
    useEffect(()=>{response()},[])

    const response =async () => {
      const resp =await get_request('/api/get-all-events')
        console.log(resp.data)
        setEvent(resp.data)
    }

    const DATA = event.map(item=>({title:item.title,event_location:item.event_location,image:item.image,short_description:item.short_description,start_time:item.start_time}))

    const renderItem=({item,index})=>{
        return (
            <View style={{
                backgroundColor:'#18eaa5',
                borderRadius: 10,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,

            }}>
                <Text style={{fontSize: 20}}>{item.title}</Text>
                <Text>{item.location}</Text>
            </View>
            // <TouchableOpacity
            //               // onPress={()=>{navigation.navigate("Event Detail",{ data:item,root:"Events",user:userid})}}
            //               style={[styles.eventcard,{borderColor:colors.loginbackground,backgroundColor:"white"}]}>
            //           <Image source={{uri:item.image}} style={styles.eventimage}/>
            //               {item.title.length>20?<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title.slice(0,18)+"..."}</Text>:<Text style={[styles.eventtitle,{color:colors.loginbackground}]}>{item.title}</Text>}
            //               {item.short_description.length>21?<Text style={styles.eventshortdescription}>{item.short_description.slice(0,15)+"..."}</Text>:<Text style={styles.eventshortdescription}>{item.short_description}</Text>}
            //
            //               <View style={styles.eventlocation}>
            //                   <Fontisto name="date" color={"black"} />
            //                   {item.start_time.length>10?<Text style={styles.eventtime}>{Moment(item.start_time).format("YYYY-MM-DD")}</Text>:<Text style={styles.eventtime}>{item.start_time}</Text>}
            //               </View>
            //
            //               <View style={styles.eventlocation}>
            //                   <Ionicons name="location" color={"black"}/>
            //                   {item.event_location.length>21? <Text style={styles.eventtime}>{item.event_location.slice(0,15)+"..."}</Text>:<Text style={styles.eventtime}>{item.event_location}</Text>}
            //               </View>
            //               <View style={styles.eventdate}>
            //                   <Text style={{fontSize:16,color:colors.loginbackground}}>{Moment(item.start_time).format('D MMM')}</Text>
            //               </View>
            //           </TouchableOpacity>

        )
    }

        return (
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',marginVertical:10 }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => carousel = ref}
                        data={DATA.filter((item)=> item.title.toUpperCase().includes(searchtext.toUpperCase()) || item.event_location.toUpperCase().includes(searchtext.toUpperCase()))}
                        sliderWidth={300}
                        itemWidth={280}
                        renderItem={renderItem}
                        />
                </View>
        );

}
export default Carosel;
