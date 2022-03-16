import axios from "axios";

const instance = axios.create({

    baseURL: "https://event.vrda1.net",
    headers: { }
});
export { instance }
