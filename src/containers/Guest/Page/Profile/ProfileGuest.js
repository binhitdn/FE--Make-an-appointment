import { useContext, useEffect } from "react";
import { useState } from "react";
import { handleAuth } from "../../../../Auth";
import { editUserApi, getUserByIdApi } from "../../../../services/userService";
import "./ProfileGuest.scss"
import axios from "../../../../axios";
import { AuthToken } from '../../../../utils/AuthToken';
import { toast } from "react-toastify";

import ModalLoading from "../../../../components/ModalLoading";




function ProfileGuest() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const {account,setAccount} = useContext(AuthToken);
    const [avatar,setAvatar] = useState("https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
    
   const [loading,setLoading] = useState(false);

    let handleGetUserDetails = async() => {
        // let response = await getUserByIdApi(handleAuth().id);
        // console.log(response.users);
        // setFirstName(response.users.firstName);
        // setLastName(response.users.lastName);
        // setEmail(response.users.email);
        // setPhone(response.users.phone);
        // setAddress(response.users.address);
        // setAvatar(response.users.image);
        setFirstName(account.firstName);
        setLastName(account.lastName);
        setEmail(account.email);
        setPhone(account.phone);
        setAddress(account.address);
        setAvatar(account.image ? account.image : "https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
        setGender(account.gender);
        
    }
    useEffect(() => {
        handleGetUserDetails();
    },[])



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
            case "gender":
                setGender(value);
                break;
            default:
                break;
        }
    }
    // useEffect(() => {
    //     let interval;
    //     if(loading){
    //         interval = setInterval(() => {
    //             console.log("loading",loading);
    //         },1000)

    //     } else {
    //         clearInterval(interval);
    //     }
    // },[loading])
    let handleFileUpload = async(e) => {
        let uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        
        let a;
        (async () => {

            try {
                setLoading(true);
                setAvatar("https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif");
                a= await axios.post("/cloudinary-upload", uploadData)
            } catch (error) {
                console.log(error);
            }
        })().then(() => {
            
            setLoading(false);
           

        setAvatar(a.secure_url);
        })

      }

      let handleEditUser = async() => {
        let user = {
            id: handleAuth().id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            image: avatar
        }
        setAccount({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            image: avatar
        
        });
        let response = await editUserApi(user);
        console.log(response);
        
        toast.success("Cập nhật thành công");
        
    }
    
        
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="avatar-account">
                        <label className="avatar-account__img"
                        style={{backgroundImage: `url(${
                            avatar ? avatar : "../../../../assets/images/data/avatar-default.jpg"
                        })`,cursor: "pointer",position: "relative",overflow: "hidden"}}
                        htmlFor="avatar"
                        
                        >
                            <div className="avatar-account__img--overlay"
                            style={{
                                position: "absolute",
                                bottom: "0",
                                left: "50%",
                                transform: "translate(-50%,0)",
                                width: "100%",
                                background: "rgba(0,0,0,0.5)",
                            }}
                            >
                                <i className="fas fa-camera"
                                style={{
                                    color: "#fff",
                                    fontSize: "20px",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    display: "block",
                                }}
                                ></i>
                            </div>

                        
                        </label>
                      
                        
                        <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              className="form-control"
              id="avatar"
              hidden
            />
                    </div>
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
                onChange={handleChangeInput} 
                value={gender}
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
                    disabled
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
                <div className="col-10">
                <input type="submit" className="btn btn-warning" value={
                loading ? "Xin chờ..." : "Cập nhật"
            }
            disabled={loading}
            onClick={handleEditUser}
            />
                </div>
            </div>
            
            {
                loading && <ModalLoading/>
            }
            
        </div>
    )
}
export default ProfileGuest;