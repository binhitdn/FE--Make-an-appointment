import { Link } from "react-router-dom";
import "./scss/Doctor.scss"
import doctordata from "../../../data/doctordata";
import { handleGetTopDoctorApi } from "../../../services/doctorService";
import { useState } from "react";
import { useEffect } from "react";
import ModalLoading from "../../../components/ModalLoading";
import { AuthToken } from "../../../utils/AuthToken";
import { useContext } from "react";


function Doctor() {
    // const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { doctor} = useContext(AuthToken);


    
    // let getData = async () => {
    //     let data;
    //     (async () => {
    //         setLoading(true);
    //         data = await handleGetTopDoctorApi();
    //     }
    //     )().then(() => {
    //         setLoading(false);
    //         setDoctors(data.data);
    //     })


        
        
    // }
    // useEffect(() => {
    //     getData();
    // }, [])
    

   

    return (
        <div class="doctor-page">
            <div class="doctor-page__header">
                <h4>Bác Sĩ</h4>
                <p>
                    CareHappy hỗ trợ bạn tìm kiếm những bác sĩ uy tín, chuyên nghiệp và nhiệt tình nhất.
                </p>
            </div>
            {/* <div class="doctor-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm bác sĩ" value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        />
                </div>
            </div> */}
            <div class="doctor-page__content">
            <h4 class="doctor-title-outstanding">Bác sĩ nổi bật</h4>
                <div class="doctor-page__content__doctors">
                    
                    
                                
                    
                    
                    
                    
                {
                        doctor && doctor.map((item, index) => {
                            return (
                                <Link className="img-customize" 
                                        to={"/doctor/" + item.id}
                                   
                                >
                                    <div className="section-doctor-trend-item">
                                       
                                        <div className="anh-bac-si" style={{
                                            background: `url(${
                                                item.userData.image
                                            })`
                                        }}>

                                        </div>
                                    </div>

                                    <div className="name">
                                        <h6 class="name-doctor">{
                                            item.positionData.valueVi + " " + item.userData.lastName + " " + item.userData.firstName
                                        }</h6>
                                        <p class="name-special">{item.specialty}</p>
                                        <span>Lượt xem: 
                                            <b>{item.count}</b>
                                        </span>
                                        <div>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </div>

                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                                
                           
                </div>
            </div>
            {
            loading && <ModalLoading />
         }

        </div>
    );
}
export default Doctor;