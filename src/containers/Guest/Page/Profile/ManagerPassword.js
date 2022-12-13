import { useEffect } from "react";
import { useState } from "react";
import { handleAuth } from "../../../../Auth";
import { getUserByIdApi } from "../../../../services/userService";



function ManagerPassword() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");

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
        <div className="container">
           
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
                <div className="col-5">
                <input type="submit" className="btn btn-warning" value="Thay đổi mật khẩu" /> 
                </div>
            </div>  
        </div>
    )
}
export default ManagerPassword;