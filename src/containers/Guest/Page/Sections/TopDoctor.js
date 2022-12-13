
import './scss/TopDoctor.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctordata from "../../../../data/doctordata";
import { useState } from 'react';
import { useEffect } from 'react';
import { handleGetTopDoctorApi } from '../../../../services/doctorService';
import { Link } from 'react-router-dom';
function TopDoctor() {
  
  const [doctors, setDoctors] = useState([]);

  let getData = async () => {
    let data = await handleGetTopDoctorApi();
        setDoctors(data.data);
        console.log(data.data);
  }
  useEffect(() => {
    getData();
  }, []);
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 778,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    
    return (

        <div className="section-doctor-trend">
            <div class="section-specialties-title">
                <h4>Bác Sĩ Nổi Bật</h4>
                <a href="#">XEM THÊM</a>
            </div>
            <div className="specialty-content">
                <Slider {...settings}>
                        
                    {
                        doctors && doctors.map((doctor, index) => {
                            return (
                                <Link className="img-customize"  to={`/doctor/${doctor.id}`} key={index}>
                               
                              
                                    <div className="section-doctor-trend-item">
                                        <div className="anh-bac-si" style={{
                                            background: `url(${doctor.userData.image})`,
                                        }}>
    
                                        </div>
                                    </div>
    
                                    <div className="name">
                                        <h6>{ doctor.positionData.valueVi} {doctor.userData.lastName} {doctor.userData.firstName}</h6>
                                        <p>Chuyên Khoa { doctor.specialtyData.name}</p>
                                    </div>
                        </Link>
                            )
                        }
                        )
                           }
                    
                        
                </Slider>
            </div>
        </div>

    );
}
export default TopDoctor;