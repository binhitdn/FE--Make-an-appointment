import React, { Component } from 'react';
import './scss/Specialty.scss';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function TopHospital(props) {

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
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,

                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
    let data = [
        {
            id: 1,
            name: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
            image: 'https://photo-cms-tpo.zadn.vn/w890/Uploaded/2022/tqdqdw-jxqdxjhqd/2021_05_03/116796747-3467421396635018-7866457779342926796-n-6939.jpeg'
        },
        {
            id: 2,
            name: " Trung tâm Y khoa Phúc Khang Đà Nẵng",
            image: "https://cdn-healthcare.hellohealthgroup.com/2022/08/1661917516_630ed94cb0b9f5.85670003.jpg"
        },
        {
            id: 3,
            name: "Phòng khám Đa khoa Đông Phương",
            image: "https://i.ex-cdn.com/tintucvietnam.vn/files/f1/2018/06/30/xu-phat-phong-kham-da-khoa-dong-phuong-voi-nhieu-vi-pham-bb-baaadoU441.jpg?v=1530351345498",
        },
        {
            id: 4,
            name: "Phòng khám Pasteur Da Nang",
            image: "https://thuocdantoc.vn/wp-content/uploads/2018/12/phong-kham-da-khoa-pasteur-1.jpg"
        }
    ]

    


        return (       
            <div className="section-specialties">
                <b><h5 >
                        Cơ sở y tế
                </h5></b>
                <div className="specialty-content">
                <Slider {...settings}>
      {
        data && data.map((item,index) =>{
            return (
                <div className="img-customize"
                
                >
            <div className="section-specialty-item">
                <div style={{
                    background: `url(${item.image})`
                }}>               </div>
                <p>
                    {
                        item.name
                    }

                </p>
            </div>
      </div>
            )
        })
      }
    
      
      
    </Slider>
                </div>
            </div>
          
        );
    

}





export default TopHospital;
