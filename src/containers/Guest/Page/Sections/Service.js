import Slider from "react-slick";
import "./scss/Service.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import servicedata from "../../../../data/servicedata";
import { Link } from "react-router-dom";
function Service() {
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
        <div className="section-specialty">
                <div className="specialty-content">
                <Slider {...settings}>
                       {
                           servicedata && servicedata.map((item, index) => {
                                 return (
                                    <div className="img-customize" key={index}>
                                    <div className="section-specialty-item">
                                        <div style={{
                                            background: `url(${item.image})`,
                                        }}>               </div>
                                             <h4 className="section-specialty-item-name">{ item.name}</h4>
                                        <ul>
                                            {/* <li>Tầm soát và xác định COVID-19</li>
                                            <li>Phương pháp Test nhanh </li>
                                            <li>Theo quy chuẩn Bộ Y tế</li> */}
                                                 {
                                                     item.description && item.description.map((item, index) => {
                                                            return (
                                                                <li key={index}>{item}</li>
                                                            )
                                                        })
                                                 }
                                        </ul>
                                        <Link to="/" className="xemthem">XEM THÊM <i className="fa-solid fa-share-from-square"></i></Link>
                                    </div>
                              </div> 
                                 )
                           }
                           )
      }
      
      
      
    </Slider>
                </div>
            </div>
    )
}
export default Service;