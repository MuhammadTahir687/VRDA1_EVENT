
import Toast from "react-native-simple-toast";
import {get_data} from "../AsyncStorage/Controller";
import axios from "axios";

const post_request = async ({ target, body }) => {
    console.log("Adadadaaaaaaaaaa", body);
    try {
        
        const token =await get_data("token");
   
        const instance = axios.create({baseURL: "https://event.vrda1.net"});
        console.log("Api Hit=====================",body)
        const response = await instance.post(target, body)
        console.log("post response", response.data);
        return response
    } catch (error) {

        console.log("post error ===================", error);
       
        if(error.response.status==404){
            // Toast.show(  "The email has already been taken.")
            return "Error";
        }
        // alert("check your internet connection...");
        return "Error"
    }

}

const get_request = async (target) => {
    try {
        const token =await get_data("token");
        const instance = axios.create({baseURL: "https://event.vrda1.net", headers: {"Authorization":"Bearer " + token }});
        console.log("Api Hit=====================")
        const response = await instance.get(target)
        var res = response.data
        return res

    } catch (error) {
        console.log("get error", error);
        // alert("check your internet connection...");
        return "Error"
    }
}

export { post_request, get_request }
