import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, Linking, RefreshControl } from "react-native";
import styles from '../../Stylesheet/Style'
import { useTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Events_details } from '../../utilis/Api/Api_controller'
import { get_request } from "../../utilis/Api/Requests";
import Fontisto from "react-native-vector-icons/Fontisto";
import Moment from "moment";
import Btn from "../../utilis/Components/Button";
import PushNotification from "react-native-push-notification";
import ModalView from '../../utilis/Components/Modal'
import { setIsDarkTheme } from "../../Store/MainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utilis/Loader";
import { get_data } from "../../utilis/AsyncStorage/Controller";
import auth from "@react-native-firebase/auth";
import { LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { firebase } from '@react-native-firebase/messaging'
import Modal from "react-native-modal";
import MapView, { Callout, Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import Carosel from "../../utilis/Components/Carosal";

var array = []

const Home = ({ navigation }) => {
    const { colors } = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.themeReducer.isDarkTheme);
    const [eventdata, setEventdata] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false)
    const [icon, setIcon] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [userid, setUserid] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [specialevent, setSpecialevent] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => { notification(); response(); SpecialEvent(); }, [])

    const notification = async () => {
        const resp = await get_request('/api/notifications')
        if (resp.status == true) {
            setMessages(resp.data)
        }
        else { }
    }

    const refresh = async () => {
        await setRefreshing(true);
        await response();
        await SpecialEvent();
        await notification();
        setRefreshing(false);
    }


    const response = async () => {
        setLoading(true)
        const userdata = await get_data("user");
        setUserid(userdata.user.id)

        const response = await get_request('/api/get-all-events');
        console.log(response.success, "status")
        if (response.status == true) {
            setEventdata(response.data)
            setShow(true)
            setLoading(false)
        }
        else if (response.message == 'Unauthenticated') { logout() }
    }

    const SpecialEvent = async () => {
        const resp = await get_request('/api/special-events')
        if(resp.event_start !=null){
            setSpecialevent(resp.event_start[0])
        }
        else{

        }
        
    }

    const logout = async () => {
        try {
            const user = await auth().currentUser;
            if (user != null) {
                await LoginManager.logOut();
                await GoogleSignin.signOut();
                await auth().signOut()
                await AsyncStorage.getAllKeys()
                    .then(keys => AsyncStorage.multiRemove(["user", "profile", "token"])).then(navigation.replace("Login", { data: "text" }))
            }
            else {
                await AsyncStorage.getAllKeys()
                    .then(keys => AsyncStorage.multiRemove(["user", "profile", "token"])).then(navigation.replace("Login", { data: "text" }))
            }
            console.log("sign out")
        } catch (error) { console.error(error); }

    }

    Moment.locale('en');

    const handlenotification = () => {
        PushNotification.localNotification({
            channelId: "reminder",
            title: "Notifications",
            message: "Event"
        })
    }

    async function setTheme() {
        setLoading(true)
        dispatch(setIsDarkTheme(!isDarkTheme))
        await AsyncStorage.setItem("savetheme", JSON.stringify(isDarkTheme));
        setLoading(false)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {refreshing == true ? null : <Loader animating={loading} />}
            <StatusBar backgroundColor={"#1CAE81"} barStyle="dark-content" translucent={true}/>
            <ScrollView refreshControl={<RefreshControl progressBackgroundColor={"#fafafa"} colors={['#1CAE81']} refreshing={refreshing} onRefresh={refresh} />}>
                <View style={[styles.homeheader, { backgroundColor: colors.loginbackground }]}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../../Assets/White_New_Login.png')} style={{ alignSelf: "center", width: 100, height: 50, marginVertical: 5, resizeMode: "contain" }} />

                        <View style={styles.homeiconcontianer}>
                            <TouchableOpacity onPress={() => { setTheme() }}>
                                <MaterialCommunityIcons name="theme-light-dark" color={colors.loginbackground2} size={30} />
                            </TouchableOpacity>
                            <View style={styles.homerighticoncontainer}>
                                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                                    <FontAwesome name="bell" color="white" size={18} style={[styles.righticon, { backgroundColor: colors.signinHeader}]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.searchcontainer}>
                        <View style={styles.searchleftcontainer}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["rgba(12,12,12,0.4)", "#1CAE81"]} style={{ backgroundColor: "rgba(12,12,12,0.91)", flexDirection: "row", borderRadius: 50, flex: 1 }}>
                                <FontAwesome name="search" color={colors.loginbackground} size={18} style={[styles.homesearchicon, { backgroundColor: 'rgba(12,12,12,0.4)', borderWidth: 2, borderColor: colors.loginbackground }]} />
                                <TextInput
                                    style={[styles.homesearchinput]}
                                    placeholder="Search"
                                    placeholderTextColor={colors.loginbackground}
                                    onChangeText={(text) => { setSearch(text) }}
                                />
                            </LinearGradient>

                        </View>
                    </View>
                </View>

                {show == true ? <View>
                    <View style={styles.homemain1}>
                        <Text style={[styles.homemainh1, { color: colors.loginbackground }]}>Upcomming Event</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("All Events") }} style={styles.seeallcontainer}>
                            <Text style={{ color: colors.profilrtext }}>See All</Text>
                            <AntDesign name="right" color={colors.profilrtext} />
                        </TouchableOpacity>
                    </View>
                    {eventdata != null &&
                        <FlatList data={eventdata.filter((item) => item.event_name.toUpperCase().includes(search.toUpperCase()) || item.event_location.toUpperCase().includes(search.toUpperCase()))}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("Event Detail", { data: item, root: "Events", user: userid }) }}
                                    style={[styles.eventcard, { borderColor: colors.loginbackground, backgroundColor: "white" }]}>
                                    <Image source={{ uri: `https://event.vrda1.net/${item.event_image}` }} style={styles.eventimage} />
                                    {item.event_name.length > 20 ? <Text style={[styles.eventtitle, { color: colors.loginbackground }]}>{item.event_name.slice(0, 18) + "..."}</Text> : <Text style={[styles.eventtitle, { color: colors.loginbackground }]}>{item.event_name}</Text>}
                                    {item.event_description.length > 21 ? <Text style={styles.eventshortdescription}>{item.event_description.slice(0, 15) + "..."}</Text> : <Text style={styles.eventshortdescription}>{item.event_description}</Text>}

                                    <View style={styles.eventlocation}>
                                        <Fontisto name="date" color={"black"} />
                                        {item.event_start_time.length > 10 ? <Text style={styles.eventtime}>{Moment(item.event_start_time).format("YYYY-MM-DD")}</Text> : <Text style={styles.eventtime}>{item.event_start_time}</Text>}
                                    </View>

                                    <View style={styles.eventlocation}>
                                        <Ionicons name="location" color={"black"} />
                                        {item.event_location.length > 21 ? <Text style={styles.eventtime}>{item.event_location.slice(0, 15) + "..."}</Text> : <Text style={styles.eventtime}>{item.event_location}</Text>}
                                    </View>
                                    <View style={styles.eventdate}>
                                        <Text style={{ fontSize: 16, color: colors.loginbackground }}>{Moment(item.event_start_time).format('D MMM')}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />}

                    <Text style={[styles.homemainh2, { color: colors.loginbackground }]}>Special Event</Text>
                    <View style={[styles.homecardcotainer, { backgroundColor: colors.loginbackground }]}>
                        <View style={{ flex: 1 }}>
                            {specialevent != null ? <Text style={[styles.homemainh2, { color: colors.text }]}>{specialevent.event_name}</Text> :
                                <Text style={[styles.homemainh2, { color: colors.text }]}>Comming Soon</Text>}
                           {specialevent != null ? <Text style={[styles.cardtext, { color: colors.text }]}>{specialevent.event_description}</Text>:<Text></Text>}
                            {specialevent != null ? <TouchableOpacity onPress={() => { navigation.navigate("Event Detail", { data: specialevent, root: "SEvents", user: userid }) }} style={[styles.cardbtn, { backgroundColor: colors.signinHeader }]}>
                                <Text style={{ color: colors.text }}>View Now</Text>
                                <Ionicons name="eye" size={15} color="white" style={styles.cardbtnicon} />
                            </TouchableOpacity> :
                                <View style={[styles.cardbtn, { backgroundColor: colors.signinHeader }]}>
                                    <Text style={{ color: colors.text }}>View Now</Text>
                                    <Ionicons name="eye" size={15} color="white" style={styles.cardbtnicon} />
                                </View>
                            }
                        </View>
                        <Image source={require('../../Assets/Avator.png')} style={styles.cardimg} />
                    </View>

                </View>
                    : <View></View>}
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1, backgroundColor: colors.loginbackground2, borderRadius: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.profildatetext }}>Notifications</Text>
                            <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ alignSelf: "flex-end" }}>
                                <Ionicons name={"close"} color={colors.profildatetext} size={30} style={{ marginVertical: 10 }} />
                            </TouchableOpacity>
                        </View>
                        {messages != null && <FlatList data={messages}
                            renderItem={({ item, index }) => (
                                <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: "rgba(28,174,129,0.29)", padding: 2, borderRadius: 5, paddingHorizontal: 5 }}>
                                    <Text style={{ fontWeight: "bold", color: colors.profildatetext }}>{item.heading}</Text>
                                    <Text style={{ color: colors.profildatetext }}>{item.message}</Text>
                                </View>
                            )}
                        />}

                    </View>

                </Modal>
            </ScrollView>
        </SafeAreaView>

    )
}
export default Home
