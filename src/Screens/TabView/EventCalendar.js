import React,{useEffect,useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView, FlatList} from 'react-native';
import styles from '../../Stylesheet/Style';
import {useTheme} from "@react-navigation/native";
import {Calendar,Timeline,CalendarProvider,ExpandableCalendar} from "react-native-calendars";
import Cal from "../../utilis/Components/Calendar";
import XDate from 'xdate';
import {sameDate} from "../../utilis/Components/sameDate";
import {get_request} from "../../utilis/Api/Requests";
import moment from "moment";
import Moment from "moment";
import {selectedDayBackgroundColor} from "react-native-calendars/src/style";

const EventCalendar = () => {
    const {colors}=useTheme();
    const [currentDate,setCurrentDate]=useState('');
    const [event,setEvent]=useState([]);

    useEffect(()=>{date(),response()},[])

    const response =async() => {
        const response= await get_request('/api/get-all-events');
        setEvent(response.data)
    }
    const date =async () => {
        var a =await  new Date().getDate();
        var b =await new Date().getMonth()+1;
        var c =await  new Date().getFullYear();
        // await setCurrentDate(c+'-'+b+'-'+a)
        await setCurrentDate(Date.now())

    }
    const EVENTS = event.map(item=>({start:Moment(item.start_time).format("YYYY-MM-DD hh:mm"),end:Moment(item.end_time).format("YYYY-MM-DD hh:mm"),title:item.title,summary:item.short_description,color:"rgba(41,198,96,0.34)"}))
    let markedDay = {};
    event.map((item) => {
        markedDay[Moment(item.start_time).format("YYYY-MM-DD")] = {
            selected: true,
            marked: true,
            selectedColor: "#1CAE81",
        };
    });
    console.log(markedDay,"dates marked----------")

    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require('../../Assets/background.png')} style={styles.profilebg}>
                <ScrollView>
                    <View style={styles.calendarcontainer}>
                        <Text style={[styles.calendarh,{color:colors.greencolor}]}>Calendar</Text>
                        <Calendar

                            onDayPress={(day)=>{setCurrentDate(day.dateString),console.log("--------------------",day.dateString)}}
                            markedDates={markedDay}
                            style={{height: 320, borderRadius:10, marginTop:10,}}
                            theme={{
                                todayButtonTextColor: "white",
                                todayBackgroundColor:"#1CAE81",
                                backgroundColor: 'black',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: 'black',
                                selectedDayTextColor: 'white',
                                todayTextColor: '#ffffff',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#000',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#000',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: '#000',
                            }}
                        />

                        <View style={{borderWidth:0,borderColor:colors.skincolor,borderRadius:10,marginVertical:10,}}>
                            <Timeline

                                style={{borderWidth:5,borderRadius:10}}
                                format24h={true}
                                events={EVENTS.filter(event => moment(event.start).isSame(currentDate,"day"))}
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default EventCalendar
