import { useState } from "react";
import Booking from "./Booking";
import BookingReview from "./BookingReview";

function MainBooking() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(1);

    let dataMenuSidebar = [
        {
            id: 1,
            name: "Lịch sử đặt lịch",
            icon: "fas fa-history",
            link: "/profile/booking",
        },
        {
            id: 2,
            name: "Đánh giá của bạn",
            icon: "fas fa-star",
            link: "/profile/review",
        },
    ];
    
    return (
        <div className="main-profile">
            
            
            <div className="sidebar-profile">
                <div className="sidebar-profile__title">
                    <b className="sidebar-profile__title_title">Quản lí cá nhân</b>
                </div>
                <div className="sidebar-profile__menu">
                    {
                        dataMenuSidebar.map((item, index) => {
                            return (
                                <div className={
                                    "item-menu-bar" + (selectedItem === item.id ? " active-menu" : "")
                                    
                                }
                                key={index}
                                onClick={() => setSelectedItem(item.id)}
                                
                                >
                                    <i className={item.icon}></i>
                                    {item.name}
                                </div>
                            )
                        })


                    }
                </div>
            </div>
            <div className="main-profile__content">
                {/* <div className="main-profile__content_title">
                    <b className="main-profile__content_title_title">Lịch hẹn</b>
                </div> */}
                <div className="main-profile__content_content">
                    {
                        selectedItem === 1 && <Booking />
                    }
                    {
                        selectedItem === 2 && <BookingReview />
                    }
                    
                </div>
            </div>


               

           
            
        </div>

    );
}
    export default MainBooking;
