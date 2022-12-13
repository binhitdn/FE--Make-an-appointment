
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
                        <NavLink to="/" activeClassName="active">
                        <i class="fa-solid fa fa-database"></i>
                            <span>Trang Chủ</span>
                        </NavLink>
                    </li>
                    <li
                    onClick={handleClick}
                    >

                        <NavLink to="/manager-user" activeClassName="active">
                        <i class="fa-solid fa fa-user"></i>
                            <span>Quản Lí Người Dùng</span>
                            <ul>
                                <li>
                                    <NavLink to="/admin/dashboard" activeClassName="active">
                                    <i class="fa fa-solid fa-user-doctor-hair"></i>
                                        <span>Quản Lí Bác Sĩ</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/dashboard" activeClassName="active">
                                    <i class="fa fa-regular fa-hospital-user"></i>
                                        <span>Quản Lí Bệnh Nhân</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/dashboard" activeClassName="active">
                                    <i class="fa fa-regular fa-user-pen"></i>
                                        <span>Quản Lí CTV</span>
                                    </NavLink>
                                </li>
                                
                            </ul>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            <span>Quản Lí Chuyên Khoa</span>
                            <ul>
                                <li>
                                    <NavLink to="/manager-specialty/add" activeClassName="active">
                                    <i class="fa fa-solid fa-user-doctor-hair"></i>
                                        <span>Thêm Chuyên Khoa</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="manager-specialty/edit" activeClassName="active">
                                    <i class="fa fa-regular fa-hospital-user"></i>
                                        <span>Danh Sách Chuyên Khoa</span>
                                    </NavLink>
                                </li>
                                
                                
                            </ul>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manager-scheduk" activeClassName="active">
                            <i className="fa fa-list" aria-hidden="true"></i>
                            <span>Quản Lí Cuộc Hẹn</span>
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to="/manager-handbook" activeClassName="active">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span>Quản Lí Bài Viết</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/reviews" activeClassName="active">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <span>Quản Lí Đánh Giá</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );

}
export default SideBar;