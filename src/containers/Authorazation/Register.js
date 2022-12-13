import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleCreateUserApi } from "../../services/userService";
import { AuthToken } from "../../utils/AuthToken";
import {handleGetAllCode} from "./../../services/systemService"
import "./scss/Register.scss"
function Register() {
    const navigate = useNavigate();
    const { author, setAuthor } = useContext(AuthToken);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [genderSelect, setGenderSelect] = useState([]);
    const [radioChecked, setRadioChecked] = useState(false);





    let handleGetData = async () => {
        let data = await handleGetAllCode("GENDER");
        setGenderSelect(data.data.data);
    }
    useEffect(() => {

        handleGetData();
    }, [])

    let handleOnChangeInput = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value); 
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "rePassword") {
            setRePassword(e.target.value);
        } else if (e.target.name === "firstName") {
            setFirstName(e.target.value);
        } else if (e.target.name === "lastName") {
            setLastName(e.target.value);
        } else if (e.target.name === "phoneNumber") {
            setPhone(e.target.value);
        } else if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "gender") {
            setGender(e.target.value);
        }
    }

    let handleRegister = async() => {
        let data = {
            email: email,
            password: password,
            rePassword: rePassword,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            gender: gender,
            role: 'R3'
        }
        if(validate()) {
            let res = await handleCreateUserApi(data);
            console.log(res)
            toast.success("Register success. Please login to continue");
            setAuthor("patient");
            navigate('/login');


        }  
    }
    let validate = () => {
      
        if (email === "") {
            toast.error("Email is required");
            return false;
        } else if (password === "") {
            toast.error("Password is required");
            return false;
        } else if (rePassword === "") {
            toast.error("RePassword is required");
            return false;
        } else if (firstName === "") {
            toast.error("FirstName is required");
            return false;
        } else if (lastName === "") {
            toast.error("LastName is required");
            return false;
        } else if (phone === "") {
            alert("Phone is required");
            return false;
        } else if (address === "") {
            toast.error("Address is required");
            return false;
        } else
            return true;
    }
    let checkInputRadio = (e) => {
        if (e.target.checked) {
            setRadioChecked(true);
        } else {
            setRadioChecked(false);
        }
    }
    

    return (

      <div className="background-login">
         <div className="form-login">
      <form>
      <div className="title-login">
                        ĐĂNG KÝ
                    </div>
          <div className="row">
                <div className="col">           
                      <label className="form-label"  >First name</label>
                      <input type="text"  className="form-control" name="firstName"
                      onChange={
                        (e) => handleOnChangeInput(e)
                    }
                       />
                </div>          
                 <div className="col">
                      <label className="form-label" htmlFor="form2Example1" 
                      
                      >Last name</label>
                      <input type="text"  className="form-control" name="lastName"
                      onChange={
                        (e) => handleOnChangeInput(e)
                    }
                      />
                </div>
          </div>
          <div className="row">
                <div className="col">           
                      <label className="form-label">Giới Tính</label>
                      <select className="form-select" name="gender"
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      value={
                        gender
                      }
                      >
                          {
                            genderSelect && genderSelect.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>{item.valueEn}</option>
                                )
                            }
                            )
                          }
                      </select>
                </div>          
                 <div className="col">
                      <label className="form-label">Số điện thoại</label>
                      <input type="tel"  className="form-control" name="phoneNumber" 
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      />
                </div>
          </div>
          <div className="row">
                <div className="col">
                      <label className="form-label">Địa chỉ Email</label>
                      <input type="email"  className="form-control" name="email"
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      />
                </div>
          </div>
          <div className="row">
                <div className="col">
                      <label className="form-label">Địa chỉ</label>
                      <input type="text"  className="form-control" name="address" 
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      />
                </div>
          </div>
          <div className="row">
                <div className="col-6">
                     <label className="form-label">Mật khẩu</label>
                      <input type="text"  className="form-control" name="password" 
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      />
                </div>
                <div className="col-6">
                      <label className="form-label" >Nhập lại mật khẩu</label>
                      <input type="text"  className="form-control" name="rePassword"
                      onChange={
                          (e) => handleOnChangeInput(e)
                      }
                      />

                </div>
          </div>
          
          <div className="row">                
                  <div className="col">                  
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31"
                            onChange={
                                (e) => checkInputRadio(e)
                            }
                            />
                            <span > Tôi đồng ý với các điều khoản và dịch vụ bên HappyCare </span> 
                  </div>
               
          </div>
          <input type="button" className="btn btn-primary" value="Đăng Kí" onClick={

              () => handleRegister()
          }
          disabled={
              !radioChecked
          }
          />
          <div className="row">
                <div className="col">
                        <span > Bạn đã có tài khoản? </span>
                        <Link to="/login">Đăng nhập</Link>
                </div>
            </div>


      </form>
  </div>
      </div>

    );
}
export default Register;