import { useEffect } from "react";
import { useState } from "react";
import { handleGetCountBooking, handleGetCountDoctor, handleGetCountPatient, handleGetCountUser } from "../../../services/systemService";
import "./scss/Statistical.scss"
import CountUp from 'react-countup';
import { handleGetBookingApi, handleGetBookingByDoctorStatusAndDateApi, handleGetCountBookingByDoctorApi } from "../../../services/bookingService";
import { handleAuth } from "../../../Auth";
import StatisticalTable from "./StatisticalTable";
import moment from "moment/moment";
import { handleGetDoctorByIdApi, handleGetReviewByDoctorIdApi } from "../../../services/doctorService";
import BookingAboutToExpire from "./BookingAboutToExpire";

function Statistical(){
    const [allBooking, setAllBooking] = useState(0);
    const [bookingNew, setBookingNew] = useState(0);
    const [bookingFinish, setBookingFinish] = useState(0);
    const [bookingCancel, setBookingCancel] = useState(0);
    const [bookingToday, setBookingToday] = useState();
    const [bookingAboutToExpire, setBookingAboutToExpire] = useState();
    const [review, setReview] = useState([]);





    let getData = async() => {
        let all = await handleGetCountBookingByDoctorApi(
            handleAuth().id,
            "all"
        );
        setAllBooking(all);
        let newBooking = await handleGetCountBookingByDoctorApi(
            handleAuth().id,
            "S1"
        );
        setBookingNew(newBooking);
        let finishBooking = await handleGetCountBookingByDoctorApi(
            handleAuth().id,
            "S3"
        );
        setBookingFinish(finishBooking);
        let cancelBooking = await handleGetCountBookingByDoctorApi(
            handleAuth().id,
            "S4"
        );
        setBookingCancel(cancelBooking);
        let bookingToday = await handleGetBookingByDoctorStatusAndDateApi(handleAuth().id,"S2",moment(new Date()).format("YYYY-MM-DD"));
        setBookingToday(bookingToday);
        console.log(bookingToday);
        let idd = await handleGetDoctorByIdApi(handleAuth().id);

        let data = await handleGetBookingApi("S1",idd.data.id);
        let bookingAboutToExpire = data.filter(item => {
            let date = new Date(item.date);
            let now = new Date();
            let diff = date.getTime() - now.getTime();
            if(diff <= 86400000 && diff >= 0){
                return item;
            }
        })
        setBookingAboutToExpire(bookingAboutToExpire);
        let reviewData = await handleGetReviewByDoctorIdApi(idd.data.id);
        setReview(reviewData.data);
        

        

    }
    useEffect(() => {
        getData();
    },[])
    return (
        <div className="statistical">
            <div className="statistical__header">
                <h1>Thống Kê</h1>
            </div>
            <div className="statistical__body">
                <div className="div_statistical_item">
                    <div className="statistical_data t-orange">
                    <CountUp end={allBooking*10} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    
                    <div className="statistical_title t-orange" >
                    <i class="fa-solid fa-hospital-user"></i>
                        Tổng số bệnh nhân
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-blue">
                    <CountUp end={bookingNew*10} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-blue">
                        <i class="fa-solid fa-user-plus"></i>
                        Số lịch hẹn mới
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-green">
                    <CountUp end={bookingFinish*10} 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-green">
                        <i class="fa-solid fa-user-check"></i>
                        Số lịch hẹn đã hoàn thành
                    </div>

                </div>
                <div className="div_statistical_item">
                    <div className="statistical_data t-red">
                    <CountUp end={
                        bookingCancel*10
                    } 
                    delay={2}
                    duration={3}
                    
                    />
                    </div>
                    <div className="statistical_title t-red">
                        <i class="fa-solid fa-user-xmark"></i>
                        Số lịch hẹn đã hủy
                    </div>

                </div>
            </div>
            <div className="statistical__footer">
                <div className="statistical__footer__header">
                <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Lịch hẹn hôm nay</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Lịch hẹn sắp hết hạn</button>
    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Đánh giá gần đây</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <div className="row">
            <div className="col-6">
            <StatisticalTable  bookingToday={bookingToday}/>
            </div>
        </div>
  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <BookingAboutToExpire booking={bookingAboutToExpire} />
    
  </div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

  {
                                review.map((item, index) => {
                                    return (
                                        <div className="doctor-review-item">
                                <div className="doctor-review-item-header">
                                    <div className="doctor-review-item-avatar"
                                    style={{backgroundImage: `url(${item.bookingData.patientData.userData.image})`}}
                                    >
                                        
                                    </div>
                                    <div className="doctor-review-item-name">
                                        {item.bookingData.patientData.userData.lastName} {item.bookingData.patientData.userData.firstName}
                                    </div>
                                    <div className="doctor-review-item-date">
                                        <i className="far fa-clock"></i> 
                                        Đã khám ngày {moment(item.bookingData.date).format("DD/MM/YYYY")}
                                    </div>
                                
                                   
                                </div>
                                <div className="doctor-review-item-content">
                                    <div className="doctor-review-item-content-review">
                                        {item.review}
                                    </div>
                                </div>
                                <div className="doctor-review-item-rating">
                                <i class={
                                        item.rate >= 1 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                  }
                                  
                                  ></i>
                                    <i class={
                                        item.rate >= 2 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    ></i>
                                    <i class={
                                        item.rate >= 3 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    ></i>
                                    <i class={
                                        item.rate >= 4 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    ></i>
                                    <i class={
                                        item.rate >= 5 ? "fa-solid fa-star icon-rating" : "fa-regular fa-star icon-rating"
                                    }
                                    ></i>
                                    </div>
                            </div>
                                    )
                                }
                                )
                            }
                            {
                                review.length === 0 ? <div className="doctor-review-item">
                                    <div className="doctor-review-item-header">
                                        <div className="doctor-review-item-name">
                                            Chưa có đánh giá nào
                                        </div>
                                    </div>
                                </div> : ""
                            }

  </div>
</div>
                    
                    
                    
                </div>
            </div>
        </div>
    )
}
export default Statistical;