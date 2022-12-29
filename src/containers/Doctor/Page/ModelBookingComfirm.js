import moment from 'moment';
import DatePicker ,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {handleAuth} from "./../../../Auth/index"


import "./scss/ModelBookingNew.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserByIdApi } from '../../../services/userService';


import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import {jsPDF} from "jspdf";


import { handleChangeStatusBookingApi, handleComfirmBookingApi } from '../../../services/bookingService';
import { toast } from 'react-toastify';
function ModelBookingConfirm(props) {
    const [idPatient, setIdPatient] = useState(handleAuth().id);
    const [infoPatient, setInfoPatient] = useState({});
    const [diagnose, setDiagnose] = useState("");
    const [medicine, setMedicine] = useState("");
    const [note, setNote] = useState("");
    const ref = React.createRef();
    let getDataUser = async () => {
        let data = await getUserByIdApi(idPatient);
        setInfoPatient(data.users);
        console.log("A",props.info);
        
    }
    useEffect(() => {
        getDataUser();
    }, [])
    
    let handleComfirmBooking = async(id,data) => {
        props.handleConfirmBooking(id,data);
    }
                
   
    const handlePrint = () => {
        var doc = new jsPDF();
        
        doc.text(20, 20, 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM');
        doc.text(20, 30, 'Độc lập - Tự do - Hạnh phúc');
        doc.text(20, 40, '-----------------------------');
        doc.text(20, 50, 'HỒ SƠ KHÁM BỆNH');
        doc.text(20, 60, '-----------------------------');
        doc.text(20, 70, 'Họ tên: ' );
        doc.text(20, 80, 'Ngày sinh: ' );
        doc.text(20, 90, 'Giới tính: ' );
        doc.text(20, 100, 'Địa chỉ: ' );
        doc.text(20, 110, 'Số điện thoại: ' );
        doc.text(20, 120, '-----------------------------');
        doc.text(20, 130, 'Chẩn đoán: ' + diagnose);
        doc.text(20, 140, 'Thuốc: ' + medicine);
        doc.text(20, 150, 'Ghi chú: ' + note);
        doc.text(20, 160, '-----------------------------');
        doc.text(20, 170, 'Ngày khám: ' );
        doc.text(20, 180, 'Bác sĩ: ' );
        doc.text(20, 190, '-----------------------------');
        doc.save('a4.pdf');

       
        
        
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
                        {/* <div className="info-schedule">
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
                        </div> */}
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
                                    <p>{
                                        props.info.reason
                                        } </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="label">Chẩn đoán</label>
                            <textarea className="form-control" rows="3" placeholder="Chuẩn đoán"
                            value={diagnose}
                            onChange={(e) => setDiagnose(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <label className="label">Đơn thuốc</label>
                            <textarea className="form-control" rows="3" placeholder="Đơn thuốc"
                            value={medicine}
                            onChange={(e) => setMedicine(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <label className="label">Lời khuyên</label>
                            <textarea className="form-control" rows="3" placeholder="Lời khuyên"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    {/* <input type="button" className="btn btn-primary" value="Xác nhận" onClick={()=>{handleComfirmBooking(props.info.id)}} />
                    <button type="button" className="button btn-continue" data-dismiss="modal">Hủy</button>
                    <button type="button" className="button btn-exit" data-dismiss="modal"
                    onClick={props.handleToggleModal}
                    >Thoát</button> */}
                    <input type="button" className="btn btn-warning" value="Khám xong" onClick={()=>{handleComfirmBooking(props.info.id,{
                        diagnose: diagnose,
                        medicine: medicine,
                        note: note
                    })}} 
                    
                    />
                    
                    <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <input type="button" className="btn btn-primary" value="In giấy khám" onClick={toPdf} 
        style={{backgroundColor: "green"}}
        
        />}
      </Pdf>
      
                    <input type="button" className="btn btn-primary" value="Hủy" onClick={()=>{props.handleToggleModal()}} 
                    style={{backgroundColor: "red"}}
                    />
                    

                </div>
            {/* <div>
                <div
                onClick={handlePrint}
                >
                Print this out!
                </div>
        </div> */}
           
            
            </Modal >
            
    );
}
export default ModelBookingConfirm;