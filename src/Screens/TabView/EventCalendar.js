import React,{useEffect,useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView, FlatList} from 'react-native';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import {Calendar,Timeline} from "react-native-calendars";
import Cal from "../../utilis/Components/Calendar";
import XDate from 'xdate';
import {sameDate} from "../../utilis/Components/sameDate";
import {get_request} from "../../utilis/Api/Requests";
import moment from "moment";
import Moment from "moment";

const EventCalendar = () => {
    const {colors}=useTheme();
    const [currentDate,setCurrentDate]=useState('');
    const [event,setEvent]=useState([]);

    useEffect(()=>{date(),response()},[])

    const response =async() => {
        const response= await get_request('/api/get-all-events');
        setEvent(response.data)
        console.log("===========",event)
    }
    const date = () => {
        var a = new Date().getDate();
        var b = new Date().getMonth()+1;
        var c = new Date().getFullYear();
        setCurrentDate(c+'-'+b+'-'+a)
        console.log(currentDate,"jbvdfjbjk")

    }
    const EVENTS = event.map(item=>({start:Moment(item.start_time).format("YYYY-MM-DD hh:mm"),end:Moment(item.end_time).format("YYYY-MM-DD hh:mm"),title:item.title,summary:item.short_description,color:colors.skincolor}))
  return(
      <SafeAreaView style={{flex:1}}>
          <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
              <ScrollView>
          <View style={styles.calendarcontainer}>

              <Text style={[styles.calendarh,{color:"orange"}]}>Calendar</Text>
              <Cal/>
              <View style={{borderWidth:5,borderColor:colors.skincolor,borderRadius:10,marginVertical:10}}>
                 <Timeline
                      format24h={true}
                      events={EVENTS.filter(event => moment(event.start).isSame(Date.now(), 'day'))}
                  />
              </View>
          </View>
              </ScrollView>
          </ImageBackground>
      </SafeAreaView>
  )
}
export default EventCalendar
