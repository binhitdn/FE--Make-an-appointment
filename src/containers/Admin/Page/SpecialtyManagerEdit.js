import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { handleGetAllSpecialityApi } from '../../../services/specialtyService';



function SpecialtyManagerEdit() {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [nameSpecialty, setNameSpecialty] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState([]);


    let handleGetDataSpecialty =async () => {
        let res = await handleGetAllSpecialityApi();
        setSpecialties(res.specialities);
        console.log(res.specialities);
        
        
    }

    useEffect(() => {
        handleGetDataSpecialty();
    },[])
    useEffect(() => {
        specialties.map(
            (specialty, index) => {
                let option = {
                    value: specialty.id,
                    label: specialty.name
                }
                options.push(option);
                    
            }
        );
        console.log(options);
    },[specialties])
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
    console.log('save: ', {
        name: nameSpecialty,
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        avatar: avatar,
        isOpen: isOpen,
        description: description
    });

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
    } else if (name === 'avatarPreview') {
        setAvatarPreview(value);
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
    
    setNameSpecialty(specialty.name);
    setContentHTML(specialty.contentHTML);
    setContentMarkdown(specialty.contentMarkdown);
    setAvatar(specialty.image);
    setIsOpen(specialty.isOpen);
    setDescription(specialty.description);

    
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
                                    options
                                }
                            />
                    </div>
                    <div className="col-6">
                    <div className="col-6">
                        <label>Chọn ảnh</label>
                                <input type="file" className="form-control" id="up-photo" hidden
                                    onChange={(e) => {
                                        
                                    }}
                                    name="avatar"
                                   
                                ></input>
                                <div className="upload"><label htmlFor="up-photo" className="upload-text"> <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i> Tải Ảnh</label></div>
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
                    <label>Mô tả</label>
                    <textarea className="form-control" rows="6" onChange={(e)=>{handleChangeInput(e)}} name="description" value={description}></textarea>
                    </div>
                <div  className="col-6">
                    <label>Xem trước ảnh</label>
                    <div className="preview-image"
                    

                    style={{ backgroundImage: `url(${avatarPreview})` ,height:"150px" ,
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

                        mainSrc={avatarPreview}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                )}
                </div>
            </div>
        </div>


    );
}
export default SpecialtyManagerEdit;