import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import "./scss/SideBarMobile.scss"
import {handleAuth } from "./../../Auth/index"

function SideBarMobile(props) {
  const { author, setAuthor, loading,setLoading,account,setAccount} = useContext(AuthToken);

    
    
    return (
        <div className="mobile-overlay-menu"
              style={{
                transform: props.isMenuOpenMobile ? "translateX(0%)" : "translateX(100%)" ,
                animation: props.isMenuOpenMobile ? "slideIn 0.5s forwards" : "slideOut 0.5s forwards",
                animationDelay: props.isMenuOpenMobile ? "0s" : "0.5s",
                display: props.isMenuOpenMobile ? "block" : "none"
              }}
              
              >
                <div className="mobile-overlay-menu__body">
                  <div className="mobile-overlay-menu__header"> 
                    <div className="mobile-overlay-menu__title">
                      <div className="mobile-overlay-menu__title-logo"
                      style={{
                        backgroundImage: `url("http://localhost:3001/static/media/logo.56a267c3eb83014211bd.png")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '100px',
                        height: '50px',
                      }}
                      >
                        
                      </div>

                    </div>
                    <div className="mobile-overlay-menu__close"
                    onClick={props.handleMenuOpenMobile}
                    >
                    <i class="fa-regular fa-circle-xmark"></i>
                    </div>
                  </div>
                  <div className="mobile-overlay-menu__content">
                    {
                      !handleAuth().id &&
                      <Link className="btn btn-warning mobile-overlay-menu__login"
                      to="/login"
                      
                      onClick={props.handleMenuOpenMobile}
                      >
                        <div className="mobile-overlay-menu__login-title">
                          <i class="fa-solid fa-right-to-bracket"></i>
                          <span>Đăng nhập</span>
                        </div>
                      </Link>

                    }
                    {/* <div className="mobile-overlay-menu__login">
                      <div className="mobile-overlay-menu__login-title">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>Đăng nhập</span>
                        </div>
                    </div> */}
                    {
                      handleAuth().id && 
                      <div className="mobile-overlay-menu__users">
                      <div className="mobile-overlay-menu__profile">
                        <div className="mobile-overlay-menu__profile-info">
                        <div className="mobile-overlay-menu__profile-avatar"
                        style={{
                          backgroundImage: `url(${account.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          
                        }}
                        >
                        </div>
                        <div className="mobile-overlay-menu__profile-name">
                          <span>Xin chào: {account.lastName + " " + account.firstName}</span><br></br>
                          <b>{account.email}</b>
                        </div>
                        </div>
                        <div className="mobile-overlay-menu__list">
                        <NavLink className="mobile-overlay-menu__list-item"
                         to="/main-booking"
                        activeClassName="active"
                          onClick={props.handleMenuOpenMobile}
                        
                        >
                          <div className="mobile-overlay-menu__list-item-title">
                            <i class="fa-solid fa-user mobile-overlay-menu__list-item-logo"></i>
                            <span>Lịch hẹn của tôi</span>
                          </div>   
                        </NavLink>
                        <NavLink className="mobile-overlay-menu__list-item"
                         to="/profile"
                        activeClassName="active"
                          onClick={props.handleMenuOpenMobile}
                        
                        >
                          <div className="mobile-overlay-menu__list-item-title">
                            <i class="fa-solid fa-user mobile-overlay-menu__list-item-logo"></i>
                            <span>Trang cá nhân</span>
                          </div>   
                        </NavLink>
                    
                     
                    </div>
  
                      </div>
                      <div>
  
                      </div>
                      </div>
                      
                    }
                    <hr></hr>
                    <div className="mobile-overlay-menu__list">
                      <NavLink className="mobile-overlay-menu__list-item"
                       to="/"
                      activeClassName="active"
                        onClick={props.handleMenuOpenMobile}
                      
                      >
                        <div className="mobile-overlay-menu__list-item-title">
                         <i class="fa-solid fa-home mobile-overlay-menu__list-item-logo"></i>
                          <span>Trang chủ</span>
                        </div>   
                      </NavLink>
                      <NavLink className="mobile-overlay-menu__list-item"
                      to="/specialty"
                      onClick={props.handleMenuOpenMobile}      
                      >
                        <div className="mobile-overlay-menu__list-item-title">
                          <i class="fa-duotone fa-flask menu-icon mobile-overlay-menu__list-item-logo"></i>
                          <span>Chuyên khoa</span>
                        </div>
                      </NavLink>  
                      <NavLink className="mobile-overlay-menu__list-item"
                      to="/doctor"
                        onClick={props.handleMenuOpenMobile}
                      >
                        <div className="mobile-overlay-menu__list-item-title">
                          <i class="fa-solid fa-user-doctor mobile-overlay-menu__list-item-logo"></i>
                          <span>Bác sĩ</span>
                        </div>
                      </NavLink>
                      <NavLink className="mobile-overlay-menu__list-item"
                      to="/handbook"
                        onClick={props.handleMenuOpenMobile}
                      >
                        <div className="mobile-overlay-menu__list-item-title">
                          <i class="fa-solid fa-newspaper mobile-overlay-menu__list-item-logo"></i>
                          <span>Cẩm nang</span>
                        </div>
                      </NavLink>
                  </div>

                  
                  
                </div>

                
                
              </div>     
                         
              </div> 
    )
}
export default SideBarMobile;