import Slider from "react-slick";
import "./scss/Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleGetAllSpecialityApi } from "../../../../services/specialtyService";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";





function Specialty() {
    const[specialties, setSpecialties] = useState([]);


  let getData = async () => {
    let res = await handleGetAllSpecialityApi();
    console.log("res", res);
    setSpecialties(res.specialities);
    
  };
  useEffect(() => {
    getData();
  }, []);
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
        <div className="section-specialties">
                <div class="section-specialties-title">
                <h4>Chuyên khoa phổ biến</h4>
                <a href="#">XEM THÊM</a>
                </div>
                <div className="specialty-content">
                <Slider {...settings}>
            
                    
                    {specialties &&
                        specialties.map((item, index) => {
                            return (
                                <Link className="img-customize" to={`/specialty/${item.id}`} key={index}>
                    <div className="section-specialty-item">
                        <div style={{
                            background: `url(${item.image})`,
                        }}>           
                            </div>
                                        <p>{item.name}</p>
                    </div>
                    </Link>
                            )
                        }
                        )
                   }
                    
              
                

            
            

     
      
      
    </Slider>
                </div>
            </div>
    )
}
export default Specialty;