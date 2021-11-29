/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import { PermissionsAndroid } from 'react-native';
PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    requestPermissions: Platform.OS === 'ios'

})
PushNotification.createChannel(
    {
        channelId: "reminder",
        channelName: "My channel",
    },
)

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)


AppRegistry.registerComponent(appName, () => App);
