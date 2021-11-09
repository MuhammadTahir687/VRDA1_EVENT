import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { Calendar, CalendarList, Agenda, CalendarProvider, Timeline, ExpandableCalendar } from "react-native-calendars";
import {useTheme} from "@react-navigation/native";
const Cal = () => {
    const {colors}=useTheme();
  return(
      <Calendar
          // Specify style for calendar container element. Default = {}
          style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350,
              borderRadius:10,
              marginTop:10,
              backgroundColor:colors.skincolor
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
              todayButtonTextColor: "white",
              todayBackgroundColor:"black",
              backgroundColor: 'black',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#000',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: 'black',
              selectedDayTextColor: 'white',
              todayTextColor: 'white',
              dayTextColor: 'black',
              textDisabledColor: '#d9e1e8',
              dotColor: colors.skincolor,
              selectedDotColor: '#ffffff',
              arrowColor: '#000',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#000',
          }}
      />
  )
}
export default Cal
