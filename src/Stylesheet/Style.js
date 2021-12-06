import React from "react";
import {StyleSheet,Dimensions} from "react-native";
import Color from "./Color";
const devicehieght=Dimensions.get("window").height;
const devicewidth=Dimensions.get("window").width;


export default StyleSheet.create({
    loginhcontainer:{flex:1,marginHorizontal:20,marginTop:20},
    welcome:{fontWeight:"bold",fontSize:35},
    loginh2:{fontSize:20,marginTop:20},
    loginh3:{fontWeight:"bold",fontSize:25},
    logincontainer3:{flex:1,marginHorizontal:10,marginBottom:5},
    loginbtncontainer1:{paddingHorizontal:10,paddingVertical:10,borderRadius:15,marginBottom:20},
    loginbtntext:{fontSize:15,textAlign:"center"},
    loginbtncontainer2:{borderWidth:1,paddingHorizontal:10,paddingVertical:10,borderRadius:15},
    loginbtntext2:{fontSize:15,textAlign:"center"},
    loginq:{textAlign:"center",marginVertical:10},
    loginq1:{textAlign:"center",marginVertical:10},
    loginqbtn:{fontWeight:"bold"},
    loginqcontainer:{flexDirection:"row",alignItems:"center",justifyContent:'center'},
    loginimage:{width:153,height:120,marginHorizontal:20},
    signinqcontainer:{flexDirection:"row",alignItems:"center",justifyContent:'center'},

    signinheader:{height:devicehieght/5,justifyContent:"center",marginLeft:10},
    signinmain:{flex:1,borderTopLeftRadius:20,borderTopRightRadius:20},
    signinmain1:{flex:1,borderTopLeftRadius:20,borderTopRightRadius:20},
    signinheadertext:{fontWeight:"bold",fontSize:20},
    signinheadericon:{marginBottom:10},
    signinmainh1:{fontWeight:"bold",fontSize:23,marginTop:20},
    signinmaincontainer:{marginHorizontal:10},

    signininputcontainer:{flex:1,marginTop:10},
    signininput:{borderRadius:10,fontSize:13},
    signinfp:{marginVertical:10,textAlign:"right"},
    signinbtn:{paddingVertical:10,borderRadius:10,marginTop:10},
    rowinputcontainer:{flex:1,flexDirection:"row"},

    sociallogincontainer:{flexDirection:"row",alignItems:'center',justifyContent:"space-between",marginHorizontal:10,marginTop:10,borderRadius:5,},
    socialloginfbicon:{alignSelf:"flex-start",paddingVertical:9.7,paddingHorizontal:12,borderTopLeftRadius:10,borderBottomLeftRadius:10},
    sociallogingicon:{alignSelf:"flex-start",padding:9.7,borderTopLeftRadius:10,borderBottomLeftRadius:10},
    socialloginfbtext:{flex:1,textAlign:'center',padding:9.5,borderTopRightRadius:10,borderBottomRightRadius:10},

    homeheader:{height:devicehieght/4.5 ,borderBottomRightRadius:80,borderBottomLeftRadius:80},
    homeheaderh1:{textAlign:"center",marginTop:10,fontSize:10},
    homeheaderh:{textAlign:"center",fontSize:15},
    homeiconcontianer:{flexDirection:"row",justifyContent:'space-between',marginHorizontal:20,alignItems:"center",marginBottom:10},
    homerighticoncontainer:{flexDirection:"row",alignItems:'center'},
    righticon:{marginHorizontal:10,borderRadius:50,padding:5},
    homesearchicon:{borderRadius:25,padding:10},
    homesearchinput:{height:40,flex:1,color:"white"},
    searchcontainer:{flex:1,flexDirection:"row",justifyContent:"center",marginHorizontal:40,alignItems:"center",top:8},
    searchcontainer1:{flex:1,flexDirection:"row",justifyContent:"center",marginHorizontal:40,alignItems:"center",bottom:8},
    filtercontainer:{flex:3,flexDirection:"row",borderBottomRightRadius:50,borderTopRightRadius:50,height:40,alignItems:"center",paddingLeft:10},
    searchleftcontainer:{flex:8,flexDirection:"row",height:40},

    homemainh1:{fontWeight:"bold",fontSize:18},
    homemainh2:{marginHorizontal:10,fontWeight:"bold",fontSize:18},
    seeallcontainer:{flexDirection:"row",alignItems:"center"},
    homemain1:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:10},

    homecardcotainer:{ flexDirection:"row",borderTopLeftRadius:10,borderBottomLeftRadius:10,marginLeft:30,paddingVertical:5,marginVertical:10},
    cardtext:{textAlign:"justify",marginHorizontal:10,marginTop:10,fontSize:12},
    cardbtn:{flexDirection:"row",marginTop:10,alignItems:"center",marginHorizontal:10,alignSelf:"flex-start",borderRadius:50,paddingHorizontal:10,paddingVertical:5},
    eventbtn:{flexDirection:"row",margin:10,alignItems:"center",alignSelf:"center",marginHorizontal:10,borderRadius:50,padding:10},
    cardbtnicon:{marginLeft:10},
    cardimg:{flex:0.7,height:180,alignSelf:"flex-end",top:5.5,},

    eventimage:{width:devicewidth/2.36,height:110,borderTopRightRadius:20,borderTopLeftRadius:20,},
    eventimage1:{height:140,borderTopRightRadius:20,borderTopLeftRadius:20,},
    eventcard:{flex:1,marginHorizontal:10,borderRadius:20,borderWidth:2,marginVertical:10,width:devicewidth/2.3},
    eventcard1:{flex:1,marginHorizontal:40,borderRadius:20,borderWidth:1,marginVertical:10},
    eventtitle:{flex:1,fontWeight:"bold",paddingHorizontal:10,flexWrap:"wrap",fontSize:16},
    eventshortdescription:{flex:1,marginHorizontal:10,textAlign:"justify",color:"black"},
    eventlocation:{flexDirection:"row",alignItems:"center",marginHorizontal:10},
    eventtime:{marginHorizontal:5,color:"black"},

    eventdate:{bottom:189,paddingHorizontal:5,alignItems:"center",marginHorizontal:20,backgroundColor:"white",alignSelf:"flex-start",borderBottomLeftRadius:5,borderBottomRightRadius:5},
    eventdate1:{bottom:219,paddingHorizontal:5,alignItems:"center",marginHorizontal:20,backgroundColor:"white",alignSelf:"flex-start",borderBottomLeftRadius:5,borderBottomRightRadius:5},
    eventdetailheader:{height:devicehieght/4.5,width:"100%",borderBottomRightRadius:20,borderBottomLeftRadius:20},
    eventdetailtitile:{fontSize:20,fontWeight:"bold",marginHorizontal:10},
    dateicon:{padding:7,borderRadius:5,marginTop:10},
    eventdetilsh:{marginHorizontal:10,marginTop:10,fontWeight:"bold",fontSize:15},
    eventdesc:{marginHorizontal:10,textAlign:"justify"},

    eventdetailbackbtn:{flexDirection:"row",marginHorizontal:10,bottom:120,alignSelf:"flex-start",paddingHorizontal:10,borderRadius:5},
    eventavatar:{flexDirection:"row",marginHorizontal:10,alignItems:"center"},
    profileavatar:{flexDirection:"row",marginTop:10,alignItems:"center",padding:10,borderRadius:10},
    avatartext:{flex:1,marginHorizontal:10},
    qrcontainer:{},
    qravatar:{alignItems:"center",justifyContent:"center",marginTop:20},
    qrusername:{borderRadius:10,fontWeight:"bold",fontSize:15},
    profilebg:{flex:1},
    profileheader:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:20},
    profilecontainer:{margin:10,flex:1},
    profileheadertext:{fontSize:18},
    profiledetailsection:{borderRadius:10,marginTop:10,paddingHorizontal:10,flex:6,justifyContent:"space-between",paddingVertical:15},
    updateprofilebtn:{padding:10,borderRadius:10},
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
    alleventheader1:{height:devicehieght/6,width:"100%",borderBottomRightRadius:20,borderBottomLeftRadius:20,},
    alleventbtncontainer:{flexDirection:"row",alignSelf:"center",marginTop:10,bottom:30},
    alleventbtn:{alignSelf:"center",paddingHorizontal:15,paddingVertical:10,borderRadius:50},
    alleventbtntext:{fontWeight:"bold"},

    calendarcontainer:{marginHorizontal:10},
    calendarh:{fontWeight:"bold",fontSize:20,marginTop:10},
    fpcontainer:{marginHorizontal:10,marginVertical:10},

    registerimagecontainer:{flexDirection:"row",alignItems:"center",marginTop:10},
    registerimagename:{flex:1,borderBottomWidth:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginRight:10,paddingVertical:5},


    shopmodal:{backgroundColor: "white", alignSelf: "center", width: 300, borderRadius: 10},
    modalcrossicon:{ justifyContent: "flex-end", flexDirection: "row", marginVertical: 10, marginRight: 20},
    crossicon:{backgroundColor: "gray", borderRadius: 50},
    modalcontentcontainer:{flex: 1,marginHorizontal:10},
    modaltexth:{fontWeight: "normal"},

    vrda1loginimage:{width:100,height:100,resizeMode:"contain",alignSelf:"center",marginTop:10},
    loginbtntext1:{textAlign:"center"},
    loginbtn:{padding:15,marginTop:10,borderRadius:50,elevation:5},
    loginor:{textAlign:"center",marginTop:10},
    loginicon:{borderRadius:50,marginHorizontal:10,paddingHorizontal:10,paddingVertical:10}

















})
