import { useState } from "react";
import moment from 'moment';
import "./scss/DoctorSchedule.scss";
import { useEffect } from "react";
import { handleGetDoctorByIdDoctorApi, handleGetScheduleByDateApi } from "../../../../services/doctorService";
import {handleAuth} from '../../../../Auth/index'
import { toast } from "react-toastify";
import BookingModel from "./BookingModel";
import { handleBookingApi, handleGetBookingForPatientApi } from "../../../../services/bookingService";
import { getPatientIdByUserIdApi } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../../../../components/ModalLoading";


function DoctorSchedule(props) {
    const navigate = useNavigate();
    const [arrDate, setArrDate] = useState([]);
    const [arrSchedule, setArrSchedule] = useState([]);
    const [date, setDate] = useState(moment((new Date()).setDate((new Date()).getDate() + 1)).format("YYYY-MM-DD")); 
    const [doctorId, setDoctorId] = useState("");
    const [toggleDetailPrice, setToggleDetailPrice] = useState(false);
    const [nameClinic, setNameClinic] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [payment, setPayment] = useState("");
    const [price, setPrice] = useState("");
    const [province, setProvince] = useState("");
    const [toggleBooking, setToggleBooking] = useState(false);
    const [itemBooking, setItemBooking] = useState({});
    const [loading, setLoading] = useState(false);


    let getData = async () => {

       (async () => {
        setLoading(true);
        let doctorID = window.location.pathname.split("/")[2];
        setDoctorId(doctorID);      
        let data2 = await handleGetDoctorByIdDoctorApi(doctorID)
        setAddressClinic(data2.data.addressClinic);
        setNameClinic(data2.data.nameClinic);
        setPayment(data2.data.paymentData.valueVi);
        setPrice(data2.data.priceId);
       })().then(() => {
        setLoading(false);
       })

    }
    useEffect(() => {
        getData();
    }, [])

    let updateSchedule = async () => {
    //    (
    //           async () => {
                setLoading(true);
                let data = await handleGetScheduleByDateApi( window.location.pathname.split("/")[2], date);
                setArrSchedule(data.data)
                setLoading(false);
                // }
        // ).then(() => {
        //     setLoading(false);
        // })
    }

    useEffect(() => {
        updateSchedule();
    }, [date])
    
    
    let parsePhoto = (avatar) => {
        if (avatar) {

            return new Buffer(avatar, 'base64').toString('binary');

        } else {
            return "";
        }
    }
    useEffect(() => {
        getSelectDate();
    },[] );
    let getSelectDate = () => {
        let arrDate = [];
        let date = new Date();
        let newDate = new Date(date.setDate(date.getDate() + 1));
        for (let i = 0; i < 7; i++) {
            let object = {};
           
                object.label = capitalizeFirstLetter(moment(newDate).add(i, 'days').locale('vi').format('dddd - DD/MM'))
                object.value = moment(newDate).add(i, 'days').format("YYYY-MM-DD")
               
                arrDate.push(object)
            

            setArrDate(arrDate)
        }
    }
    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
   
    let handleToogleDetailPrice = () => {
        
        setToggleDetailPrice(!toggleDetailPrice);
    }
    let handleBooking = (item) => {
        if(!handleAuth().id) {
            console.log(handleAuth().id)
            toast.error("Bạn cần đăng nhập để đặt lịch khám")
        } else {
            (async () => {
                let data = await handleGetBookingForPatientApi(handleAuth().id);
        let data2 = data.filter((item) => {
            return item.statusID !== "S3";
        })
        let data3 = data.filter((item) => {
            return item.statusID !== "S4";
        })
        if(data3.length > 0) {
            toast.error("Bạn đã có lịch khám chưa hoàn thành")
        } else {
            setItemBooking(item);
            setToggleBooking(true);
        }
                
                
            })()

        }

    }
    let handleToogleBooking = () => {
       setToggleBooking(!toggleBooking);
    }  
    let handleBookingSuccess = async (date,timeType,reason) => {
        // setToggleBooking(false);
        toast.success("Đặt lịch thành công");
        let patientIdData = await getPatientIdByUserIdApi(handleAuth().id);
        
        let data = {
            doctorId: doctorId,
            patientId: patientIdData.data,
            date: moment(date).format("YYYY-MM-DD"),
            timeType: timeType,
            reason: reason

        };
        console.log("Success: ", data);
        let res = await handleBookingApi(data);
        console.log("res: ", res);
        navigate("/main-booking");
    }

    useEffect(() => {
        console.log("itemBooking: ", itemBooking)
        console.log("toggleBooking: ", toggleBooking)
    })
    let formatCurrency = (number) => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }



    return (
        <>
            <div className="doctor-schedule">
                <div className="content-1">
                    <select className="select-date"
                        onChange={(e) => {
                            setDate(moment(e.target.value).format("YYYY-MM-DD"))
                            
                        }
                        }
                    >
                        {arrDate && arrDate.length > 0 &&

                            arrDate.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div>
                    <i className="fa-duotone fa-calendar-days"></i> LỊCH KHÁM
                </div>
                <div className="doctor-schedule-t"
                style={{ display: "flex", flexDirection: props.layout }}
                >
                    <div className="doctor-schedule-button">
                        {(arrSchedule && arrSchedule.length > 0) ?
                            arrSchedule.map((item, index) => {
                                return (
                                    <button
                                        className="button-select-time"
                                        onClick={() => {
                                            handleBooking(item)
                                        }}
                                        key={index}
                                    >{item.timeTypeData.valueVi}</button>
                                )
                            }
                            ) : <div className="no-schedule">Không có lịch đặt khám vào ngày này!!!
                                <br></br> Vui lòng chọn ngày khác!!!
                            </div>}
                        <div>
                            Chọn <i className="fa-regular fa-hand-back-point-up"></i> và đặt (Phí đặt lịch 0đ)
                        </div>
                    </div>
                    <div className="doctor-schedule-info">
                        <div className="title-schedule">ĐỊA CHỈ KHÁM</div>
                        <div className="name-clinic">{nameClinic}</div>
                        <div>{addressClinic}</div>

                        <span className="title-schedule" > Giá Khám: </span>{
                            !toggleDetailPrice &&
                            <b>{formatCurrency(price)} đ</b>
                        }
                        {
                            !toggleDetailPrice && <span className="show-detail" 
                            onClick={handleToogleDetailPrice }
                            >Xem chi tiết</span>
                        }


                        {
                            (toggleDetailPrice) &&

                            <div>
                                <div className="show-detail-div">
                                    <div style={{ background: "#eee",padding: "10px" }}>
                                        <div class="price">
                                            <div>Giá khám </div><b>{formatCurrency(price)} đ</b>
                                        </div>
                                        <div className="tuvan-font">Giá tư vấn 15 phút</div>
                                        <div class="tuvan-font">Giá tư vấn 30 phút</div>
                                    </div>
                                    <div className="payment">Phòng khám có hình thức thanh toán bằng tiền mặt và quẹt thẻ</div>
                                </div>
                                <div className="show-detail" 
                                onClick={ handleToogleDetailPrice }
                                >Ẩn bảng giá</div>

                            </div>

                        }


                    </div>
                </div>
            </div >
             {toggleBooking && <BookingModel toggleBooking={toggleBooking} handleToogleBookingFarent={handleToogleBooking} info={itemBooking} price={price} doctorName={props.doctorName} doctorPosition={props.doctorPosition} handleBookingSuccess={handleBookingSuccess} 
             doctorAvatar={props.doctorAvatar} 
             
             />}
             {
                loading && <ModalLoading/>
             }
        </>
    );

}
export default DoctorSchedule;