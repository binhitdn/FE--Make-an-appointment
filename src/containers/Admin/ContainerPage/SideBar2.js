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
            <li className="nav-item " >
              <NavLink to="/manager-user"   className="nav-link align-middle px-0" >
              <i className="fa-solid fa fa-database icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Người Dùng</span>
              </NavLink>
            </li>
            <li className="nav-item ">
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fa fa-shopping-bag icon-sidebar-menu" ></i> <span className="ms-1 d-none d-sm-inline">Chuyên Khoa</span> <i className="fa-solid fa-plus icon-sidebar-menu"></i></a>
                        
                        <ul className="collapse  nav flex-column ms-1 submenu" id="submenu1" data-bs-parent="#menu">
                        <li className="w-100">
                    
                    <NavLink className="nav-link px-0" to="/manager-specialty/add">
                    <i className="fa-solid fa-plus icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Thêm Chuyên Khoa</span> </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link px-0" to="manager-specialty/edit">
                    <i className="fa-solid fa-list icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Danh Sách Chuyên Khoa</span> </NavLink>
                  </li>
                        </ul>
                    </li>
            
            <li className="nav-item" >
              <NavLink to="/manager-handbook"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí cẩm nang</span>
              </NavLink>
            </li>
            <li className="nav-item" >
              <NavLink to="/manager-handbooks"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí bác sĩ</span>
              </NavLink>
            </li>
            {/* <li className="nav-item" >
              <NavLink to="/manager-income"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí thu nhập</span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
            </div>
        </div>
    )

}
export default SideBar2