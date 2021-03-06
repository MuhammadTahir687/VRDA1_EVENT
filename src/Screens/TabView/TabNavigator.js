import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Profile from "./Profile";
import EventCalendar from "./EventCalendar";
import {useTheme} from "@react-navigation/native";
import MAP from "./Map";

const Tab = createBottomTabNavigator();
export default function AppTab() {
    const {colors}=useTheme()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {iconName = focused ? 'home' : 'home-outline'}
                    else if (route.name === 'Profile') {iconName = focused ? 'person-circle' : 'person-circle-outline'}
                    else if (route.name === 'Calendar') {iconName = focused ? 'calendar' : 'calendar-outline'}
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown:false,
                tabBarActiveTintColor: colors.tabicon,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle:{paddingBottom:5},
                tabBarHideOnKeyboard:true
            })}>
            <Tab.Screen name="Home"  component={Home}  />
            <Tab.Screen name="Profile"  component={Profile}  />
            <Tab.Screen name="Calendar"  component={EventCalendar}  />
            {/*<Tab.Screen name="MAP"  component={MAP}  />*/}

        </Tab.Navigator>

    );
}
