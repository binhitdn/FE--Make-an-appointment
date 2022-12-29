import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleAuth } from "../../../Auth";
import { handleChangeStatusBookingApi, handleCreateBookingFinishedApi, handleGetBookingApi } from "../../../services/bookingService";
import { handleGetDoctorByIdApi } from "../../../services/doctorService";
import ModelBookingConfirm from "./ModelBookingComfirm";
import "./scss/ManageBooking.scss"
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import NotData from "../../../components/NotData";
import ModalLoading from "../../../components/ModalLoading";

function ManageBookingComfirm() {
    const [dataPatient, setDataPatient] = useState([]);
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [idPatient, setIdPatient] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [toggleModal, setToggleModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [clickPatient, setClickPatient] = useState();
    
    let getData = async() => {
       (async () => {
        setLoading(true);
        let idd = await handleGetDoctorByIdApi(handleAuth().id);
        setIdDoctor(idd.data.id);
        
        let data = await handleGetBookingApi("S2",idd.data.id);
    
        
        setDataPatient(data);
        console.log(data);
       
        })().then(() => setLoading(false));

        
   
        
    }
   useEffect(() => {

        getData();
    },[])
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    
   
    let handleToggleModal = (item) => {
        setToggleModal(!toggleModal);
        setClickPatient(item);
    }
    let handleConfirmBooking = async(id,data) => {
        let res = await handleChangeStatusBookingApi(id,"S3");
        let res2 = await handleCreateBookingFinishedApi({
            bookingId: id,
            diagnose: data.diagnose,
            medicine: data.medicine,
            note: data.note,

        });

        handleToggleModal();
        toast.success("Xác nhận thành công");
        getData();
    }
    return (
        <>
              
                {
                    dataPatient.filter((item) => {
                        return item.statusID == "S2" && moment( moment(item.date).format("YYYY-MM-DD")+" " +item.timeTypeData2.valueVi.slice(0,5)).format() > moment().format()
                    }).length > 0 ? <MDBTable align='middle'

                    >
                          <MDBTableHead>
                            <tr>
                              <th scope='col'>Id</th>
                              <th scope='col'>Bệnh Nhân</th>
                              <th scope='col'>Thời gian</th>
                              <th scope='col'>Thời hạn</th>
                              <th scope='col'>Thao tác </th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            
                            
                            {
                                     dataPatient.filter((item) => {
                                        return item.statusID == "S2" && moment( moment(item.date).format("YYYY-MM-DD")+" " +item.timeTypeData2.valueVi.slice(0,5)).format() > moment().format()
                                    }) && dataPatient.filter((item) => {
                                        return item.statusID == "S2" && moment( moment(item.date).format("YYYY-MM-DD")+" " +item.timeTypeData2.valueVi.slice(0,5)).format() > moment().format()
                                    }).map((item, index) => {
                                      let status = "";
                                      let statusColor = "green"
                                     
                                      let fromNowBooking = item.timeTypeData2.valueVi.slice(0,5);
                                    //   let timeResult = moment( moment(item.date).format("YYYY-MM-DD")+" " +item.timeTypeData2.valueVi.slice(0,5)).format() - moment().format() - moment().format();
                                    //   console.log("timeResult",timeResult);
                                      let fromNowBookings = fromNowBooking.slice(0,2);
                                     
                                      let hoursNow = new Date().getHours();
                                      let minutesNow = new Date().getMinutes();
                                      let secondsNow = new Date().getSeconds();
                                      let time = hoursNow*60*60 + minutesNow*60 + secondsNow;
                    
                                      
                                      
                                      
                                      let timeBooking = fromNowBookings*60*60;
                                      let timeResult = timeBooking - time;
                                      let days = -Math.floor(timeResult / 86400);
                                     let hours = Math.floor(timeResult / 3600);
                                      let minutes = Math.floor((timeResult - (hours * 3600)) / 60);
                                      let seconds = timeResult - (hours * 3600) - (minutes * 60);
                                      let hoursResult = Math.floor(timeResult / 3600)>=0 ? Math.floor(timeResult / 3600) : 24 + Math.floor(timeResult / 3600);
                                   
                                     if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0){
                                        status = "Hết hạn";
                                        statusColor = "red";
                                        }else if(days > 0){
                                            status = "Còn " + days + " ngày" + hoursResult + " giờ " + minutes + " phút " + seconds + " giây";
                                            statusColor = "green";
                                        }else if(days <= 0 && timeResult > 0){
                                            status = "Còn " + hoursResult + " giờ " + minutes + " phút " + seconds + " giây";
                                            statusColor = "green";
                                        } else {
                                            status = "Hết hạn";
                                            statusColor = "red";
                                        }
                                       
                    
                    
                    
                    
                                      
                                      
                                   
                    
                    
                    
                    
                                     
                                      
                                  
                                            return (
                                                <tr key={index}>
                                <td>{index + 1}</td>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <img
                                    src={ item.patientData.userData.image ? item.patientData.userData.image : 'https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png'}
                                    alt=''
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                  />
                                  <div className='ms-3'>
                                    <p className='fw-bold mb-1'>
                                    {item.patientData.userData.lastName} {item.patientData.userData.firstName}
                                    </p>
                                    <p className='text-muted mb-0'>
                                    {item.patientData.userData.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className='fw-normal mb-1'>
                                    {moment(item.date).format("DD-MM-YYYY")} 
                                </p>
                                <p className='text-muted mb-0'>
                                    {item.timeTypeData2.valueVi}
                                </p>
                              </td>
                              <td>
                              <MDBBadge color={
                                    "red"
                                } 
                                style={{
                                    background: statusColor, color: "white", borderRadius: "5px", padding: "5px",height: "20px", fontSize: "13px"
                                }}
                                 pill>
                                    {status}
                                  
                                </MDBBadge>
                               
                              </td>
                              
                              <td>
                              
                                                    <button className="btn btn-primary"
                                                        
                                                        onClick={
                                                        () => { 
                                                            
                                                            handleToggleModal(item);
                    
                                                        }
                                                        }
                                                          
                                                    >
                                                        Xem chi tiết
                                                        <i className='fas fa-edit' />
                                                    </button>
                    
                              </td>
                            </tr>
                                            )
                                        })
                                    }
                    
                            
                          </MDBTableBody>
                        </MDBTable>
                        : <NotData data="Hiện không có lịch hẹn nào đã xác nhận cả"/>
                }




{toggleModal && <ModelBookingConfirm toggleModal={toggleModal}  info={clickPatient} price={3000} handleToggleModal={handleToggleModal} 
handleConfirmBooking = {handleConfirmBooking}
/>}
{
                loading && <ModalLoading/>
            }
        </>
    )

}
export default ManageBookingComfirm