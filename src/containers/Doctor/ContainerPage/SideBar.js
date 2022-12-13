import { NavLink } from "react-router-dom";
import "./scss/SideBar.scss";

function SideBar() {

    let handleClick = () => {
        console.log("click");
        this.classList.toggle("active"); 
    }
    return (

        <div className="sidebar">
            <div className="sidebar__logo">
                
            </div>
            <div className="sidebar__menu">
                <ul>
                <li>
                        <NavLink to="/statistical" activeClassName="active">
                        <i class="fa-solid fa fa-database"></i>
                            <span>Thống Kê</span>
                        </NavLink>
                    </li>
                   

                    <li>
                        <NavLink to="/manager-booking-new" activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Quản Lí Cuộc Hẹn </span>
                            <ul>
                                <li>
                                    <NavLink to="/manager-booking-new" activeClassName="active">
                                    <i class="fa fa-solid fa-user-doctor-hair"></i>
                                        <span>Quản Lí Cuộc Hẹn Mới</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manager-booking-confirm" activeClassName="active">
                                    <i class="fa fa-regular fa-hospital-user"></i>
                                        <span>Quản Lí Cuộc Hẹn Đã Xác Nhận</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manager-booking-finish" activeClassName="active">
                                    <i class="fa fa-regular fa-user-pen"></i>
                                        <span>Cuộc Hẹn Đã Hoàn Thành</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manager-booking-cancelled" activeClassName="active">
                                    <i class="fa fa-regular fa-user-pen"></i>
                                        <span>Cuộc Hẹn Đã Hủy</span>
                                    </NavLink>
                                </li>
                                
                            </ul>
                        </NavLink>
                        
                    </li>
                    <li>
                        <NavLink to="/manager-schedule" activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Quản Lí Lịch  </span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/manager-specialty" activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Quản Lí Bệnh Nhân </span>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/profile-doctor" activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Thông tin bác sĩ </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Thông tin cá nhân </span>
                        </NavLink>
                    </li>
                    
                        
                    

                </ul>
            </div>
        </div>
    );

}
export default SideBar;