import MarkdownIt from "markdown-it";
import "./scss/ManageHandBook.scss";
import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../../utils/CommonUtils";
import { handCreateHandbook } from "../../../services/handbookService";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ModalLoading from "../../../components/ModalLoading";

function HandBook() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreView, setPhotoPreView] = useState("");
  const [description, setDescription] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }
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
  };

  let handleSave = async () => {
    if (validate()) {
      let data = {
        title: title,
        description: description,
        photo: photo,
        contentMarkdown: contentMarkdown,
        contentHTML: contentHTML,
        image: photo,
      };
      let result = await handCreateHandbook(data);
      toast.success("Thêm mới thành công");
      setTitle("");
      setDescription("");
      setPhoto("");
      setContentHTML("");
      setContentMarkdown("");
      setPhoto("");
    }
  };
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
  };
  let handleFileUpload = async (e) => {
    let uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");

    let a;
    (async () => {
      try {
        setLoading(true);
        setPhoto(
          "https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif"
        );
        a = await axios.post("/cloudinary-upload", uploadData);
      } catch (error) {
        console.log(error);
      }
    })().then(() => {
      setLoading(false);

      setPhoto(a.secure_url);
    });
  };
  return (
    <div className="manage-handbook">
      <div className="form-control">
        <div className="row">
          <div className="col-6">
            <label>Tên Bài Viết</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeInput}
              className="form-control"
              placeholder="Nhập tên bài viết"
            />
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
            <textarea
              type="text"
              placeholder="Nhập mô tả"
              className="form-control"
              name="description"
              onChange={handleChangeInput}
              cols="30"
              rows="6"
              value={description}
            ></textarea>
          </div>
          <div className="col-6">
            <label>Ảnh Preview</label>
            <div
              className="preview-photo"
              name="photoPreview"
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Nội Dung</label>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={contentMarkdown}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <input
              type="submit"
              value="Lưu"
              className="btn btn-primary"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
      {loading && <ModalLoading />}
    </div>
  );
}
export default HandBook;
