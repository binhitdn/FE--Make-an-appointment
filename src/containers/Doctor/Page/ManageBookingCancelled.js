import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleAuth } from "../../../Auth";
import { handleChangeStatusBookingApi, handleGetBookingApi } from "../../../services/bookingService";
import { handleGetDoctorByIdApi } from "../../../services/doctorService";
// import ModalBookingFinish from "./ModalBookingFinish";
import ModelBookingCancelled from "./ModalBookingCancelled";
import "./scss/ManageBooking.scss"

function ManageBookingCancelled　() {
    const [dataPatient, setDataPatient] = useState([]);
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [idPatient, setIdPatient] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [toggleModal, setToggleModal] = useState(false);

    const [clickPatient, setClickPatient] = useState();
    
    let getData = async() => {
        let idd = await handleGetDoctorByIdApi(handleAuth().id);
        setIdDoctor(idd.data.id);
        
        let data = await handleGetBookingApi("S4",idd.data.id);
        
        setDataPatient(data);

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
        let res = await handleChangeStatusBookingApi(id,"S4");
        handleToggleModal();
        toast.success("Xác nhận thành công");
        getData();
    }
    return (
        <>
                <table id="customers">
  <tr>
    <th>Id</th>
    <th>Email Bệnh Nhân</th>
    <th>Thời gian</th>
    <th>Trang thai</th>
    <th>Thao tac</th>
  </tr>
 
    {dataPatient &&
        dataPatient.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                        {item.patientData.userData.email}
                    </td>
    <td>
        {item.timeTypeData2.valueEn} {moment(item.date).format("DD/MM/YYYY")}
    </td>
    <td><i class="fas fa-check-circle"></i>Pending</td>
    <td>
        <button className="btn btn-primary"
        onClick={
            () => {
                handleToggleModal(item);
            }
        }
        
        >Xem chi Tiết</button>
        <button className="btn btn-danger">Hủy</button>
    </td>
                </tr>
            )
        })

        


    }
    {
        (dataPatient.length == 0) && <tr>
            <td colSpan="5">Không có dữ liệu</td>
        </tr> 
    }

                </table>




{toggleModal && <ModelBookingCancelled toggleModal={toggleModal}  info={clickPatient} price={3000} handleToggleModal={handleToggleModal} 
handleConfirmBooking = {handleConfirmBooking}
/>}
        </>
    )

}
export default ManageBookingCancelled;