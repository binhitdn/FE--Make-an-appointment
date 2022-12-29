import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleAuth } from "../../../../Auth";
import { changePasswordApi, getUserByIdApi } from "../../../../services/userService";



function ManagerPassword() {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");

    // let handleGetUserDetails = async() => {
        
    // }
    // useEffect(() => {
    //     handleGetUserDetails();
    // },[])



    let handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        switch(name){
            case "newPassword":
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
    let validatePassword = () => {
        if(!oldPassword) {
            toast.error("Mật khẩu cũ không được để trống");
        }
        if(!confirmPassword) {
            toast.error("Xác nhận mật khẩu không được để trống");
        }
        
        if(password) {
            if(password.length < 6) {
                toast.error("Mật khẩu phải có ít nhất 6 ký tự");
                return false;
            } else if(password.length > 32) {
                toast.error("Mật khẩu không được quá 32 ký tự");
                return false;
            } else {
                return true;
            }
        } else {
            toast.error("Mật khẩu không được để trống");
            return false;
        }
        
        
          
            
    }
    let handleEditPassword = async(e) => {
        e.preventDefault();
        if(!validatePassword()) return;
        if(password !== confirmPassword){
            toast.error("Mật khẩu không khớp");
        }
        else{
            let data = {
                oldPassword: oldPassword,
                newPassword: password,
                id: handleAuth().id
            }
            let response = await changePasswordApi(data);
            console.log(response);
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
                <input type="submit" className="btn btn-warning" value="Thay đổi mật khẩu" 
                onClick={handleEditPassword}
                /> 
                </div>
            </div>  
        </div>
    )
}
export default ManagerPassword;