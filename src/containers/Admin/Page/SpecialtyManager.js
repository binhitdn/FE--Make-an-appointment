import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import {handleCreateSpecialityApi} from '../../../services/specialtyService';
import axios from "../../../axios";
import ModalLoading from '../../../components/ModalLoading';



function SpecialtyManager() {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [nameSpecialty, setNameSpecialty] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

// Finish!
function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
}

let handleSaveSpeciality = async() => {
    if(validate()) {
        let res = await handleCreateSpecialityApi({
            name: nameSpecialty,
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            avatar: avatar,
            
        })
        console.log('res: ', res);
        toast.success('Tạo chuyên khoa thành công');
        setNameSpecialty('');
        setAvatar('');
        setAvatarPreview('');
        setContentMarkdown('');
        setContentHTML('');
        
        
    }
   

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
    } else if(contentHTML === '') {
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
    } 
}
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
  
        
    return (
    <div className="manage-doctor-container">
                <div className="manage-doctor-container__header text-center">
                    <h3>Thêm chuyên khoa</h3>
                </div>
                <div className="row">
                    <div className="col-6">
                    <label>Tên chuyên khoa</label>
                        <input type="text" className="form-control" onChange={(e)=>{handleChangeInput(e)}} name="nameSpecialty" value={nameSpecialty} ></input>
                    </div>
                    <div className="col-6">
                    <div className="col-6">
                        <label>Chọn ảnh</label>
                        <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
                className="form-control"  
                
                
            />
                                {/* <div className="upload"><label htmlFor="up-photo" className="upload-text"> <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i> Tải Ảnh</label></div> */}
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${avatarPreview})` }}
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

                        mainSrc={avatarPreview}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                )}
                </div>
            </div>
            {
                loading && <ModalLoading/>
            }
        </div>


    );
}
export default SpecialtyManager;