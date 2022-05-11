import React from "react";
import SweetAlert from "react-native-sweet-alert";
const Sweetalert = ({message,styleparam,callbackparam}) => {

    return (
        SweetAlert.showAlertWithOptions({
            title: '',
            subTitle: message,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: styleparam,
            cancellable: true
        },
            callback => callbackparam)
)
}
export default Sweetalert