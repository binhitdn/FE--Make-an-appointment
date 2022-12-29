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
              <i class="fa-sharp fa-solid fa-gauge icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">DashBoard</span>
              </NavLink>
            </li>
            <li className="nav-item " >
              <NavLink to="/manager-user"   className="nav-link align-middle px-0" >
              <i className="fa-solid fa-users icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Người Dùng</span>
              </NavLink>
            </li>
            <li className="nav-item ">
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fa-duotone fa-flask icon-sidebar-menu" ></i> <span className="ms-1 d-none d-sm-inline"
                        
              
                        >Chuyên Khoa</span>
                        
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"
                        style={{
                          position: "absolute",
                          right: "20",
                         
                        }}
                        ><title>ionicons-v5-b</title><path d="M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z" 
                        style={{
                            fill: "none",
                            stroke: "#000",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                           
                        }}/><polyline points="352 216 256 312 160 216" 
                        style={{

                            fill: "none",
                            stroke: "#000",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px"
                        }}
                        /></svg> */}
                        </a>
                        
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
                    <li className="nav-item ">
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fa-solid fa-newspaper icon-sidebar-menu" ></i> <span className="ms-1 d-none d-sm-inline">Cẩm nang</span></a>
                        
                        <ul className="collapse  nav flex-column ms-1 submenu" id="submenu2" data-bs-parent="#menu2">
                        <li className="w-100">
                    
                    <NavLink className="nav-link px-0" to="/manager-handbook/">
                    <i className="fa-solid fa-plus icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Thêm Cẩm nang</span> </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link px-0" to="manager-handbook/edit">
                    <i className="fa-solid fa-list icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">Danh Sách Cẩm nang</span> </NavLink>
                  </li>
                        </ul>
                    </li>
            
            
           
            <li className="nav-item" >
              <NavLink to="/profile"  className="nav-link align-middle px-0" >
              <i className="fa-solid fa-book icon-sidebar-menu"></i>
                <span className="ms-1 d-none d-sm-inline">Quản lí thông tin</span>
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