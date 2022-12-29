import moment from 'moment';
import DatePicker ,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ModalLoading.scss"

function ModalLoading() {
  return (
    <Modal isOpen={true} className={'modal-loadings'}
            centered={true}
            
        >


           
            {/* <div className="modal-content"
            style={{
                backgroundColor: "transparent",
                border: "none"
            }}
            >
            <div className="modal-body"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                backgroundColor: "transparent"
            }}
            > */}
               <div className="modal-loading"
            //    style={{
            //         // backgroundImage: `url("https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif")`,
            //         // backgroundImage: `url("https://media1.giphy.com/media/LP01OPcV97bomkxOAk/giphy.gif?cid=6c09b952c2f33555e610a0aaa213ce109524defd042585b1&rid=giphy.gif&ct=s")`,
            //         // backgroundImage: `url("../assets/images/data/loading.gif")`,
            //         backgroundSize: "contain",
            //         backgroundPosition: "center",
            //         backgroundRepeat: "no-repeat",
            //         height: "300px",
            //         width: "300px",
            //         margin: "0 auto"
            //     }}
                ></div>
                {/* <div className="modal-loading-text" style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold"
                }}>Loading...</div> */}
                
            {/* </div>
            </div> */}
            

        </Modal >
);    

}
export default ModalLoading;