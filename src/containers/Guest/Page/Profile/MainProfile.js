import { useState } from "react";
import "./MainProfile.scss";
import ManagerPassword from "./ManagerPassword";
import ProfileGuest from "./ProfileGuest";

function MainProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(1);

    let dataMenuSidebar = [
        
        {
            id: 1,
            name: "Thông tin cá nhân",
            icon: "fas fa-user",
            link: "/profile",
        },
        {
            id: 2,
            name: "Quản lí mật khẩu",
            icon: "fas fa-key",
            link: "/profile/change-password",
        },
        {
            id: 3,
            name: "Đăng xuất",
            icon: "fas fa-sign-out-alt",
            link: "/logout",
        },
    ];
    
    
    // useEffect(() => {
    //     const getUser = async () => {
    //     const response = await axios.get(`/api/users/${id}`);
    //     setUser(response.data);
    //     setLoading(false);
    //     };
    //     getUser();
    // }, [id]);
    
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
                <div className="main-profile__content_title">
                    <b className="main-profile__content_title_title">Thông tin cá nhân</b>
                </div>
                <div className="main-profile__content_content">
            
                    {
                        selectedItem === 1 && <ProfileGuest />
                    }
                    {
                        selectedItem === 2 && <ManagerPassword />
                    }
                </div>
            </div>


               

           
            
        </div>

    );
}
    export default MainProfile;
