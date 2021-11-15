import PushNotification from "react-native-push-notification";

class Notifications{
    constructor(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,
            requestPermissions: false,
        });
        PushNotification.createChannel(
            {
                channelId: "reminder", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            },
            () => {} // (optional) callback returns whether the channel was created, false means it already existed.
        );

        const LocalNotification = () => {
            PushNotification.localNotification({
                autoCancel: true,
                bigText:
                    'This is local notification demo in React Native app. Only shown, when expanded.',
                subText: 'Local Notification Demo',
                title: 'Local Notification Title',
                message: 'Expand me to see more',
                vibrate: true,
                vibration: 300,
                playSound: true,
                soundName: 'default',
                actions: '["Yes", "No"]'
            })
        }
    }
}
export default  Notifications
