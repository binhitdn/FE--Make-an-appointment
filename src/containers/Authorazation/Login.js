import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { handleLoginApi } from "../../services/userService";
import { AuthToken } from "../../utils/AuthToken";
import { handleAuth } from "./../../Auth/index";
import "./scss/Login.scss";
import axios from "axios";
import { isBuffer } from "lodash";
import ModalLoading from "../../components/ModalLoading";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const { author, setAuthor, setAccount } = useContext(AuthToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let handleOnChangeInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  let handleClickLogin = async () => {
    setLoading(true);

    // nếu email ko đúng định dạng
    if (!email.includes("@")) {
      toast.error("Email không đúng định dạng");
      setLoading(false);
      return;
    } else {
      let api;
      (async () => {
        api = await axios.post("http://localhost:8080/api/login", {
          email: email,
          password: password,
        });
        console.log("api: ", api.data);
      })().then(() => {
        console.log("api: ", api.data);
        setLoading(false);
        if (api.data.errCode == 0) {
          toast.success("Đăng nhập thành công");
          if (api.data.message == "Login success") {
            setAccount(api.data.user);
            window.location.href = "/";
            Cookies.set("tokenAuth", api.data.token, { expires: 7 });
          }

          if (handleAuth().roleId == "1") {
            setAuthor("1");
          } else if (handleAuth().roleId == "2") {
            setAuthor("2");
          } else if (handleAuth().roleId == "3") {
            // navigate('/');

            setAuthor("3");
          }
        } else if (api.data.errCode == 1) {
          toast.error("Email không tồn tại");
        } else if (api.data.errCode == 2) {
          toast.error("Email chưa được kích hoạt");
        } else if (api.data.errCode == 3) {
          toast.error("Mật khẩu không chính xác");
        } else {
          toast.error("Lỗi không xác định");
        }
      });
    }
  };

  return (
    <div className="background-login">
      <div className="login-title">
        <h1>HappyCare</h1>
        <h2>HỆ THỐNG CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h2>
      </div>

      <div className="form-login">
        <form>
          <div className="title-login">ĐĂNG NHẬP</div>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              name="email"
              onChange={handleOnChangeInput}
            />
            <label className="form-label" htmlFor="form2Example1">
              Địa chỉ email
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              onChange={handleOnChangeInput}
            />
            <label className="form-label" htmlFor="form2Example2">
              Mật khẩu
            </label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Lưu đăng nhập
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Quên mật khẩu?</a>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-warning btn-login btn-block mb-4"
            onClick={handleClickLogin}
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Chưa đăng ký tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
            <p>hoặc đăng kí với :</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
      {loading && <ModalLoading />}
    </div>
  );
}
export default Login;
