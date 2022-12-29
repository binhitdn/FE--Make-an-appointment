import { floor, isInteger } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { handleAuth } from "../../../../Auth";
import { countViewDoctorApi, handleGetDoctorByIdDoctorApi, handleGetReviewByDoctorIdApi } from "../../../../services/doctorService";
import DoctorSchedule from "./DoctorSchedule";
import "./scss/DoctorPage.scss";

function DoctorPage() {
    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorAvatar, setDoctorAvatar] = useState("");
    const [doctorDescription, setDoctorDescription] = useState("");
    const [doctorPosition, setDoctorPosition] = useState("");
    const [doctorContentHTML, setDoctorContentHTML] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [nameClinic, setNameClinic] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [review, setReview] = useState([]);
    const [rateDoctor, setRateDoctor] = useState(0);
    const [isHiddenDescription, setIsHiddenDescription] = useState(true);
    const [loading, setLoading] = useState(false);


 

    let getData = async () => {
        let id = window.location.pathname.split("/")[2];
        setDoctorId(id);
        let data = await handleGetDoctorByIdDoctorApi(id);
        console.log(data.data);
        setDoctorName(data.data.userData.lastName + " " + data.data.userData.firstName);
        setDoctorAvatar(data.data.userData.image);
        setDoctorDescription(data.data.description);
        setDoctorContentHTML(data.data.contentHTML);
        let reviewData = await handleGetReviewByDoctorIdApi(window.location.pathname.split("/")[2]);
        setReview(reviewData.data);
        
        let count = 0;
        if (reviewData.data.length > 0) {
            reviewData.data.forEach((item) => {
                count += item.rate;
            })
            setRateDoctor(count / reviewData.data.length);
        } else {
            setRateDoctor("Chưa có đánh giá");
        }

        

        
    }
    useEffect(() => {
        getData();
       
    }, [])
    useEffect(() => {
        let data = {
            doctorId: doctorId,
            doctorName: doctorName,
            doctorAvatar: doctorAvatar,
            doctorDescription: doctorDescription,
            doctorPosition: doctorPosition,
            doctorContentHTML: doctorContentHTML,
        }
        console.log("DoctorPage: ", data);
    })
   
    
    let styleDescription = () => {
        if(isHiddenDescription) {
            return {
                height: "230px",
                overflow: "hidden",
                
            }
        } else {
            return {
                height: "auto",
                overflow: "visible"
            }
        }
    }
    
    useEffect(() => {
        async function countView() {
            let data = await countViewDoctorApi(window.location.pathname.split("/")[2]);
            console.log(
                "countViewDoctorApi: ",
                data
            );

        }
        countView();
    }, [loading])
    // for (const [i, product] of products.entries()) {
    //     list.push(<li>{product}</li>)
    //   }
    
    let renderReview = () => {
        const list = []
        for (let i = 1; i <= rateDoctor; i++) {
            console.log(i);
            list.push(<i className="fas fa-star star-web"></i>) 
        }
        if(rateDoctor % 1 !== 0) {
            list.push(<i className="fas fa-star-half-alt star-web"></i>)
        }
        for (let i = 1; i <= 5 - Math.round(rateDoctor) - 1; i++) {
            list.push(<i className="fa-regular fa-star star-web"></i>)
        }
        return list;
    }

    

      
            
    return (
        <Fragment>
               
                <div className="doctor-detail-container">
                    <div className="doctor-info">
                        <div className="doctor-avatar"
                            style={{ backgroundImage: `url(${doctorAvatar})`,
                            flexShrink: "0",
                            backgroundClip: "content-box",
                            border: "1px solid #e9ecef",
                            padding: "2px",
                            boxSizing: "border-box",
                            boxShadow: "0 0 0 1px rgba(0,0,0,.125)",
                        }}

                        ></div>
                        <div className="doctor-info-content">
                            <h2 className="doctor-name">
                                {doctorPosition} {doctorName}
                            </h2>
                            <h6 className="doctor-description">

                                {doctorDescription}


                            </h6>
                            <div className="doctor-rate">
                                <div className="doctor-rate-star">
                                    {
                                        rateDoctor === "Chưa có đánh giá" ? rateDoctor : (
                                            <Fragment>
                                                
                                                {
                                                    // isInteger(rateDoctor) ? (
                                                    //     <Fragment>
                                                    //         <i 
                                                    //         className={
                                                    //             rateDoctor >= 1 ? "fas fa-star" : "fa-regular fa-star"
                                                    //         }
                                                            
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 2 ? "fas fa-star" : "fa-regular fa-star"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 3 ? "fas fa-star" : "fa-regular fa-star"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 4 ? "fas fa-star" : "fa-regular fa-star"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 5 ? "fas fa-star" : "fa-regular fa-star"
                                                    //         }
                                                    //         ></i>
                                                    //     </Fragment>
                                                    // ) : (
                                                    //     <Fragment>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 1 ? "fas fa-star" : "fa-duotone fa-star-half-stroke"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 2 ? "fas fa-star" : "fa-duotone fa-star-half-stroke"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 3 ? "fas fa-star" : "fa-duotone fa-star-half-stroke"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 4 ? "fas fa-star" : "fa-duotone fa-star-half-stroke"
                                                    //         }
                                                    //         ></i>
                                                    //         <i
                                                    //         className={
                                                    //             rateDoctor >= 5 ? "fas fa-star" : "fa-duotone fa-star-half-stroke"
                                                    //         }
                                                    //         ></i>

                                                    //     </Fragment>


                                                            
                                                        

                                                    // )
                                                    renderReview()
                                                }
                                                {
                                                    rateDoctor.toFixed(2)
                                                }
                                            </Fragment>
                                        )
                                    }
                                    
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="doctor-schedule-component">
                        <DoctorSchedule idDoctor={doctorId}
                         layout ="row"
                         doctorName={doctorName}
                         doctorAvatar={doctorAvatar}
                         doctorPosition={doctorPosition}
                        />

                    </div>

                    <div className="doctor-content-component">
                        <div className="doctor-content"
                        style={styleDescription()}
                        >
                            <div dangerouslySetInnerHTML={{ __html: doctorContentHTML }}></div>
                        </div>
                        <div className="doctor-content-button">
                            <div className="doctor-content-button-show"
                            onClick={() => {
                                setIsHiddenDescription(!isHiddenDescription);
                            }}
                            >
                                {isHiddenDescription ? "Xem thêm" : "Thu gọn"}
                            </div>
                        </div>



                    </div>
                    <div className="doctor-review-component">
                        <div className="doctor-review">
                            
                            <i className="fas fa-star"></i>
                            Đánh giá của bệnh nhân
                                

                        </div>
                        <div className="doctor-review-content">
                            {/* {review.map((item, index) => {
                                return (
                                    <div className="doctor-review-item">
                                        <div className="doctor-review-item-header">
                                            <div className="doctor-review-item-name">
                                                {item.bookingData.patientData.userData.lastName} {item.bookingData.patientData.userData.firstName}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })} */}
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
            </Fragment>
    )
    

}
export default DoctorPage;