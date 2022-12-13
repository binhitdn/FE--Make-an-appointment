import moment from 'moment';
import DatePicker ,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalLoading() {
  return (
    <Modal isOpen={true} className={'booking-modal-container'}
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
               style={{
                    backgroundImage: `url("https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "200px",
                    width: "200px",
                    margin: "0 auto"
                }}
                ></div>
                <div className="modal-loading-text" style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold"
                }}>Loading...</div>
                
            {/* </div>
            </div> */}
            

        </Modal >
);    

}
export default ModalLoading;