import moment from "moment";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { handGetAllHandbook } from "../../../services/handbookService";
import { AuthToken } from "../../../utils/AuthToken";
import "./scss/HandBook.scss"


function HandBook() {
    // const [handbook, setHandbook] = useState([]);
    const { handBook} = useContext(AuthToken);
    


    // useEffect(() => {
    //     let getHandbook = async () => {
    //         let result = await handGetAllHandbook();
    //         setHandbook(result.data);
    //     }
    //     getHandbook();
    //     console.log( formatFromNow("2021-09-01T00:00:00.000Z"));
    // }, [])
   let formatFromNow = (date) => {
        let fromNow = moment(new Date(date)) - moment(new Date());
        let days = -Math.floor(fromNow / (1000 * 60 * 60 * 24)) -1;
        let hours = -Math.floor((fromNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))-1;
        let minutes = -Math.floor((fromNow % (1000 * 60 * 60)) / (1000 * 60))-1;
        let seconds = -Math.floor((fromNow % (1000 * 60)) / 1000)-1;
        
        if (days > 5) {
            return "Đã đăng vào ngày " +moment(date).format("DD/MM/YYYY");
        }
        if (days > 0) {
            return days + " ngày" ;
        }
        if (hours > 0) {
            return hours + " giờ trước";
        }
        if (minutes > 0) {
            return minutes + " phút trước";
        }
        if (seconds > 0) {
            return seconds + " giây trước";
        }
        return "Vừa xong";

    }
        
    
    return (
        <div class="handbook-page">
            <div class="handbook-page__content">
                <div class="handbook-page__content__title">
                    <h4 class="title">Cẩm Nang</h4>
                    <p class="description">Nơi chúng tôi tổng hợp những cẩm nang,chia sẻ bổ ích giúp cuộc sống của mọi người trở nên khỏe mạnh hạnh phúc hơn.</p>
                </div>
                <div class="handbook-page__content__list">
                    {
                        handBook && handBook.map((item, index) => {
                            return (
                                <Link class="handbook-page__content__list__item" 
                                to={"/handbook/"+item.id}
                                >
                        
                        <div class="item-content-b">
                        <div class="item__content">
                            <h6 class="item__content__title">{item.title}</h6>
                            <p class="item__content__description">{item.description}</p>
                            <div class="item__content__button">
                                <div>Xem chi tiết</div>
                            </div>
                        </div>
                        <div class="item__image">
                            <img src={item.image} alt="" />
                        </div>
                        </div>
                        <div class="interaction">
                            <span class="view interaction-item">{item.view}<i class="fa-duotone fa-eye"></i></span>
                            <span class="comment interaction-item">{item.like} <i class="fa-duotone fa-comments"></i></span>
                            <span class="time interaction-item">
                                {/* {moment.subtract(moment(item.createdAt).format('DD/MM/YYYY hh:mm:ss'), moment(new Date()).format('DD/MM/YYYY hh:mm:ss')).milliseconds()}  */}
                                {/* {moment(item.createdAt).format('ss')} */}
                                {/* {moment(item.createdAt).fromNow()} */}
                                {formatFromNow(item.createdAt)}
                                <i class="fa-duotone fa-timer"></i></span>
                            
                        </div>
                    </Link>   
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    
                    

    );
}
export default HandBook;