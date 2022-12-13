import Cookies from 'js-cookie';
import { Fragment, useContext } from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthToken } from '../../utils/AuthToken';
import NavBar from '../Doctor/ContainerPage/NavBar';
import SideBar from '../Doctor/ContainerPage/SideBar2';
import ProfileDoctor from '../Doctor/Page/ProfileDoctor';
import Profile from "../Doctor/Page/Profile"
import Error404Page from '../Guest/Page/Error404Page';
import "./scss/Doctor.scss"
import ManagerSchedule from '../Doctor/Page/ManageSchedule';
import ManageBooking from '../Doctor/Page/ManageBooking';
import ScrollToTop from '../ScrollToTop';
import Statistical from '../Doctor/Page/Statistical';
import { ToastContainer } from 'react-toastify';
import ManageBookingComfirm from '../Doctor/Page/ManageBookingComfirm';
import ManageBookingFinish from '../Doctor/Page/ManageBookingFinish';
import ManageBookingCancelled from '../Doctor/Page/ManageBookingCancelled';
import IncomeManagement from '../Doctor/Page/IncomeManagement';


function Doctor() {
  
   
    return (
       <Fragment>
        
              <BrowserRouter>
              <ScrollToTop />
              <div className="doctor">
                    
                    <div className="doctor__body">
                        <div className="doctor__body__sidebar">
                            <SideBar />
                        </div>
                        <div className="doctor__body__content">
                        <div className="doctor__header">
                        <NavBar />
                    </div>
                        <Routes>
                    
                    <Route path="/" element={
                        <Statistical />
                    } />
                    <Route path="/profile-doctor" element={
                        <ProfileDoctor />
                    } />
                    <Route path="/profile" element={
                        <Profile />
                    } />
                    <Route path="/manager-schedule" element={
                        <ManagerSchedule />
                    } />
                    <Route path="/manager-booking-new" element={
                        <ManageBooking /> 
                    } />
                    <Route path="/manager-booking-confirm" element={
                        <ManageBookingComfirm />
                    } />
                    <Route path="/manager-booking-finish" element={
                        <ManageBookingFinish />
                    } />
                    <Route path="/manager-booking-cancelled" element={
                        <ManageBookingCancelled />
                    } />
                    <Route path="/income-manager" element={
                        <IncomeManagement />
                    } />





                                
                    <Route path="login" element={
                        <Navigate to="/"/>
                    }/>
                    <Route path="*" element={<Error404Page/>}/>
                </Routes>
                        </div>
                    
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
export default Doctor;