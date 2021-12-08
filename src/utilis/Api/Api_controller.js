import { post_request, get_request } from "./Requests";

const Login_api = async (body) => {
    const Test = await post_request({ target: "/api/login", body: body });
    return Test
}

const Signup_api = async (body) => {
    const Test = await post_request({ target: "/api/register", body: body });
    return Test
}

const Event_visitor_api = async (body) => {
    const Test = await post_request({ target: "/api/event-visitor", body: body });
    return Test
}

const Event_visitor_response_api = async (body) => {
    const Test = await post_request({ target: "/api/event-visitor-request", body: body });
    return Test
}

const Update_profile_api = async (body) => {
    const Test = await post_request({ target: "/api/update-profile", body: body });
    return Test
}

const OTP_api = async (body) => {
    const Test = await post_request({ target: "/api/email-confirmation", body: body });
    return Test
}

const Attendance_api = async (body) => {
    const Test = await post_request({ target: "/api/mark_attendance", body: body });
    return Test
}

const Events_details = async (target) => {
    const Test = await get_request("/api/event-details/" + target);
    return Test
}

const Coming_Events = async (target) => {
    const Test = await get_request("/api/coming-events/" + target);
    return Test
}
const register_api = async (body) => {
    const Test = await post_request({ target: "/api/register", body: body });
    return Test
}
const changepassword_api = async (body) => {
    const Test = await post_request({ target: "/api/change-password", body: body });
    return Test
}
const resetpassword_api = async (body) => {
    const Test = await post_request({ target: "/api/reset-password", body: body });
    return Test
}
const forgotpassword_api = async (body) => {
    const Test = await post_request({ target: "/api/send-email", body: body });
    return Test
}
const eventvisitor_api = async (body) => {
    const Test = await post_request({ target: "/api/event-visitor-request", body: body });
    return Test
}
const attendance_api = async (body) => {
    const Test = await post_request({ target: "/api/mark_attendance", body: body });
    return Test
}
const visitorrequest_api = async (body) => {
    const Test = await post_request({ target: "/api/event-visitor", body: body });
    return Test
}

const verifycode_api = async (body) => {
    const Test = await post_request({ target: "/api/verification-code", body: body });
    return Test
}

const resendcode_api = async (body) => {
    const Test = await post_request({ target: "/api/verification-code", body: body });
    return Test
}

export {resendcode_api,verifycode_api,visitorrequest_api,attendance_api,eventvisitor_api,forgotpassword_api,resetpassword_api, changepassword_api,Login_api, Signup_api, Event_visitor_api, Event_visitor_response_api, Update_profile_api, OTP_api, Attendance_api, Events_details,Coming_Events,register_api   }
