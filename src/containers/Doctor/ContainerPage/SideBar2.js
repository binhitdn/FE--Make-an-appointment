import { Link, NavLink } from "react-router-dom";
import "./scss/SideBar2.scss";
function SideBar2() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo"></div>
      <div className="sidebar__menu">
        <div className="container-fluid">
          <b>ダッシュボード</b>
          <div className="row flex-nowrap">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start menu-big"
              id="menu"
            >
              <li className="nav-item ">
                <NavLink to="/" className="nav-link align-middle px-0">
                  <i class="fa-regular fa-gauge-max icon-sidebar-menu"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    ダッシュボード
                  </span>
                </NavLink>
              </li>
              <hr></hr>
              <b>管理</b>
              <li className="nav-item ">
                <a
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i class="fa-sharp fa-solid fa-clipboard-list icon-sidebar-menu"></i>
                  <span className="ms-1 d-none d-sm-inline">予約の管理</span>{" "}
                  <i class="fa-thin fa-circle-chevron-down icon-sidebar-collapsed icon-collapsed"></i>
                </a>

                <ul
                  className="collapse  nav flex-column ms-1 submenu"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <NavLink
                      className="nav-link px-0"
                      to="/manager-booking-new"
                    >
                      <i class="fa-sharp fa-solid fa-calendar-plus icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">
                        新しい予約
                      </span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link px-0"
                      to="/manager-booking-confirm"
                    >
                      <i class="fa-regular fa-calendar-check icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">
                        確認済みの予約
                      </span>{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="nav-link px-0"
                      to="/manager-booking-finish"
                    >
                      <i class="fa-solid fa-circle-check icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">
                        完了した予約
                      </span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link px-0"
                      to="/manager-booking-cancelled"
                    >
                      <i class="fa-sharp fa-solid fa-calendar-xmark icon-sidebar-menu"></i>
                      <span className="d-none d-sm-inline link-submenu">
                        キャンセルされた予約
                      </span>{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <NavLink
                  to="/manager-schedule"
                  className="nav-link align-middle px-0"
                >
                  <i class="fa-regular fa-calendar-days icon-sidebar-menu"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    スケジュールの管理{" "}
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/profile-doctor"
                  className="nav-link align-middle px-0"
                >
                  <i class="fa-solid fa-user-doctor icon-sidebar-menu"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    医師情報の管理
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link align-middle px-0">
                  <i className="fa-solid fa-user icon-sidebar-menu"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    プロフィールの管理
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar2;
