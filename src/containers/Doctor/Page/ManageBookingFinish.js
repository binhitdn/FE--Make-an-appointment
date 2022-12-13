import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleAuth } from "../../../Auth";
import { handleChangeStatusBookingApi, handleGetBookingApi } from "../../../services/bookingService";
import { handleGetDoctorByIdApi } from "../../../services/doctorService";
import ModalBookingFinish from "./ModalBookingFinish";
import "./scss/ManageBooking.scss"
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


function ManageBookingFinish() {
    const [dataPatient, setDataPatient] = useState([]);
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [idPatient, setIdPatient] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [toggleModal, setToggleModal] = useState(false);
    const [income, setIncome] = useState(0);
    const [countSchedule, setCountSchedule] = useState(0);
    const [cost, setCost] = useState(0);

    const [clickPatient, setClickPatient] = useState();
    
    let getData = async() => {
        let idd = await handleGetDoctorByIdApi(handleAuth().id);
        setIdDoctor(idd.data.id);
        
        let data = await handleGetBookingApi("S3",idd.data.id);
        
        setDataPatient(data);
        setCountSchedule(data.length);

        let doctorData = await handleGetDoctorByIdApi(handleAuth().id);
        setCost(doctorData.data.priceId);
       

        console.log("data",data);
   
        
    }
   useEffect(() => {

        getData();
    },[])
    
   
    let handleToggleModal = (item) => {
        setToggleModal(!toggleModal);
        setClickPatient(item);
    }
    let handleConfirmBooking = async(id) => {
        let res = await handleChangeStatusBookingApi(id,"S3");
        handleToggleModal();
        toast.success("Xác nhận thành công");
        getData();
    }
    let convertCurrency = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <>
               
                <MDBTable align='middle'

>
      <MDBTableHead>
        <tr>
            <th>Id</th>
            <th>Email Bệnh Nhân</th>
            <th>Thời gian</th>
            <th>Ngay kham xong</th>
            <th>Thao tac</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        
        
        {
                 dataPatient && dataPatient.map((item, index) => {
                  
                  
                  
               




                 
                  
              
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
            <p className='fw-normal mb-1'>
                {moment(item.updatedAt).format("hh:mm:ss")}
            </p>
            <p className='text-muted mb-0'>
                {moment(item.updatedAt).format("DD-MM-YYYY")}
            </p>
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
                <div className="manage-income">
                    <div>
                        Tổng cộng: <b>{countSchedule} lịch hẹn</b>
                    </div>
                    <div>
                        Tổng thu: <b>{convertCurrency(countSchedule * cost)} VNĐ</b>
                    </div>

                </div>




{toggleModal && <ModalBookingFinish toggleModal={toggleModal}  info={clickPatient} price={3000} handleToggleModal={handleToggleModal} 
handleConfirmBooking = {handleConfirmBooking}
/>}
        </>
    )

}
export default ManageBookingFinish