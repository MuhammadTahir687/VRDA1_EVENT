/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
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

AppRegistry.registerComponent(appName, () => App);
