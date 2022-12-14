import { useEffect } from "react";
import { useState } from "react";
import {handleAuth} from '../../../Auth/index';
import { getUserByIdApi } from "../../../services/userService";


function Profile() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [selectedItem,setSelectedItem] = useState(1);

    let handleGetUserDetails = async() => {
        let response = await getUserByIdApi(handleAuth().id);
        console.log(response.users);
        setFirstName(response.users.firstName);
        setLastName(response.users.lastName);
        setEmail(response.users.email);
        setPhone(response.users.phone);
        setAddress(response.users.address);
    }
    useEffect(() => {
        handleGetUserDetails();
    },[])
    let dataMenuSidebar = [
        {
            id: 1,
            name: "Thông tin cá nhân",
            icon: "fas fa-user",
            link: "/doctor/profile"
        },
        {
            id: 2,
            name: "Đổi mật khẩu",
            icon: "fas fa-key",
            link: "/doctor/profile/change-password" 
        }
    
    ];



    let handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        switch(name){
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            case "oldPassword":
                setOldPassword(value);
                break;
            default:
                break;
        }
    }
        
    return(
        // <div className="container">
        //     <div className="row">
        //         <div className="col-2">
        //             <label>First Name</label>
        //             <input type="text" className="form-control" placeholder="First Name" name="firstName" 
        //             onChange={handleChangeInput} value={firstName}
        //             />
        //         </div>
        //         <div className="col-2">
        //             <label>Last Name</label>
        //             <input type="text" className="form-control" placeholder="Last Name" name="lastName"
        //             onChange={handleChangeInput} value={lastName}
        //             />
        //         </div>
        //         <div className="col-2">
        //         <label>Giới tính</label>
        //         <select className="form-control" name="gender"
        //         onChange={handleChangeInput} value={gender}
        //         >
        //             <option value="1">Nam</option>
        //             <option value="0">Nữ</option>
        //         </select>
        //         </div>
        //         <div className="col-4">
        //             <label>Địa chỉ</label>
        //             <input type="text" className="form-control" placeholder="Địa chỉ" name="address" 
        //             onChange={handleChangeInput} value={address}
        //             />
        //         </div>

                
        //     </div>
        //     <div className="row">
        //         <div className="col-5">
        //             <label>Email</label>
        //             <input type="email" className="form-control" placeholder="Email" name="email" 
        //             onChange={handleChangeInput} value={email}
        //             />
        //         </div>
        //         <div className="col-5">
        //             <label>Số điện thoại</label>
        //             <input type="tel" className="form-control" placeholder="Số điện thoại" name="phone" 
        //             onChange={handleChangeInput} value={phone}
        //             />
        //         </div>
        //     </div>
        //     <input type="submit" className="btn btn-primary" value="Lưu" />
        //     <div className="row">
        //         <div className="col-5">
        //             <label>Mật khẩu cũ</label>
        //             <input type="password" className="form-control" placeholder="Mật khẩu cũ" name="oldPassword" 
        //             onChange={handleChangeInput} value={oldPassword}
        //             />
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-5">
        //             <label>Mật khẩu mới</label>
        //             <input type="password" className="form-control" placeholder="Mật khẩu mới" name="newPassword" 
        //             onChange={handleChangeInput} value={password}
        //             />
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-5">
        //             <label className="form-label">Xác nhận mật khẩu</label>
        //             <input type="password" className="form-control" placeholder="Xác nhận mật khẩu" name="confirmPassword" 
        //             onChange={handleChangeInput} value={confirmPassword}
        //             />
        //         </div>
        //     </div>
        //     <input type="submit" className="btn btn-primary" value="Thay đổi mật khẩu" />   
        // </div>
        <>
            <div className="main-profile">
            <div className="sidebar-profile">
                <div className="sidebar-profile__title">
                    <b className="sidebar-profile__title_title">Thông tin cá nhân</b>
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
                        selectedItem === 1 ?    <div>

                            <div className="row">
                                <div className="col-2">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" name="firstName" 
                                    onChange={handleChangeInput} value={firstName}
                                    />
                                </div>
                                <div className="col-2">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name" name="lastName"
                                    onChange={handleChangeInput} value={lastName}
                                    />
                                </div>
                                <div className="col-2">
                                <label>Giới tính</label>
                                <select className="form-control" name="gender"
                                onChange={handleChangeInput} value={gender}
                                >
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </select>
                                </div>
                                <div className="col-4">
                                    <label>Địa chỉ</label>
                                    <input type="text" className="form-control" placeholder="Địa chỉ" name="address" 
                                    onChange={handleChangeInput} value={address}
                                    />
                                </div>
                
                                
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" name="email" 
                                    onChange={handleChangeInput} value={email}
                                    />
                                </div>
                                <div className="col-5">
                                    <label>Số điện thoại</label>
                                    <input type="tel" className="form-control" placeholder="Số điện thoại" name="phone" 
                                    onChange={handleChangeInput} value={phone}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                    <div className="col-3">
                                        <input className="btn btn-primary" type="submit" value="Lưu" />
                                    </div>
                            </div>
                        </div>
                        
                         : <div>
                            <div className="row">
                                <div className="col-5">
                                    <label>Mật khẩu cũ</label>
                                    <input type="password" className="form-control" placeholder="Mật khẩu cũ" name="oldPassword"
                                    onChange={handleChangeInput} value={oldPassword}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <label>Mật khẩu mới</label>
                                    <input type="password" className="form-control" placeholder="Mật khẩu mới" name="newPassword"
                                    onChange={handleChangeInput} value={password}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <label className="form-label">Xác nhận mật khẩu</label>
                                    <input type="password" className="form-control" placeholder="Xác nhận mật khẩu" name="confirmPassword"
                                    onChange={handleChangeInput} value={confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                    <div className="col-3">
                                        <input className="btn btn-primary" type="submit" value="Lưu" />
                                    </div>
                            </div>

                        </div>
                        
                        

                    }

                </div>

            </div>
        


                {/* <div className="item-menu-bar sidebar-profile_booking active-menu">
                    
                        <i className="fas fa-calendar-check"></i> Lịch hẹn
                    
                </div>
                <div className="item-menu-bar sidebar-profile_edit">
                    <i className="fas fa-user-edit"></i> Chỉnh sửa thông tin
                </div>
                <div className="item-menu-bar sidebar-profile_password">
                    <i className="fas fa-key"></i> Đổi mật khẩu
                </div> */}

           
            
        </div>
        <div
                className="background-schedule"
                        style={{
                            backgroundImage: `url("https://www.vinmec.com/static/img/image-doctor-qna.dd79fe239b92.png")`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                            position: "fixed",
                            top: "0",
                            right: "0",
                            zIndex: "-1",
                            opacity: "0.2"
                        }}

            >
            </div> 
        </>
    )
}
export default Profile;