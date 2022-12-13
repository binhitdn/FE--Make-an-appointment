import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scss/HandBookss.scss";
import { useState } from "react";
import { useEffect } from "react";
import { handGetAllHandbook } from "../../../../services/handbookService";
import { Link } from "react-router-dom";

function HandBookss() {

  const [handbook, setHandbook] = useState([]);
    


    useEffect(() => {
        let getHandbook = async () => {
            let result = await handGetAllHandbook();
            setHandbook(result.data);
        }
        getHandbook();
    }, [])
    
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
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
        <div className="container">
            <div className="handbook-section-title">
                  <h3>Cẩm nang</h3>
            </div>
            <div className="handbook-section-content">
                <div className="handbook-section-items">
                    <Slider {...settings}>
                        {

                            handbook && handbook.map((item, index) => {

                                return (
                                  <Link className="handbook-section-item" key={index} to={`/handbook/${item.id}`}>
                                  <div className="handbook-section-item-img"
                                  style={{backgroundImage: `url(${item.image})`}}>
                                  
                                  
                                  </div>
                                  <div className="handbook-section-item-content">
                                      <div className="title-handbook" style={
                                          {fontSize: "14px",}
                                      }>{item.title}</div>
                                  </div>
                              </Link>
                                ) 
                            })
                        }
                        
                        
                    </Slider>
                  </div>
            </div>
        </div>
    )
}
export default HandBookss;