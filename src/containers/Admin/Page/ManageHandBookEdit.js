import MarkdownIt from "markdown-it";
import "./scss/ManageHandBook.scss"
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import { handCreateHandbook, handGetAllHandbook, handleEditHandbook } from "../../../services/handbookService";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ModalLoading from "../../../components/ModalLoading";
import Select from 'react-select';

function  ManageHandBookEdit() {
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [photoPreView, setPhotoPreView] = useState("");
    const [description, setDescription] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const[handbooks,setHandbooks]=useState([]);
    const[handbookSelected,setHandbookSelected]=useState(null);
    const[loading,setLoading]=useState(false);
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    useEffect(() => {
       (async () => {
        let fetchData = await handGetAllHandbook();
       
        setHandbooks(fetchData.data);
         })()
    },[])
    let handleChangeInput = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        if (name === "title") {
            setTitle(value);
        }
        if (name === "description") {
            setDescription(value);
        } 
        

    }

    
    let handleSave = async () => {
        if(validate()){
            let data ={
                id: handbookSelected,
                description: description,
                photo: photo,
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                image: photo
            }
            let fetchData = await handleEditHandbook(data);
            toast.success("Sửa thành công");
            
            
        }
    }
    let validate = () => {
        if (title === "") {
            toast.error("Tiêu đề không được để trống");
            return false;
        }
        if (description === "") {
            toast.error("Mô tả không được để trống");
            return false;
        }
        if (photo === "") {
            toast.error("Ảnh không được để trống");
            return false;
        }
        if (contentMarkdown === "") {
            toast.error("Nội dung không được để trống");
            return false;
        }
        return true;
    }
    
    let handleFileUpload = async(e) => {
        let uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        
        let a;
        (async () => {
    
            try {
                setLoading(true);
                setPhoto("https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif");
                a= await axios.post("/cloudinary-upload", uploadData)
            } catch (error) {
                console.log(error);
            }
        })().then(() => {
            
            setLoading(false);
           
    
            setPhoto(a.secure_url);
        })
    
      }
      let handBookSelected = (id) => {
        let handbook = handbooks.find((handbook) => handbook.id === id);
        setTitle(handbook.title);
        setDescription(handbook.description);
        setPhoto(handbook.image);
        setContentHTML(handbook.contentHTML);
        setContentMarkdown(handbook.contentMarkdown);
        }
    return (
       <div className="manage-handbook">
        



        <div className="form-control">
            <div className="row">
                <div className="col-6">
                    <label>Tên Bài Viết</label>
                    <Select options={
                        handbooks.map((handbook) => {
                            return {
                                value: handbook.id,
                                label: handbook.title

                            }
                        })
                    } onChange={(e) => {
                        console.log(e);
                        setHandbookSelected(e.value);
                        handBookSelected(e.value);
                    }  }/>

                    
                </div>
                <div className="col-6">
                    <label>Ảnh Bài Viết</label>
                    <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              className="form-control"
            />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label>Mô tả</label>
                    <textarea type="text" placeholder="Nhập mô tả" className="form-control" name="description"
                    onChange={handleChangeInput}
                    cols="30" rows="6"
                    value={description}
                    ></textarea>
                    
                </div>
                <div className="col-6">
                    <label>Ảnh Preview</label>
                    <div className="preview-photo" name="photoPreview"
                    style={{backgroundImage: `url(${photo})`}}
                    >


                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label>Nội Dung</label>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange}
                        value={contentMarkdown} 
                        />       

                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <input type="submit" value="Lưu" className="btn btn-primary" onClick={handleSave} />
                </div>
            </div>
        </div>
        {
                loading && <ModalLoading/>
            }
            
       </div>
    );
}
export default ManageHandBookEdit;