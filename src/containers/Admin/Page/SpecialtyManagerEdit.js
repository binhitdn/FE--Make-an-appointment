import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { handleEditSpecialityApi, handleGetAllSpecialityApi } from '../../../services/specialtyService';



function SpecialtyManagerEdit() {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [nameSpecialty, setNameSpecialty] = useState('');
    const [avatar, setAvatar] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [description, setDescription] = useState('');
    


    let handleGetDataSpecialty =async () => {
        let res = await handleGetAllSpecialityApi();
        setSpecialties(res.specialities);
        console.log(res.specialities);
        
        
    }

    useEffect(() => {
        handleGetDataSpecialty();
    },[])
    
    useEffect(() => {
        console.log('selectedSpecialty: ', selectedSpecialty);
        if (selectedSpecialty) {
            
        }
    }, [selectedSpecialty])
    




    

    
        
function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
}


let handleSaveSpeciality = async() => {
  let data = {
        avatar: avatar,
        contentMarkdown: contentMarkdown,
        contentHTML: contentHTML,
        description: description,
        id: selectedSpecialty,
  }

  let res = await handleEditSpecialityApi(data);
    console.log(res);
    toast.success("Cập nhật thành công");


}
let validate = () => {
    if (nameSpecialty === '') {
        toast.error("Tên chuyên khoa không được để trống");
        return false;
    }
    if (avatar === '') {
        toast.error("Ảnh đại diện không được để trống");
        return false;
    }
    if (contentMarkdown === '') {
        toast.error("Nội dung không được để trống");
        return false;
    }
    return true;
}
let handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === 'nameSpecialty') {
        setNameSpecialty(value);
    } else if (name === 'contentMarkdown') {
        setContentMarkdown(value);
    } else if (name === 'contentHTML') {
        setContentHTML(value);
    } else if (name === 'avatar') {
        setAvatar(value);
    
    } else if (name === 'isOpen') {
        setIsOpen(value);
    } else if (name === 'description') {
        setDescription(value);
    }
}
        

let handleChange = (selectedDoctor) => {
    setSelectedSpecialty(selectedDoctor);
    console.log(`Option selected:`, selectedDoctor);
    let specialty = specialties.find(specialty => specialty.id == selectedDoctor.value);
    
    console.log('specialty: ', specialty);
    setNameSpecialty(specialty.name);
    setContentHTML(specialty.contentHTML);
    setContentMarkdown(specialty.contentMarkdown);
    setAvatar(specialty.image);
   
    

    
};

    return (
    <div className="manage-doctor-container">
                <div className="manage-doctor-container__header text-center">
                    <h3>Sửa chuyên khoa</h3>
                </div>
                <div className="row">
                    <div className="col-6">
                    <label>Tên chuyên khoa</label>
                    <Select
                                value={selectedSpecialty}
                                onChange={handleChange}
                                options={
                                   specialties.map(

                                        (specialty, index) => {
                                            let option = {
                                                value: specialty.id,
                                                label: specialty.name
                                            }
                                            return option;
                                        }
                                    )
                                }
                            />
                    </div>
                    <div className="col-6">
                    <div className="col-6">
                        <label>Chọn ảnh</label>
                                <input type="file" className="form-control" id="up-photo" 
                                    onChange={(e) => {
                                        
                                    }}
                                    name="avatar"
                                    
                                   
                                ></input>
                                {/* <div className="upload"><label htmlFor="up-photo" className="upload-text"> <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i> Tải Ảnh</label></div> */}
                                <div className="preview-image"
                                    style={{ 
                                        backgroundImage: `url(${avatar})` ,
                                     }}
                                    onClick={() => {
                                        setIsOpen(true)
                                    }
                                    }
                                ></div>
                    </div>
                    </div>

                </div>
                <div className="row">
                <div className="col-6">
                </div>
                <div  className="col-6">
                    <label>Xem trước ảnh</label>
                    <div className="preview-image"
                    

                    style={{ backgroundImage: `url(${avatar})` ,height:"150px" ,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}

                    ></div>
                    


               



              
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange}
                value={contentMarkdown} 
                />       
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                <button className="btn btn-primary" 
                onClick={
                    handleSaveSpeciality
                }
                >Lưu</button>
                {isOpen && (
                    <Lightbox

                        mainSrc={avatar}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                )}
                </div>
            </div>
        </div>


    );
}
export default SpecialtyManagerEdit;