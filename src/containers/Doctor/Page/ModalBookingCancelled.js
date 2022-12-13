import moment from 'moment';
import DatePicker ,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {handleAuth} from "./../../../Auth/index"

import "./scss/ModelBookingNew.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserByIdApi } from '../../../services/userService';
import { handleChangeStatusBookingApi, handleComfirmBookingApi } from '../../../services/bookingService';
import { toast } from 'react-toastify';
function ModalBookingCancelled(props) {
    const [idPatient, setIdPatient] = useState(handleAuth().id);
    const [infoPatient, setInfoPatient] = useState({});

    let getDataUser = async () => {
        let data = await getUserByIdApi(idPatient);
        setInfoPatient(data.users);
        console.log("A",props.info);
        
    }
    useEffect(() => {
        getDataUser();
    }, [])
    
    let handleComfirmBooking = async(id) => {
        props.handleConfirmBooking(id);
    }

    return (
        <Modal isOpen={true} className={'booking-modal-container'}
                centered={true}
                size="lg"
            >


                <div className="modal-header">
                    < h5 className="modal-title" > Thông tin đặt lịch khám bệnh</h5 >
                    <i class="fa-solid fa-xmark"
                        
                    ></i>
                </div >
                <div className="modal-body">
                    <div>
                        <div className="info-schedule">
                            <div className="info-doctor">
                                
                            </div>
                            <div className="info-extra">
                                <div className="select-price">
                                    <center>
                                       
                                    </center>
                                </div>
                                <span> 08:00 - 09:00 && 27/03/2022</span>
                                <span> </span>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                    <i className="fa-solid fa-user input-icon-icon"></i>
                                    <p>Họ Tên Bệnh Nhân: {props.info.patientData.userData.lastName} {props.info.patientData.userData.firstName} </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-regular fa-calendar input-icon-icon"></i>
                                    <p>Ngày sinh: 01/01/1999</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-solid fa-phone input-icon-icon"></i>
                                    <p>Số điện thoại: {props.info.patientData.userData.phone}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <p>Email: {props.info.patientData.userData.email} </p>

                                </div>
                            </div>

                        </div>
                        <div className="row">

                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-sharp fa-solid fa-location-dot input-icon-icon"></i>
                                    <p>Địa chỉ: {props.info.patientData.userData.address}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">

                                    <i class="fa-light fa-square-user input-icon-icon"></i>
                                    <p>Giới tính: {props.info.patientData.userData.gender}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <p>ko biết </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {/* <input type="button" className="btn btn-primary" value="Xác nhận" onClick={()=>{handleComfirmBooking(props.info.id)}} />
                    <button type="button" className="button btn-continue" data-dismiss="modal">Hủy</button>
                    <button type="button" className="button btn-exit" data-dismiss="modal"
                    onClick={props.handleToggleModal}
                    >Thoát</button> */}
                    <input type="button" className="btn btn-primary" value="Khám xong" onClick={()=>{handleComfirmBooking(props.info.id)}} />
                    <input type="button" className="btn btn-primary" value="In giấy khám" onClick={()=>{props.handleToggleModal()}} />
                    <input type="button" className="btn btn-primary" value="Hủy" onClick={()=>{props.handleToggleModal()}} />
                    

                </div>

            </Modal >
    );
}
export default ModalBookingCancelled;