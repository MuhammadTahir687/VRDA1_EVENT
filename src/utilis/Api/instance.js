import axios from "axios";
import {get_data} from "../AsyncStorage/Controller";
const instance = axios.create({

    baseURL: "http://emailsend.mirindaweb.com",
    headers: {}
});
export { instance }
