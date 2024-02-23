import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const $ = require('jquery');

const CloseButton = () => {
    return (
        <span className="btn-trigger toast-close-button" role="button">
            <em className="icon ni ni-cross"></em>
        </span>);

};

const CustomToast = ({title, msg}) => {
    return (
        <div className="toastr-text">
            <h5>{title}</h5>
            <p>{msg}</p>
        </div>);
};

export const toastAlert = (msg, title) => {
    title = title ? title : '';
    msg = msg ? msg : 'Something Great Happened !';

    toast.info( <CustomToast title={title} msg={msg} />, {
        position: "bottom-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        closeButton: <CloseButton />,
    });

    $('.dropdown-menu').removeClass('show');
};