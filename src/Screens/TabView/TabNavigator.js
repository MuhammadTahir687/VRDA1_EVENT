import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();
export default function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {iconName = focused ? 'home' : 'home-outline'}
                    else if (route.name === 'Profile') {iconName = focused ? 'person' : 'person-outline'}
                    else if (route.name === 'Direct Commission') {iconName = focused ? 'cash' : 'cash-outline'}
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown:false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#797777',
                tabBarStyle:{paddingBottom:5}
            })}>
            <Tab.Screen name="Home"  component={Home}  />
            <Tab.Screen name="Profile"  component={Profile}  />
            {/*<Tab.Screen name="Direct Commission"  component={DirectComission}  />*/}

        </Tab.Navigator>

    );
}
