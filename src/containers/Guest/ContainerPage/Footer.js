import { useContext } from "react";
import { Link } from "react-router-dom";
import "./css/Footer.scss";
import { AuthToken } from "../../../utils/AuthToken";
function Footer() {
  const {lang} = useContext(AuthToken);
  const embed = ' <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7132.066786934034!2d108.252355!3d15.975292999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology.!5e1!3m2!1sen!2sus!4v1670668267472!5m2!1sen!2sus" width="500" height="300" style="border:0;border-radius: 20px; width: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  let dataLanguage = {
    title: {
      name: "HappyCare",
      address: {
        vi: "Địa chỉ",
        en: "Address",
        ja: "住所",
      },
      hotline: {
        vi: "Hotline",
        en: "Hotline",
        ja: "ホットライン",
      },
      email: {
        vi: "Email",
        en: "Email",
        ja: "メール",
        }
    },
    
    description: {
      vi: "NỀN TẢNG CHĂM SÓC SỨC KHỎE TOÀN DIỆN",
      en: "HEALTHCARE PLATFORM",
      ja: "健康ケアプラットフォーム",
    
    },
    address: {
      vi: "Địa chỉ: Hòa Khương,Hòa Vang, TP.Đà Nẵng",
      en: "Address: Hoa Khuong, Hoa Vang, Da Nang City",
      ja: "住所：ホアクワン、ホアヴァン、ダナン市",
    },
    hotline: {
      vi: "Hotline: 0356719030",
      en: "Hotline: 0356719030",
      ja: "ホットライン：0356719030",
    },
    email: {
      vi: "Email: happycare2k3@gmail.com",
      en: "Email:  happycare2k3@gmail.com",
      ja: "メール：  happycare2k3@gmail.com",
    },
    input: {
      vi: "Email của bạn",
      en: "Your email",
      ja: "あなたのメール",
    },
    button: {
      vi: "Đăng ký nhận thông báo",
      en: "Sign up for notifications",
      ja: "通知を登録する",
    },
    coppyright: {
      vi: "Bản quyền thuộc về HappyCare",
      en: "All rights reserved",
      ja: "著作権はHappyCareに帰属します",
    }
     

  }
    
    return (
        <footer class="footer">
     <div class="container">
      <div class="row-flex">

        <div className="info">
          <h4>
          <div className="background-doctor-map"
        style={
          {
            backgroundImage: `url("https://www.clipartmax.com/png/full/136-1362963_cartoon-physician-icon-doctor-cartoons.png")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "50px",
            width: "40px",
            
          }
        }
        >

        </div>{dataLanguage.title.name}</h4>
          <h5>{dataLanguage.description[lang]}</h5>
          <h6><b>{dataLanguage.title.address[lang]}</b> {dataLanguage.address[lang]}</h6>
          <h6><b>{dataLanguage.title.hotline[lang]}</b> {dataLanguage.hotline[lang]}</h6>
          <h6><b>{dataLanguage.title.email[lang]} </b>{dataLanguage.email[lang]}</h6>   
          <div className="social"
          style={{
            display: "flex",
            alignItems: "center",
           gap: "10px",
          }}
          >
            <a href="https://www.facebook.com/" className="mxh"><i class="fab fa-facebook-f" ></i></a>
            <a href="https://www.instagram.com/" className="mxh"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/" className="mxh"><i class="fab fa-youtube"></i></a>
            <a href="https://twitter.com/" className="mxh"><i class="fab fa-twitter"></i></a>
            <a href="https://www.github.com/" className="mxh"><i class="fab fa-github"></i></a>
            <a href="https://www.tiktok.com/" className="mxh"><i class="fab fa-tiktok"></i></a>
          </div>
          <div className="contact-email"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "30px",
          }}
          >
            <input type="text" placeholder={dataLanguage.input[lang]} 
            style={{
              width: "400px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "0",
              height: "40px",
              
            }}
            
            />
            <button type="submit" class="btn btn-warning"
            style={{
              fontSize: "12px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              padding: "10px 10px",
              margin: "0",
            }}
            >
              {dataLanguage.button[lang]}
            </button>
          </div> 
              
        </div>
  
       
          
            
         <div className="contain-Map">
         <div dangerouslySetInnerHTML={{ __html: embed }}  className="map"
                        // style={
                        //     styleDescription
                        // }
                        ></div>
         
          </div>
          {/* <div className="col-12">
          <div className="row-flex">
            <div className="col-3">
              <h5>Giới thiệu</h5>
              <ul>
                <li><Link to="/">Về HappyCare</Link></li>
                <li><Link to="/">Tuyển dụng</Link></li>
                <li><Link to="/">Điều khoản sử dụng</Link></li>
                <li><Link to="/">Chính sách bảo mật</Link></li>
              </ul>
          </div>
          <div className="col-3">
          <h5>Chăm sóc khách hàng</h5>
          <ul>
            <li><Link to="/">Hướng dẫn đặt lịch</Link></li>
            <li><Link to="/">Hướng dẫn thanh toán</Link></li>
            <li><Link to="/">Hướng dẫn đặt cọc</Link></li>
            <li><Link to="/">Hướng dẫn đặt cọc</Link></li>
          </ul>
        </div>
        </div>
        </div> */}
        
          
      </div>
      
    </div>

  

  
  <div class="text-center p-3  copy-right" 
  
  >
            <b>© 2023 Copyright:
    <Link to="/"> 
    {
      dataLanguage.coppyright[lang]
    }
    </Link>
    </b>
      </div>
     
  </footer>
    );

}
export default Footer;