import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { useEffect, useState } from "react";
import { handleGetAllSpecialityApi } from "../../../services/specialtyService";
import "./scss/ProfileDoctor.scss"
import { handleGetAllCode } from '../../../services/systemService';
import { handleGetDoctorByIdApi, handleSaveInforDoctorsApi } from '../../../services/doctorService';
import {handleAuth} from '../../../Auth/index';
import axios from "../../../axios";


function ProfileDoctor() {
    const [specialtyData,setSpecialtyData] = useState([]);
    const [positionData,setPositionData] = useState([]);
    const [provinceData,setProvinceData] = useState([]);
    const [doctorData,setDoctorData] = useState([]);
    const [paymentData,setPaymentData] = useState([]);
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [specialty,setSpecialty] = useState("");
    const [position,setPosition] = useState("");
    const [cost,setCost] = useState("");
    const [province,setProvince] = useState("");
    
    const [nameClinic,setNameClinic] = useState("");
    const [addressClinic,setAddressClinic] = useState("");
    const [contentHTML,setContentHTML] = useState("");
    const [contentMarkdown,setContentMarkdown] = useState("");
    const [avatar,setAvatar] = useState("");
    const [payment,setPayment] = useState("");
    const [description,setDescription] = useState("");




    

    let getSpecialtyData = async () => {
        let res = await handleGetAllSpecialityApi();
        setSpecialtyData(res.specialities);
        let res2 = await handleGetAllCode("POSITION");
        setPositionData(res2.data.data);
        let res3 = await handleGetAllCode("PROVINCE");
        setProvinceData(res3.data.data);
        let res4 = await handleGetAllCode("PAYMENT");
        setPaymentData(res4.data.data); 
        
    }
    let getDoctorData = async () => {
        let res = await handleGetDoctorByIdApi(handleAuth().id);
        setDoctorData(res.doctor);
        setSpecialty(res.data.specialtyId);
        setPosition(res.data.positionId);
        setCost(res.data.priceId);
        setProvince(res.data.provinceId);
        setNameClinic(res.data.nameClinic);
        setAddressClinic(res.data.addressClinic);
        setContentHTML(res.data.contentHTML);
        setContentMarkdown(res.data.contentMarkdown);
        setAvatar(res.data.userData.image);
        setPayment(res.data.paymentId);
        setDescription(res.data.description);
    }
        
        

    useEffect(() => {
        getSpecialtyData();
        
    },[])
    useEffect(() => {
        getDoctorData();
        
    },[])
    let handleEditorChange = ({html, text}) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    let handleChangeInput = (e) => {
        let {name,value} = e.target;
        if(name === "specialty"){
            setSpecialty(value);
        }
        if(name === "position"){
            setPosition(value);
        }
        if(name === "cost"){
            setCost(value);
        }
        if(name === "province"){
            setProvince(value);
        }
        
        if(name === "nameClinic"){
            setNameClinic(value);
        }
        if(name === "addressClinic"){
            setAddressClinic(value);
        }
        if(name === "avatar"){
            setAvatar(value);
        }
        if(name==="payment"){
            setPayment(value);
        }
        if(name==="description"){
            setDescription(value);
        }


        
    }
    let handleSubmit = async(e) => {
        e.preventDefault();
        if(!specialty || !position || !cost || !province || !nameClinic || !addressClinic || !contentHTML || !contentMarkdown || !avatar || !payment || !description){
            alert("Vui lòng điền đầy đủ thông tin");
        } else {
            let res = await handleSaveInforDoctorsApi({
                specialty: specialty,
                position: position,
                cost: cost,
                province: province,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                avatar: avatar,
                payment: payment,
                email: handleAuth().email,
                description: description
            })
            console.log("res",res)
        }
        

        
        
    }
    let printState = () => {
        console.log("specialty: ",specialty);
        console.log("position: ",position);
        console.log("cost: ",cost);
        console.log("province: ",province);
        console.log("nameClinic: ",nameClinic);
        console.log("addressClinic: ",addressClinic);
        console.log("contentHTML: ",contentHTML);
        console.log("contentMarkdown: ",contentMarkdown);
        console.log("avatar: ",avatar);
        console.log("payment: ",payment);
        console.log("description: ",description);
    }
    const handleFileUpload = async(e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        
       
        let a= await axios.post("/cloudinary-upload", uploadData)
        setAvatar(a.secure_url);
      }
    

    return (
        <>
            <div className="ProfileDoctor-container">
            <div className="row">
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
                    <div className="ProfileDoctor__info">
                        <div className="ProfileDoctor__info__select_specialty">
                            <select className="form-control"
                            onChange={handleChangeInput}
                            name="specialty"
                            value={specialty}
                            >
                                <option value="0">Chọn chuyên khoa</option>
                                {
                                    specialtyData.map((item,index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    }
                                    )
                                }
                            </select>
                        </div>
                    </div>    
                </div>
                <div className="col-2">
                <div className="ProfileDoctor__info">
                        <div className="ProfileDoctor__info__select_specialty">
                            <select className="form-control"
                            name="position"
                            onChange={handleChangeInput}
                            value={position}
                            >
                                <option value="0">Chọn vị trí</option>
                                {
                                    positionData.map((item,index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>{item.valueVi}</option>
                                        )
                                    }
                                    )
                                }
                            </select>
                        </div>
                    </div>  
                </div>
                <div className="col-2">
                    <div className="ProfileDoctor__info__lastName">
                        <div className="cost"
                        
                        >
                                <input type="text" className="form-control" placeholder="Giá tiền" 
                                name="cost"
                                onChange={handleChangeInput}
                                value={cost}
                                />
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="ProfileDoctor__info__lastName">
                        <div className="cost">
                        <select className="form-control"
                        onChange={handleChangeInput}
                        name="province"
                        value={province}
                        >
                                <option value="0">Chọn vị trí</option>
                                {
                                    provinceData.map((item,index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>{item.valueVi}</option>
                                        )
                                    }
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="ProfileDoctor__info__lastName">
                        <div className="cost">
                                <select className="form-control"
                                onChange={handleChangeInput}
                                name="payment"
                                value={payment}
                                >
                                    <option value="0">Chọn Phương Thức Thanh Toán</option>
                                    {
                                        paymentData.map((item,index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{item.valueVi}</option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                                    

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <label className="ProfileDoctor__info__name-clinic">Ten Phong Kham</label>
                    <input type="text" className="form-control" placeholder="Tên phòng khám" 
                    onChange={handleChangeInput}
                    name="nameClinic"
                    value={nameClinic}
                    />
                </div>
                <div className="col-6">
                    <label className="ProfileDoctor__info__name-clinic">Dia chi Phong Kham</label>
                    <input type="text" className="form-control" placeholder="Địa chỉ phòng khám" 
                    onChange={handleChangeInput}
                    name="addressClinic"
                    value={addressClinic}
                    />
                </div>
                
            </div>
            <div className="row">
                <div className="col-10">
                    <label className="ProfileDoctor__info__name-clinic">Mo ta Phong Kham</label>
                    <textarea className="form-control" rows="5" placeholder="Mô tả phòng khám"
                    onChange={handleChangeInput}
                    name="description"
                    value={description}
                    ></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <label className="ProfileDoctor__info__name-clinic">Chi tiet</label>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange}
                    value={contentMarkdown}
                    
                    />

                </div>
            </div>
            <input type="submit" className="btn btn-primary" value="Lưu"
            onClick={handleSubmit}
            />
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
            </div> 
        </>
    );
}
export default ProfileDoctor;