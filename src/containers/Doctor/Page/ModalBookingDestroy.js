import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {handleAuth} from "./../../../Auth/index"

import "./scss/ModelBookingNew.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserByIdApi } from '../../../services/userService';
import { toast } from 'react-toastify';
import { handleChangeStatusBookingApi, handleCreateBookingCancelledApi } from '../../../services/bookingService';
function ModalBookingDestroy(props) {
    const [idPatient, setIdPatient] = useState(handleAuth().id);
    const [infoPatient, setInfoPatient] = useState({});
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    let getDataUser = async () => {
        setLoading(true);
        let data = await getUserByIdApi(idPatient);

        setInfoPatient(data.users);
        setLoading(false);
        console.log("A",props.info);
        
    }
    useEffect(() => {
        getDataUser();
    }, [])
    
    let handleComfirmBooking = async() => {
        setLoading(true);
        let data = await handleCreateBookingCancelledApi({
            bookingId: props.info.id,
            reason: reason
        });
        let res = await handleChangeStatusBookingApi(props.info.id, "S4" );
        setLoading(false);
        toast.success("Hủy lịch hẹn thành công");
        
        
        props.handleToggleModalDestroy();

        
    }

    return (
        <Modal isOpen={true} className={'booking-modal-container'}
                centered={true}
                size="lg"
            >


                <div className="modal-header">
                    < h5 className="modal-title" > Xác nhận hủy lịch hẹn</h5 >
                    <i class="fa-solid fa-xmark"
                        
                    ></i>
                </div >
                <div className="modal-body">
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12">
                                    <label htmlFor="">Lý do hủy</label>
                                
                                    <textarea name="" id="" cols="20" rows="5" className="form-control"
                                    onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                    

                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="modal-footer">
                    <input type="button" className="btn btn-primary" value="Xác nhận hủy" onClick={handleComfirmBooking} />
                    <input type="button" className="btn btn-exit" data-dismiss="modal"
                    onClick={
                        ()=>{
                            props.handleToggleModalDestroy();
                           
                        }
                    }
                    value="Thoát" 
                     />

                </div>

            </Modal >
    );
}
export default ModalBookingDestroy;