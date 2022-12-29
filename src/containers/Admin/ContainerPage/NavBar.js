// import { Link, useNavigate } from "react-router-dom";
// import "./scss/NavBar.scss";
// import Cookies from 'js-cookie';
// import {AuthToken} from '../../../utils/AuthToken';
// import { useContext } from "react";
// import {handleAuth } from "../../../Auth/index"
// import { useState } from "react";


// function NavBar() {
//     const { author, setAuthor } = useContext(AuthToken);
//     const[user,setUser]=useState(null);

    


//     const navigate = useNavigate();
//     let handleClickLogout = () => {
//         Cookies.remove('tokenAuth');
//         setAuthor("guest");
//         navigate('/');
//     }
//     return (
//         <div className="navbar">
//         <div className="navbar__logo">
            
//         </div>
//         <div className="navbar__menu">
//                 <div>
//                     Xin chào, {
//                         handleAuth().email
//                     }
//                 </div>
//                 &nbsp;
//                 <div onClick={handleClickLogout}>
//                               Đăng xuất  <i className="fas fa-sign-out-alt"></i>
//                 </div>
//         </div>
//         </div>
//     );
// }
// export default NavBar;
// import { Link, useNavigate } from "react-router-dom";
// import "./scss/NavBar.scss";
// import Cookies from 'js-cookie';
// import {AuthToken} from '../../../utils/AuthToken';
// import { useContext } from "react";
// import {handleAuth } from "../../../Auth/index"
// import { useState } from "react";
// import { getUserByIdApi } from "../../../services/userService";
// import { useEffect } from "react";

// function NavBar() {
//     const { author, setAuthor,account,setAccount } = useContext(AuthToken);
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [avatar, setAvatar] = useState("");
//     const [role, setRole] = useState("");
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
    
//     useEffect(() => {
    
//         getUser();
//     }, [])

//     let getUser = async () => {
//         const response = await getUserByIdApi(handleAuth().id);
            
//             setName(response.users.lastName + " " + response.users.firstName);
//             setAvatar(response.users.image);
//             setRole(response.users.roleData.valueVi);
            
//     }
  

    
  
    

//     let handleClickLogout = () => {
//         Cookies.remove('tokenAuth');
//         setAuthor("guest");
//         setAccount({});
//         navigate('/');
//     }
//     return (
//         <div className="navbar">
//         <div className="navbar__logo">
            
//         </div>
//         {/* <div className="navbar__menu">
//                 <div className="navbar__avatar__user"
//                 style={{backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '30px', height: '30px', borderRadius: '50%'}}
//                 >
//                 </div>

//                 <div>
//                     {name}
//                     <b>{
//                         role
//                         }</b>
//                 </div>
//                 &nbsp;
//                 <div onClick={handleClickLogout}>
//                               Đăng xuất  <i className="fas fa-sign-out-alt"></i>
//                 </div>
                
//         </div> */}
//         <div className="navbar__menu"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//             <div
//                                 style={{display: "flex", alignItems: "center"}}
//                                 >
                                
//                                 <span className="user-name">  Xin chào 
//                                 {/* <b>{handleAuth().email}</b> */}
//                                 </span>
//                                 <div className="avatar"
//                                 style={{backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',width: '40px', height: '40px', borderRadius: '50%'}}
//                                 >
                                   

//                                 </div>
//                                 </div>
//                                 <div className="manager-info"
//                                 style={{display: isMenuOpen ? "block" : "none"}}
//                                 >
//                                     <div className="user-menu"
                                    
//                                     >
                                        
//                                             <div className="user-menu-item-2"
//                                             onClick={() => {
//                                                 navigate('/profile');
//                                             }}
//                                             style={{position: "relative"}}
//                                             >
//                                                 <div className="title">Thông tin cá nhân</div> 
//                                                 <div className="backgroud"
//                                                 style={{backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',width: '50px', height: '50px', borderRadius: '50%',position: 'relative',outline: '2px solid orange'}}
//                                                 >
//                                                      <div 
//                                     style={{position: 'absolute',bottom:'0',  fontWeight: 'bold'}}
//                                     >
//                                     <i class="fa-solid fa-crown"
//                                     style={{
//                                         fontSize: '20px',
//                                         display: 'block',
//                                         color: 'rgb(251 255 0)',
                                        
//                                     }}
//                                     ></i>
//                                     </div>
//                                                 </div>

//                                                 <div className="name">{name}</div> 
//                                                 <div className="email">Email : </div>
//                                             </div>

                                            

                                            
                                       
//                                         {/* <div className="user-menu-item">
//                                             <Link to="/profile">
//                                             <i className="fa-regular
//                                         fa-user"></i>Thông tin tài khoản
//                                             </Link>
//                                         </div> */}
//                                         {/* <div className="user-menu-item">
//                                             <Link to="/booking">
//                                             <span>Thông tin đặt lịch</span>
                                            
//                                             </Link>
//                                         </div> */}
                                        
//                                         <div className="user-menu-item-logout">
//                                         <div onClick={
//                                                 handleClickLogout
//                                             }>
//                                              <i className="fa-regular
//                                         fa-sign-out">
//                                             </i>Đăng xuất
//                                             </div>
//                                         </div>
                                        
//                                     </div>
//                                 </div>

//         </div>
//         </div>
//     );
// }
// export default NavBar;
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken } from "../../../utils/AuthToken";
// import "./css/NavBar.scss";
import {handleAuth } from "../../../Auth/index"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import SwitchLanguage from "../../../components/SwitchLanguage";
import ToggleMode from "../../../components/ToggleMode";
import { getUserByIdApi } from "../../../services/userService";

function NavBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { author, setAuthor, loading,setLoading,account,setAccount} = useContext(AuthToken);
    const [email, setEmail] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [avatar, setAvatar] = useState("https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
   
    
    

    
    // useEffect(() => {
    //     try {
    //         setEmail(handleAuth().email);
    //         setRoleId(handleAuth().roleId);
    //         setAvatar(handleAuth().avatar);
    //         getUser()
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [author]);
    // useEffect(() => {
    //     try {
    //         setEmail(handleAuth().email);
    //         setRoleId(handleAuth().roleId);
    //         setAvatar(account.avatar);
    //         getUser()
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [author]);
    // let getUser = async() => {
    //     if(handleAuth().email){
    //     setAvatar(account.image);
    //     setFirstName(account.firstName);
    //     setLastName(account.lastName);
    //     }

    // }
  useEffect(() => {
    setAvatar(account.image ? account.image : "https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
    setFirstName(account.firstName);
    setLastName(account.lastName);
    setEmail(account.email);
    }, [account]);

    



    let handleClickLogout = () => {
        setAuthor("guest");
        Cookies.remove('tokenAuth');
        setAuthor("guest");
        setAccount({});
        navigate('/');
        toast.success("Đăng xuất thành công");
        
    }
    useEffect(() => {
        console.log("account: ", account);
    }, [account]);
    return (
        <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            {/* <i className="fa fa-bars logo" ></i> */}

                          
                            
                            {/* <div className="menu-mobile">
                                <i className="fa fa-bars" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
                                <div className={isMenuOpen ? "menu-mobile-content" : "menu-mobile-content hide"}>
                                    <div className="menu-mobile-item">
                                        <Link to="/" className="menu-mobile-link">Trang chủ</Link>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                        <div className="center-content">
                        </div>
                        <div className="right-content">
                            {/* <div className="support">
                                <i className="fa fa-question-circle"></i> Hỗ trợ
                            </div> */}
                            {/* <p className="lang-vi lang active">VN</p>
                            <p className="lang-en lang" >EN</p>
                        <p className="lang-jp lang" >日本語</p> */}

                        {/* <ToggleMode/> */}
                        
                        
                       {
                            !(author==1) &&  <Link to="/login"
                            className="login-button"
                           >
                            <div>
                            Đăng nhập
                            </div>
                           </Link>
                       }
                       
                        {
                            (author==1) && <div className="information"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                               
                                <div
                                style={{display: "flex", alignItems: "center"}}
                                >
                                
                                <span className="user-name">  Người quản trị
                                {/* <b>{handleAuth().email}</b> */}
                                </span>
                                <div className="avatar"
                                style={{backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',width: '40px', height: '40px', borderRadius: '50%'}}
                                >
                                   

                                </div>
                                </div>
                                <div className="manager-info"
                                style={{display: isMenuOpen ? "block" : "none"}}
                                >
                                    <div className="user-menu">
                                        
                                            <div className="user-menu-item-2"
                                            onClick={() => {
                                                navigate('/profile');
                                            }}
                                            >
                                                <div className="title">Thông tin cá nhân</div> 
                                                <div className="backgroud"
                                                style={{backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',width: '50px', height: '50px', borderRadius: '50%',position: 'relative',outline: '2px solid orange'}}
                                                >
                                                     <div 
                                    style={{position: 'absolute',bottom:'0',  fontWeight: 'bold'}}
                                    >
                                    <i class="fa-solid fa-crown"
                                    style={{
                                        fontSize: '20px',
                                        display: 'block',
                                        color: 'rgb(251 255 0)',
                                        
                                    }}
                                    ></i>
                                    </div>
                                                </div>

                                                <div className="name"> Người quản trị </div>
                                                <div className="name">{lastName + " "+ firstName}</div> 
                                                <div className="email">Email : {email}</div>
                                            </div>

                                            

                                            
                                       
                                        {/* <div className="user-menu-item">
                                            <Link to="/profile">
                                            <i className="fa-regular
                                        fa-user"></i>Thông tin tài khoản
                                            </Link>
                                        </div> */}
                                        {/* <div className="user-menu-item">
                                            <Link to="/booking">
                                            <span>Thông tin đặt lịch</span>
                                            
                                            </Link>
                                        </div> */}
                                        
                                        <div className="user-menu-item-logout">
                                        <div onClick={
                                                handleClickLogout
                                            }>
                                             <i className="fa-regular
                                        fa-sign-out">
                                            </i>Đăng xuất
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        }
                        
                    
                            
                        </div>
                    </div>
                </div>
            </>
    );
}
export default NavBar;