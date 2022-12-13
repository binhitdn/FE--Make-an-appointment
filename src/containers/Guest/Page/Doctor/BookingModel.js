import moment from 'moment';
import DatePicker ,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleAuth } from '../../../../Auth';
import "./scss/BookingModel.scss";
import {getUserByIdApi} from '../../../../services/userService';
import { useState } from 'react';
import { useEffect } from 'react';
function BookingModel(props) {
    const [idPatient, setIdPatient] = useState(handleAuth().id);
    const [infoPatient, setInfoPatient] = useState({});
    const [idDoctor, setIdDoctor] = useState(1);
    const [day, setDay] = useState();
    const [time, setTime] = useState();
    const [reason, setReason] = useState();

    let getDataUser = async () => {
        let data = await getUserByIdApi(idPatient);
        setInfoPatient(data.users);
        setDay(props.info.date);
        setTime(props.info.timeTypeData.keyMap);
        
        console.log("A",props.info);
        
        
    }
    useEffect(() => {
        getDataUser();
    }, [])
    useEffect(() => {
        let data = { 
            idPatient: idPatient,
            idDoctor: idDoctor,
            day: day,
            time: time,
            reason: reason
        }
        console.log("data booking modal: ",data);
    }, )
    
    let handleChangeInput = (e) => {
        let { name, value } = e.target;
        if (name === "reason") {
            setReason(value);
        }
    }
    let formatCurrency = (number) => {
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
                        onClick={props.handleToogleBookingFarent}
                    ></i>
                </div >
                <div className="modal-body">
                    <div>
                        <div className="info-schedule">
                            <div className="info-doctor">
                                Xác nhận đặt lịch khám với Bác Sĩ &nbsp;
                                {props.doctorName}
                            </div>
                            <div className="info-extra">
                                <div className="select-price">
                                    <center>
                                        <input type="radio"  checked />
                                        Giá khám {formatCurrency(props.price)} VNĐ
                                        
                                    </center>
                                </div>
                                <span> {moment(props.info.date).format("MM-DD-YYYY")} && 
                                {props.info.timeTypeData.valueEn}
                                </span>
                                <span> </span>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">
                                    <i className="fa-solid fa-user input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Họ tên bệnh nhân" value= {infoPatient.lastName +" " + infoPatient.firstName}  disabled ></input>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">
                                    <i class="fa-regular fa-calendar input-icon-icon"></i>
                                    <DatePicker selected={new Date()} 
                        //             onChange={
                        //  (date) => handleChangeDatePicker(date) }
                        
                        
                    
                    locale="vi"
                    dateFormat="dd/MM/yyyy"
                    
                    className="form-control"
                    /> 
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-phone input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Số điện thoại liên hệ" value={infoPatient.phone} disabled></input>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Email" type="email" value={infoPatient.email} disabled></input>
                                </div>
                            </div>

                        </div>
                        <div className="row">

                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">
                                    <i class="fa-sharp fa-solid fa-location-dot input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Địa chỉ liên hệ" type="text" value={infoPatient.address} disabled></input>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="input-icon">

                                    <i class="fa-light fa-square-user input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Đặt cho ai" type="text"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Lí do khám" type="text" value={reason}
                                    name="reason"
                                    onChange={handleChangeInput}
                                    ></input>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button btn-primary" data-dismiss="modal"
                    onClick={() => props.handleBookingSuccess(day, time, reason)}
                    >Thanh toán Bằng MOMO</button>
                    <button type="button" className="button btn-continue" data-dismiss="modal"
                    onClick={() => props.handleBookingSuccess(day, time, reason)}
                    >Thanh toán Trực Tiếp</button>
                    <button type="button" className="button btn-exit" data-dismiss="modal"
                    onClick={props.handleToogleBookingFarent}
                    
                    >Thoát</button>

                </div>

            </Modal >
    );
}
export default BookingModel;