import "./scss/DetailSpecialty.scss";
import { useState } from "react";
import { useEffect } from "react";
import { handleGetSpecialityByIdApi } from "../../../../services/specialtyService";
import { handleGetDoctorBySpecialtyApi } from "../../../../services/doctorService";
import { handleGetAllCode } from "../../../../services/systemService";
import moment from "moment";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import { Link } from "react-router-dom";

function DetailSpecialty() {
    const [specialty, setSpecialty] = useState([]);
    const [specialtyId, setSpecialtyId] = useState([]);
    const [name, setName] = useState([]);
    const [contentHTML, setContentHTML] = useState([]);
    const [image, setImage] = useState([]);
    const [isHiddenDescription, setIsHiddenDescription] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [province, setProvince] = useState([]);
    const [arrDate, setArrDate] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState("PRO0");


    let getData = async () => {
        setSpecialtyId(window.location.pathname.split("/")[2]);
        let data = await handleGetSpecialityByIdApi(window.location.pathname.split("/")[2]);
        setContentHTML(data.message.contentHTML);
        setName(data.message.name);
        setImage(data.message.image);
        setSpecialty(data.message);
        let doctors = await handleGetDoctorBySpecialtyApi(window.location.pathname.split("/")[2]);
        setDoctors(doctors.data);
        console.log("Doctor",doctors.data);
        let getAllProvince = await handleGetAllCode("PROVINCE");
        console.log("getAllProvince", getAllProvince.data.data);
        setProvince(getAllProvince.data.data);
        
    }


    useEffect(() => {
        getData();
    }, [])

    
    let styleDescription = () => {
        if(isHiddenDescription) {
            return {
                height: "180px",
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
        getSelectDate();
    }, []);

    let getSelectDate = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
           
                object.label = capitalizeFirstLetter(moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM'))
                object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
               
                arrDate.push(object)
            
            // else if (language === languages.EN) {
            //     object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
            //     object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
            //     arrDate.push(object)
            // } else if (language === languages.JP) {
            //     object.label = moment(new Date()).add(i, 'days').locale('ja').format('M月D日 (ddd)')
            //     object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
            //     arrDate.push(object)
            // }
            setArrDate(arrDate)
        }
    }
    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let handleFilterDoctor = (doctors) => {

        if (provinceSelected == "PRO0") {
            return doctors;
        } else {
            let arr = doctors.filter((doctor) => {
                return doctor.provinceId == provinceSelected;
            })
            return arr;
        }

    }
        

    return (
        <>
                
            <div className="detail-speciality-container">
                
                <div className="detail-speciality-content">
                <div className="speciality-background" style={{backgroundImage:`url(${image})`}}>
                   <div className="speciality-background-opacity">
                        <div className="speciality-background-content">
                        <div className="speciality-name">
                        {name}
                    </div>
                    <div className="speciality-description"
                    style={styleDescription()}
                    >
                        
                        <div dangerouslySetInnerHTML={{ __html: contentHTML }} className="speciality-description-child"
                        // style={
                        //     styleDescription
                        // }
                        ></div>
                        
                    </div>
                    <div>
                    {
                        isHiddenDescription ?
                        <div className="speciality-description-button" onClick={() => setIsHiddenDescription(false)}
                       
                        >Xem thêm</div>
                        :
                        <div className="speciality-description-button" onClick={() => setIsHiddenDescription(true)}>Thu gọn</div>
                    }
                </div>
                        </div>
                   </div>
                    
                </div>
                <div className="list-doctor-by-speciality">
                    <div className="list-doctor-by-speciality-child">
                        <select className="filter-doctor-location"
                        onChange={(e) => {
                            setProvinceSelected(e.target.value);
                        }}
                        value={provinceSelected}
                        >
                            
                            {
                                province.map((item, index) => {
                                    return (
                                        <option value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="doctors-by-speciality">
                            {
                                handleFilterDoctor(doctors).length > 0 ? handleFilterDoctor(doctors).map((doctor, index) => {
                                    return (
                                        <Link className="doctor-by-speciality" key={index} to={"/doctor/"+doctor.id}>
                                <div className="doctor-by-speciality-left">
                                    <div className="doctor-by-speciality-avatar"
                                    
                                    >
                                        <div className="avatar" style={{backgroundImage:`url(${doctor.userData.image})`}}></div>

                                    </div>
                                    <div className="doctor-by-speciality-content">
                                        <div className="doctor-by-speciality-name">
                                            
                                                 {doctor.positionData.valueVi} {doctor.userData.lastName} {doctor.userData.firstName}
                                            
                                        </div>
                                        <div className="doctor-by-speciality-specialty">
                                            <i className="fas fa-user-md"></i> {doctor.specialtyData.name}
                                        </div>
                                        <div className="doctor-by-speciality-description">
                                            {doctor.description}
                                        </div>
                                        <div className="doctor-by-speciality-province">
                                           <i className="fas fa-map-marker-alt"></i> {doctor.provinceData.valueVi}
                                        </div>
                                    </div>
                                </div>
                                <div className="doctor-by-speciality-right">
                                {/* <div className="content-1">
                                    <select className="select-date"
                                        // onChange={(e) => {
                                        // setDate(e.target.value)
                                        //                 }
                                        //     }>
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
                </div> */}

                <DoctorSchedule 
                    layout="column"
                />


                            





                                </div>


                            </Link>
                                    )
                                }) : <div className="no-doctor">
                                    <div className="no-doctor-image"
                                    style={{backgroundImage:`url("https://wallpaperaccess.com/full/4620961.png")`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",width:"120px",height:"200px",textAlign:"center",margin:"auto"}}

                                    >

                                    </div>
                                    <div className="no-doctor-text"
                                    style={{textAlign:"center",fontSize:"20px",fontWeight:"bold",marginTop:"20px"}}
                                    >
                                        Không có bác sĩ nào
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
                </div>
                
                
            </div>
           </>
        
    )

}
export default DetailSpecialty;