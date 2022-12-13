import { useEffect } from "react";
import { handleAuth } from "../../../../Auth";
import "./Booking.scss"
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { handleGetBookingForPatientApi } from "../../../../services/bookingService";
import { useState } from "react";
import moment from "moment";
import ModalBooking from "./ModalBooking";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Booking() {
    let idUser = handleAuth().id;
    let navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [bookingSelected, setBookingSelected] = useState();


    let getBooking = async () => {
        let data = await handleGetBookingForPatientApi(handleAuth().id);
        let data2 = data.filter((item) => {
            return item.statusID !== "S3";
        })
                
        setBooking(data2);
    }
    let handleToggleModal = (item) => {
        setBookingSelected(item);
        setToggleModal(!toggleModal);
        
    }

    useEffect(() => {
        if(idUser){
            console.log("OK");
            getBooking();
        } else {
            navigate("/login");
            toast.error("Bạn cần đăng nhập để xem thông tin đặt lịch");
        }
    },[])

    return (
      // https://www.sussexdoctors.com.au/wp-content/uploads/2020/11/banner_center_img_mobile.png

        <div className="my-booking">
                <div className="my-booking-header">
                    <b><h3>Lịch hẹn của tôi</h3></b>
                </div>
                <div className="my-booking-body">
              {
                booking.length > 0 ?  <MDBTable align='middle'

                >
                      <MDBTableHead>
                        <tr>
                          <th scope='col'>Id</th>
                          <th scope='col'>Bác Sĩ</th>
                          <th scope='col'>Thời gian</th>
                          <th scope='col'>Trạng Thái</th>
                          <th scope='col'>Thao tác </th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        
                        {
                                 booking && booking.map((item, index) => {
                                        return (
                                            <tr key={index}>
                            <td>{index + 1}</td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <img
                                src={item.doctorData.userData.image? item.doctorData.userData.image : 'https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png'}
                                alt=''
                                style={{ width: '45px', height: '45px' }}
                                className='rounded-circle'
                              />
                              <div className='ms-3'>
                                <p className='fw-bold mb-1'>
                                {item.doctorData.userData.lastName} {item.doctorData.userData.firstName}
                                </p>
                                <p className='text-muted mb-0'>
                                {item.doctorData.specialtyData.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='fw-normal mb-1'>
                                {item.timeTypeData2.valueEn}
                            </p>
                            <p className='text-muted mb-0'>
                                {moment(item.date).format("DD-MM-YYYY")}
                            </p>
                          </td>
                          <td>
                            <MDBBadge color={
                                item.statusData.valueVi === "Đã hủy" ? "danger" : "success"
                            } 
                             pill>
                               {item.statusData.valueVi}
                            </MDBBadge>
                          </td>
                          
                          <td>
                            {/* <MDBBtn color='warning' rounded size='sm'
                            onClick={
                                handleEditUser(user)
                            }
                            >
                                <i className='fas fa-pencil-alt' />
                            </MDBBtn>
                            <MDBBtn color='danger' rounded size='sm'
                            onClick={
                                handleDeleteUser(user.id)
                            }
                            >
                                <i className='fas fa-trash' />
                            </MDBBtn> */}
                                                <button className="btn btn-primary"
                                                    
                                                    onClick={
                                                    () => { 
                                                        handleToggleModal(item)
                                                        
                
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
                    : <div className="my-booking-body-empty">
                        <img src="https://www.sussexdoctors.com.au/wp-content/uploads/2020/11/banner_center_img_mobile.png" alt="" />
                        <p>Bạn không có lịch sử lịch hẹn nào!!</p>
                        <span>Gặp vấn đề! Hãy đặt khám ngay</span>
                      </div>
              }
                </div>
                {toggleModal && <ModalBooking toggleModal={toggleModal}  info={bookingSelected} price={3000} handleToggleModal={handleToggleModal} 
// handleConfirmBooking = {handleConfirmBooking}
/>}
        </div>
                
    );
}
export default Booking;