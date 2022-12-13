import React, { useContext } from "react";
import "./Reviewer.scss"
import { AuthToken } from "../../../../utils/AuthToken"
// reviewerdata

import Marquee from "react-fast-marquee";
import reviewerdata from "../../../../data/reviewerdata";

function Reviewer() {
    
    const {lang} = useContext(AuthToken);
   return (
    <div>
        <h1
        style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "50px",
            textTransform: "uppercase",
            fontWeight: "900",
        }}
            > {lang === "ja" ? "お客様の声" : "Đánh giá từ khách hàng về trang web"} </h1>
                
    <Marquee
    direction="left"
    >
    {
          reviewerdata.map((reviewer, index) => {
              return (
                  <div className="reviewer" key={index}>
          <div className="reviewer__content">
              <div className="reviewer__content__img">
                  <img src={
                      reviewer.image
                  } alt="" className="reviewer-avatar" />
              </div>
              <div className="reviewer__content__text">
                  <b>
                      {
                          reviewer.name
                      }
                  </b>
                  <p className="review">
                      {
                          reviewer[lang]
                      }
                  </p>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
              </div>
          </div>
      </div>
              )  
                  
          })
    }
     

  
     

</Marquee>

<Marquee
    direction="right"
    >
    {
          reviewerdata.map((reviewer, index) => {
              return (
                  <div className="reviewer" key={index}>
          <div className="reviewer__content">
              <div className="reviewer__content__img">
                  <img src={
                      reviewer.image
                  } alt="" className="reviewer-avatar" />
              </div>
              <div className="reviewer__content__text">
                  <b>
                      {
                          reviewer.name
                      }
                  </b>
                  <p className="review">
                      {
                          reviewer[lang]
                      }
                  </p>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
              </div>
          </div>
      </div>
              )  
                  
          })
    }
     

  
     

</Marquee>

</div>
    )
}

export default Reviewer;