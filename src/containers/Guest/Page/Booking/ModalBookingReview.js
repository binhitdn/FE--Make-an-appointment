import "react-datepicker/dist/react-datepicker.css";
import {  Modal } from 'reactstrap';
import {handleAuth} from "../../../../Auth/index"
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserByIdApi } from "../../../../services/userService";
import { handleCreateNewReviewApi } from "../../../../services/doctorService";
import "./ModalBookingReview.scss";
import moment from "moment";
import { toast } from "react-toastify";


function ModalBookingReview(props) {
    const [idPatient, setIdPatient] = useState(handleAuth().id);
    const [infoPatient, setInfoPatient] = useState({});
    const [rating, setRating] = useState(5);
    const [statusEdit, setStatusEdit] = useState(false);
    const [review, setReview] = useState("");
    var Buffer = require('buffer/').Buffer


    let getDataUser = async () => {
        let data = await getUserByIdApi(idPatient);
        setInfoPatient(data.users);
    }
    useEffect(() => {
        refresh();
    }, [])

    let refresh = () => {
        console.log("props",props);
        getDataUser();
        let check = props.info.reviewerBookingData.id ? true : false;
        setStatusEdit(check);
        
            setRating( props.info.reviewerBookingData.rate ? props.info.reviewerBookingData.rate : 5);
            setReview(props.info.reviewerBookingData.review ? props.info.reviewerBookingData.review : "");
            
        console.log("info",props.statusEdit);
    }
    
  
   
    
    let convertCurrency = (money) => {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    let handleSaveReview =async () => {
        let data = {
            bookingId: props.info.id,
            rate: rating,
            review: review
        }
        // let a = await handleCreateNewReviewApi(data);
        // console.log("a",a);
        // toast.success("Đánh giá thành công");
        // props.handleToggleModal();
        props.handleSaveReview(data)
        
        
    }
    let handleEditReview = async () => {
        let data = {
            bookingId: props.info.id,
            rate: rating,
            review: review
        }
        props.handleEditReview(data);
        
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
                            <div className="info-doctor"
                            style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
                            >
                                <div className="info-doctor-avatar"
                                style={{backgroundImage: `url(${props.info.doctorData.userData.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: "50%",
                                width: "100px",
                                height: "100px",                           
                            }}
                                >
                                    
                                </div>
                                <div className="info-doctor-name"
                                style={{maxWidth: "600px",marginRight: "20px"}}
                                >
                                    <span>{props.info.doctorData.description}</span>
                                </div>

                            </div>
                            <div className="info-extra">
                                <div className="select-price">
                                    <center>
                                        <div className="price">
                                            <b>
                                            <span className="price-number">{convertCurrency(props.info.doctorData.priceId)}</span>
                                            <span className="price-unit">VNĐ</span>
                                            </b>
                                        </div>
                                       
                                    </center>
                                </div>
                                <span> 
                                    {props.info.timeTypeData2.valueEn} && {moment(props.info.date).format("DD/MM/YYYY")}
                                </span>
                                <span> </span>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                    <i className="fa-solid fa-user input-icon-icon"></i>
                                    <p><b>Họ Tên Bác Sĩ: </b>
                                        {props.info.doctorData.userData.lastName} {props.info.doctorData.userData.firstName}
                                        
                                         </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-duotone fa-flask input-icon-icon"></i>
                                    <p><b>Chuyên Khoa: </b>

                                        {props.info.doctorData.specialtyData.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                <i class="fa-regular fa-clipboard-medical input-icon-icon"></i>
                                    <p><b> Lí Do Khám: </b>
                                        {props.info.reason}
                                        </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                <i class="fa-sharp fa-solid fa-bed input-icon-icon"></i>
                                    <p><b>Chuẩn đoán: </b>
                                        {props.info.bookingfinishData.diagnose}
                                    </p>
                                </div>       
                            </div>
                            

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon">
                                <i class="fa-light fa-capsules input-icon-icon"></i>
                                    <p><b>Đơn thuốc đề xuất: </b>
                                        {props.info.bookingfinishData.medicine}
                                    </p>
                            
                                </div>
                            </div>
                                
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon ">
                                <i class="fa-solid fa-book input-icon-icon"></i>
                                    <p><b>Lời khuyên:</b>
                                        {props.info.bookingfinishData.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                                    

                        
                    
                        <div className="row">
                            <div className="col-12">
                                <label for="exampleFormControlTextarea1">Đánh giá Cuộc Hẹn</label>
                                <div className="rating">
                                    {/* <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i> */}
                                  
                                  <i class={
                                        rating >= 1 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                  }
                                  onClick={() => setRating(1)}
                                  ></i>
                                    <i class={
                                        rating >= 2 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    onClick={() => setRating(2)}
                                    ></i>
                                    <i class={
                                        rating >= 3 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    onClick={() => setRating(3)}
                                    ></i>
                                    <i class={
                                        rating >= 4 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    onClick={() => setRating(4)}
                                    ></i>
                                    <i class={
                                        rating >= 5 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    onClick={() => setRating(5)}
                                    ></i>

                                  
                                </div>
                                
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                placeholder="Nhập đánh giá của bạn..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                ></textarea>
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
                    {/* <button className="btn btn-primary" onClick={handleSaveReview  }>Đánh Giá</button> */}
                    {
                        statusEdit ? <button className="btn btn-primary" onClick={handleEditReview  }>Sửa Đánh Giá</button>
                        : <button className="btn btn-primary" onClick={handleSaveReview  }>Đánh Giá</button>
                    }  
                    <button
                    type="button"
                    className="button btn-exit"
                    data-dismiss="modal"
                    onClick={props.handleToggleModal}
                    >Thoát</button>

                    

                </div>

            </Modal >
    );
}
export default ModalBookingReview;