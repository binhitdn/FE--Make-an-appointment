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
function ModelBookingNew(props) {
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
    let parseCurrency = (number) => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
                                <div className="info-doctor__avatar">
                                    <img src={props.info.patientData.userData.image ? props.info.patientData.userData.image : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt="" 
                                    style={{width: "70px", height: "70px", borderRadius: "50%",marginBottom: "20px"}}/>
                                    
                                </div>
                                
                            </div>
                            {/* <div className="info-extra">
                                <div className="select-price">
                                    <center>
                                    parseCurrency(props.info.doctorData.price)
                                    </center>
                                </div>
                                <span> 
                                    <i class="fa-solid fa-calendar"></i>
                                    <span>Ngày khám: </span>
                                    <span>{moment(props.info.date).format("DD/MM/YYYY")}</span>
                                    <span> - </span>
                                    <span>{props.info.timeTypeData2.valueEn}</span>
                                    
                                </span>
                                <span> </span>

                            </div> */}
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
                            {/* <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-regular fa-calendar input-icon-icon"></i>
                                   
                                </div>
                            </div> */}
                            <div className="col-6">
                                <div className="input-icon">

                                    <i class="fa-light fa-square-user input-icon-icon"></i>
                                    <p>Giới tính: {props.info.patientData.userData.gender}</p>
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

                            <div className="col-12">
                                <div className="input-icon">
                                    <i class="fa-sharp fa-solid fa-location-dot input-icon-icon"></i>
                                    <p>Địa chỉ: {props.info.patientData.userData.address}</p>
                                </div>
                            </div>
                            {/* <div className="col-6">
                                <div className="input-icon">

                                    <i class="fa-light fa-square-user input-icon-icon"></i>
                                    <p>Giới tính: {props.info.patientData.userData.gender}</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <p>
                                        
                                        Lí do khám: {props.info.reason}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <input type="button" className="btn btn-primary" value="Xác nhận" onClick={()=>{handleComfirmBooking(props.info.id)}} />
                    <input type="button" className="btn btn-continue" data-dismiss="modal" value="Hủy cuộc hẹn" 
                    onClick={()=>{
                        props.handleToggleModalDestroy();
                        props.handleToggleModal();
                    }}
                    />
                    <input type="button" className="btn btn-exit" data-dismiss="modal"
                    onClick={props.handleToggleModal}
                    value="Thoát" 
                     />

                </div>

            </Modal >
    );
}
export default ModelBookingNew;