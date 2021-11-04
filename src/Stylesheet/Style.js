import React from "react";
import {StyleSheet,Dimensions} from "react-native";
import Color from "./Color";
const devicehieght=Dimensions.get("window").height;
const devicewidth=Dimensions.get("window").width;


export default StyleSheet.create({
    loginhcontainer:{flex:1,marginHorizontal:10},
    welcome:{fontWeight:"bold",fontSize:23},
    loginh2:{fontSize:16,marginTop:20},
    loginh3:{fontWeight:"bold",fontSize:20},
    logincontainer3:{flex:1,marginHorizontal:10},
    loginbtncontainer1:{paddingHorizontal:10,paddingVertical:5,borderRadius:5,marginBottom:10},
    loginbtntext:{fontSize:18},
    loginbtncontainer2:{borderWidth:1,paddingHorizontal:10,paddingVertical:5,borderRadius:5},
    loginbtntext2:{fontSize:18},
    loginq:{textAlign:"center",marginVertical:10},
    loginq1:{textAlign:"center",marginVertical:10},
    loginqbtn:{fontWeight:"bold"},
    loginqcontainer:{flexDirection:"row",alignItems:"center",justifyContent:'center'},
    loginimage:{resizeMode:"contain",width:150,height:150,marginHorizontal:10},
    signinqcontainer:{flexDirection:"row",alignItems:"center",justifyContent:'center'},

    signinheader:{height:devicehieght/5,justifyContent:"center",marginLeft:10},
    signinmain:{flex:1,borderTopLeftRadius:20,borderTopRightRadius:20},
    signinheadertext:{fontWeight:"bold",fontSize:20},
    signinheadericon:{marginBottom:10},
    signinmainh1:{fontWeight:"bold",fontSize:23,marginTop:20},
    signinmaincontainer:{marginHorizontal:10},

    signininputcontainer:{flex:1,marginTop:10},
    signininput:{borderRadius:10},
    signinfp:{marginVertical:10},
    signinbtn:{paddingVertical:10,borderRadius:10,marginTop:10},
    rowinputcontainer:{flex:1,flexDirection:"row"},

    sociallogincontainer:{flexDirection:"row",alignItems:'center',justifyContent:"space-between",marginHorizontal:10,marginTop:10,borderRadius:5},
    socialloginfbicon:{alignSelf:"flex-start",paddingVertical:9.7,paddingHorizontal:12,borderTopLeftRadius:10,borderBottomLeftRadius:10},
    sociallogingicon:{alignSelf:"flex-start",padding:9.7,borderTopLeftRadius:10,borderBottomLeftRadius:10},
    socialloginfbtext:{flex:1,textAlign:'center',padding:10,color:"orange",borderTopRightRadius:10,borderBottomRightRadius:10},

    homeheader:{height:devicehieght/4.5 ,borderBottomRightRadius:80,borderBottomLeftRadius:80},
    homeheaderh1:{textAlign:"center",marginTop:10,fontSize:10},
    homeheaderh:{textAlign:"center",fontSize:15},
    homeiconcontianer:{flexDirection:"row",justifyContent:'space-between',marginHorizontal:20,alignItems:"center"},
    homerighticoncontainer:{flexDirection:"row",alignItems:'center'},
    righticon:{marginHorizontal:10,borderRadius:50,padding:5},
    homesearchicon:{borderRadius:25,padding:10},
    homesearchinput:{height:40,flex:1,color:"white"},
    searchcontainer:{flex:1,flexDirection:"row",justifyContent:"center",marginHorizontal:30,alignItems:"center",},
    filtercontainer:{flex:3,flexDirection:"row",borderBottomRightRadius:50,borderTopRightRadius:50,height:40,alignItems:"center",paddingLeft:10},
    searchleftcontainer:{flex:8,flexDirection:"row",height:40},

    homemainh1:{fontWeight:"bold",fontSize:18},
    homemainh2:{marginHorizontal:10,fontWeight:"bold",fontSize:18},
    seeallcontainer:{flexDirection:"row",alignItems:"center"},
    homemain1:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:10},

    homecardcotainer:{ flexDirection:"row",borderTopLeftRadius:10,borderBottomLeftRadius:10,marginLeft:30,paddingVertical:10,marginVertical:10},
    cardtext:{textAlign:"justify",marginHorizontal:10,marginTop:10,fontSize:12},
    cardbtn:{flexDirection:"row",marginTop:10,alignItems:"center",marginHorizontal:10,alignSelf:"flex-start",borderRadius:50,padding:10},
    eventbtn:{flexDirection:"row",margin:10,alignItems:"center",alignSelf:"center",marginHorizontal:10,borderRadius:50,padding:10},
    cardbtnicon:{marginLeft:10},
    cardimg:{flex:0.7,height:180,alignSelf:"flex-end",top:10,},

    eventimage:{width:190,height:140,borderTopRightRadius:20,borderTopLeftRadius:20,},
    eventcard:{flex:1,marginHorizontal:10,borderRadius:20,borderWidth:2,marginVertical:10},
    eventcard1:{flex:1,alignSelf:"center",borderRadius:20,borderWidth:2,marginVertical:10},
    eventtitle:{flex:1,fontWeight:"bold",paddingHorizontal:10,flexWrap:"wrap",fontSize:16},
    eventshortdescription:{flex:1,marginHorizontal:10,textAlign:"justify"},
    eventlocation:{flex:1,flexDirection:"row",alignItems:"center",marginHorizontal:10},
    eventtime:{marginHorizontal:5},

    eventdate:{bottom:181,paddingHorizontal:5,alignItems:"center",marginHorizontal:20,backgroundColor:"white",alignSelf:"flex-start",borderBottomLeftRadius:5,borderBottomRightRadius:5},
    eventdetailheader:{height:devicehieght/4.5,width:"100%",borderBottomRightRadius:20,borderBottomLeftRadius:20},
    eventdetailtitile:{fontSize:20,fontWeight:"bold",marginHorizontal:10},
    dateicon:{padding:7,borderRadius:5,marginTop:10},
    eventdetilsh:{marginHorizontal:10,marginTop:10,fontWeight:"bold",fontSize:15},
    eventdesc:{marginHorizontal:10,textAlign:"justify"},

    eventdetailbackbtn:{flexDirection:"row",marginHorizontal:10,bottom:120,alignSelf:"flex-start",paddingHorizontal:10,borderRadius:5},
    eventavatar:{flexDirection:"row",marginHorizontal:10,marginTop:30,alignItems:"center"},
    profileavatar:{flexDirection:"row",marginTop:10,alignItems:"center",padding:10,borderRadius:10},
    avatartext:{flex:1,marginHorizontal:10},
    qrcontainer:{flex:1,justifyContent:"center",alignItems:"center"},
    qravatar:{alignItems:"center",justifyContent:"center",marginTop:20},
    qrusername:{borderRadius:50,fontWeight:"bold",fontSize:15,paddingHorizontal:10,paddingVertical:5,borderWidth:1,top:10,zIndex:1},
    profilebg:{flex:1},
    profileheader:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:20},
    profilecontainer:{margin:10,flex:1},
    profileheadertext:{fontSize:18},
    profiledetailsection:{borderRadius:10,marginTop:10,paddingHorizontal:10,flex:6,justifyContent:"space-between",paddingVertical:15},
    updateprofilebtn:{marginTop:10,padding:10,borderRadius:10},
    avatarname:{fontSize:18,fontWeight:"bold" },

    avatarinput:{flex:1,borderBottomWidth:1,height:35},
    piconatiner:{flexDirection:"row"},
    pi1container:{flex:1,flexDirection:"row",alignItems:"center",marginRight:5},
    pi1icon:{paddingVertical:6,paddingHorizontal:7,borderRadius:10},
    p1textview:{flex:1, marginLeft:10},
    pi1text:{flex:1,fontSize:15,fontWeight:"bold"},
    pdview:{marginLeft:10},
    pdtext:{fontSize:15,fontWeight:"bold"},
    pdvalue:{fontSize:12},

    alleventheader:{height:devicehieght/4.5,width:"100%",borderBottomRightRadius:20,borderBottomLeftRadius:20,},
    alleventbtncontainer:{flexDirection:"row",alignSelf:"center",marginTop:10,bottom:30},
    alleventbtn:{alignSelf:"center",paddingHorizontal:15,paddingVertical:10,borderRadius:50},
    alleventbtntext:{fontWeight:"bold"}

















})
