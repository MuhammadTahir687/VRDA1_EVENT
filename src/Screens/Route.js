import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "./Splash";
import Login from './Login';
import Signin from "./Signin";

const Route = () => {
    const Stack = createNativeStackNavigator();
  return(
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false,animation:"slide_from_right"}} >
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signin" component={Signin} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}
export default Route
