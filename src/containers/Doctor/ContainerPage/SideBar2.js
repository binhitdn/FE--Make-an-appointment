import { Link, NavLink } from "react-router-dom"
import "./scss/SideBar2.scss"
function SideBar2() {
    return (
        
    <div className="sidebar">
            <div className="sidebar__logo">
                
            </div>
            <div className="sidebar__menu">
            <div className="container-fluid">
        <div className="row flex-nowrap">
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start menu-big" id="menu">
            <li className="nav-item " >
              <NavLink to="/"   className="nav-link align-middle px-0" >
              <i className="fa-solid fa fa-database icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Trang chủ</span>
              </NavLink>
            </li>
            <li className="nav-item ">
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fa fa-shopping-bag icon-sidebar-menu" ></i> <span className="ms-1 d-none d-sm-inline">Quản lí cuộc hẹn</span> <i className="fa-solid fa-plus icon-sidebar-menu"></i></a>
                        
                        <ul className="collapse  nav flex-column ms-1 submenu" id="submenu1" data-bs-parent="#menu">
                        <li className="w-100">
                    
                    <NavLink className="nav-link px-0" to="/manager-booking-new" >
                    <i className="fa-solid fa-plus icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Cuộc hẹn mới</span> </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link px-0" to="/manager-booking-confirm"  >
                    <i className="fa-solid fa-list icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Cuộc hẹn đã xác nhận</span> </NavLink>
                  </li>
            
                  <li>
                    <NavLink className="nav-link px-0" to="/manager-booking-finish" >
                    <i className="fa-solid fa-list icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Cuộc hẹn hoàn tất</span> </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link px-0" to="/manager-booking-cancelled" >
                    <i className="fa-solid fa-list icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Cuộc hẹn đã hủy</span> </NavLink>
                  </li>

                        </ul>
                    </li>
            <li className="nav-item " >
              <NavLink to="/manager-schedule"   className="nav-link align-middle px-0" >
              <i className="fa-solid fa fa-database icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản Lí Lịch </span>
              </NavLink>
            </li>
            
            
            
            <li className="nav-item" >
              <NavLink to="/profile-doctor"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí tt bác sĩ</span>
              </NavLink>
            </li>
            <li className="nav-item" >
              <NavLink to="/profile"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí tt cá nhân</span>
              </NavLink>
            </li>
            
            
            
          </ul>
        </div>
      </div>
            </div>
        </div>
    )

}
export default SideBar2