import { useContext, useEffect } from "react";
import { useState } from "react";
import {handleAuth} from '../../../Auth/index';
import { editUserApi, getUserByIdApi } from "../../../services/userService";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { AuthToken } from "../../../utils/AuthToken";
import ModalLoading from "../../../components/ModalLoading";



function Profile() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [avatar,setAvatar] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [selectedItem,setSelectedItem] = useState(1);
    const {account,setAccount} = useContext(AuthToken);
    const [loading,setLoading] = useState(false);


    let handleGetUserDetails = async() => {
        let  response ;
       (
        async () => {
            setLoading(true);
           response = await getUserByIdApi(handleAuth().id);
        }
        )().then(() => {
        setLoading(false);
            console.log(response.users);
        setFirstName(response.users.firstName);
        setLastName(response.users.lastName);
        setEmail(response.users.email);
        setPhone(response.users.phone);
        setAddress(response.users.address);
        setAvatar(response.users.image ? response.users.image : "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg");
        }
        
            
       )
        
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
    const handleFileUpload = async(e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        
       
        let a= await axios.post("/cloudinary-upload", uploadData)
        setAvatar(a.secure_url);
      }
      let handleEditUser = async() => {
        console.log("handleEditUser");
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            image: avatar,
            id: handleAuth().id,
            }
            let response = await editUserApi(user);
            console.log(response);
            toast.success("Cập nhật thông tin thành công");
            
            
        }
        
        
    return(
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
                            <div className="col-1">
                    <div className="ProfileDoctor__avatar">
                        <label
                        className="image-avatar"
                        style={{
                            backgroundImage: `url(${avatar})`,
                            display: "block",
                            position: "relative",
                        }}
                        
                        htmlFor="up-photo" 
                        >
                            <div className="image-avatar__overlay"
                            style={{
                                background: "rgba(0,0,0,0.5)",
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                right: "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "7px",
                                color: "#fff",
                                cursor: "pointer",


                            }}
                            >
                                <i className="fas fa-camera"
                                style={{
                                    fontSize: "20px",
                                   
                                }}
                                ></i>
                            </div>


                        </label>
                    </div>
                    <div className="select-avatar">
                    <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              id="up-photo"
              hidden

            />


                        

                </div>           
            </div>
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
                                        <input className="btn btn-primary" type="submit" value="Lưu"
                                         onClick={
                                            handleEditUser
                                        }
                                        />
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
                                        <input className="btn btn-primary" type="submit" value="Lưu" 
                                       
                                        />
                                    </div>
                            </div>

                        </div>
                        
                        

                    }

                </div>

            </div>
        
           
            
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
                {
                    loading && <ModalLoading />
                }
            </div> 
            
        </>
    )
}
export default Profile;