import { Fragment, useState } from 'react';
import { Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import SideBar from '../Guest/ContainerPage/SideBar';
import Login from '../../containers/Authorazation/Login';

import './scss/Guess.scss';
import NavBar from '../Guest/ContainerPage/NavBar';
import HomePage from '../Guest/Page/HomePage';
import Service from '../Guest/Page/Sections/Service';
import Error404Page from '../Guest/Page/Error404Page';
import Specialist from '../Guest/Page/Specialist';
import Doctor from '../Guest/Page/Doctor';
import HandBook from '../Guest/Page/HandBook';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthToken } from '../../utils/AuthToken';
import DetailSpecialty from '../Guest/Page/Specialist/DetailSpecialty';
import DoctorPage from '../Guest/Page/Doctor/DoctorPage';
import ScrollToTop2 from '../ScrollToTop';
import HandBookDetail from '../Guest/Page/HandBook/HandBookDetail';
import ProfileGuest from '../Guest/Page/Profile/ProfileGuest';
import Booking  from '../Guest/Page/Booking/Booking';
import Community from '../Guest/Page/Community';
import FBReactions from '../../components/FBReactions';
import Test from '../Guest/Page/Test';
import MainProfile from '../Guest/Page/Profile/MainProfile';
import SideBarMobile from './SideBarMobile';
import Login2 from './Login2';
import MainBooking from '../Guest/Page/Booking/MainBooking';
import ScrollToTop from "react-scroll-to-top";
function Guest() {
  const { loading, setLoading } = useContext(AuthToken);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    console.log("Tao nef");
      setLoading(!loading);
  }, []);
  let handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "unset" : "hidden";
  }
  
    return (
       <Fragment>   
              <BrowserRouter>  
              <ScrollToTop2 />     
              <ScrollToTop smooth color="#6f00ff" /> 
              <div className="containers">
              <div className="header">
                <NavBar 
                isMenuOpenMobile={isMenuOpen}
                handleMenuOpenMobile={handleMenuOpen}
                />
              </div>
              <div className="bodys">
                <div className="sidebars">
                <SideBar />
              </div>
                <div className="content">
                <Routes>            
            <Route path="/" element={
                    
                      
                      <HomePage />
                    
            } />  
                  <Route path="/specialty" element={<Specialist />} />      
                  <Route path="/doctor" element={<Doctor />} />   
                  <Route path="/handbook" element={<HandBook />} />
                  <Route path="/community" element={<Community />} />
                
                  <Route path="/specialty/:id" element={
                    <DetailSpecialty />
                  } />
                  <Route path="/doctor/:id" element={
                    <DoctorPage />
                  } />
                  <Route path="/handbook/:id" element={
                    <HandBookDetail />
                  } />
                  
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/emotion" element={<FBReactions />} />
                  <Route path="/profile" element={
                    <MainProfile />
                  } />
                  <Route path="/main-booking" element={
                    <MainBooking />
                  } />

            <Route path="/login" element={
                <Login />
            } />    
            <Route path="/login2" element={
                <Login2 />
            } />
            <Route path="/register" element={
                <Register />
            } />    
                  <Route path="*" element={
                    <Error404Page />
            } />
        </Routes>
                </div>
            </div>
            <div className="sidebar-mobile">
              <SideBarMobile 
              isMenuOpenMobile={isMenuOpen}
              handleMenuOpenMobile={handleMenuOpen}
              />
            </div>
              
            

            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


              </div>  
              
              
              </BrowserRouter>  
              
       </Fragment>

    );
    
}
export default Guest;