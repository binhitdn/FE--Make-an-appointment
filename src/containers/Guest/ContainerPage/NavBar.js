import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken } from "../../../utils/AuthToken";
import "./css/NavBar.scss";
import {handleAuth } from "../../../Auth/index"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import SwitchLanguage from "../../../components/SwitchLanguage";
import ToggleMode from "../../../components/ToggleMode";
import { getUserByIdApi } from "../../../services/userService";
import { useRef } from "react";

function NavBar(props) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { author, setAuthor, loading,setLoading,account,setAccount,specialty,doctor,handBook,lang} = useContext(AuthToken);
    const [email, setEmail] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [avatar, setAvatar] = useState("https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [search, setSearch] = useState("");
    const [searchTitle, setSearchTitle] = useState("Tìm chuyên Khoa");
    const [searchIcon, setSearchIcon] = useState("fa-duotone fa-flask");
    const [specialityResult, setSpecialityResult] = useState([]);
    const [doctorResult, setDoctorResult] = useState([]);
    const [handBookResult, setHandBookResult] = useState([]);





    let handleChangeSearch = () => {
        
    };
    
    let menuRef = useRef();
    

    
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
    let getDataSearch = () => {
       
        if (search) {
            let specialityResult = specialty.filter((item) => {
                // return item.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
                return removeAccents(item.name).toLowerCase().indexOf(removeAccents(search.toLowerCase())) != -1;
            } );
            let doctorResult = doctor.filter((item) => {
                // return (item.userData.lastName +" "+ item.userData.firstName).toLowerCase().indexOf(search.toLowerCase()) != -1;
                return removeAccents(item.userData.lastName +" "+ item.userData.firstName).toLowerCase().indexOf(removeAccents(search.toLowerCase())) != -1;
            });
            let handBookResult = handBook.filter((item) => {
                // return item.title.toLowerCase().indexOf(search.toLowerCase()) != -1;
                return removeAccents(item.title).toLowerCase().indexOf(removeAccents(search.toLowerCase())) != -1;
            }
            
            );
            setSpecialityResult(specialityResult.length > 3 ? specialityResult.slice(0, 3) : specialityResult);
            setDoctorResult(doctorResult.length > 3 ? doctorResult.slice(0, 3) : doctorResult);
            setHandBookResult(handBookResult.length > 3 ? handBookResult.slice(0, 3) : handBookResult);
            console.log("specialityResult: ", specialityResult);
            console.log("doctorResult: ", doctorResult);
            console.log("handBookResult: ", handBookResult);
        }
    }
    useEffect(() => {
        getDataSearch();
    }, [search]);
    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setSearch("");
                setIsMenuOpen(false);
                
                }
                });
                return () => {
                document.removeEventListener("mousedown", (e) => {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                setSearch("");
                setIsMenuOpen(false);
                }
                });
                };
                });
  useEffect(() => {
    setAvatar(account.image ? account.image : "https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png");
    setFirstName(account.firstName);
    setLastName(account.lastName);
    setEmail(account.email);
    }, [account]);
    useEffect(() => {
        let i = 0;
        setInterval(() => {
            
            let a = [{
                vi: "Tìm chuyên Khoa",
                en: "Find Specialty",
                ja: "専門科を探す"
            },{
                vi: "Tìm bác sĩ",
                en: "Find Doctor",
                ja: "医者を探す"
            }, {
                vi: "Tìm cẩm nang",
                en: "Find Handbook",
                ja: "ハンドブックを探す"
            }
        ];
            let icon = ["fa-duotone fa-flask", "fa-solid fa-user-doctor", "fa-solid fa-newspaper"];
            let b = a[i];
            let c = icon[i];
            i++;
            if (i == a.length) {
                i = 0;
            }
            
            setSearchTitle(b);
            setSearchIcon(c);
        }, 3000);
    }, []);
            

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
    let handleMenuOpenMobile = () => {
        props.handleMenuOpenMobile();
    }
    let removeAccents = (str) =>{
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');  
}
      
    return (
        <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            {/* <i className="fa fa-bars logo" ></i> */}

                            <div className="header-logo" 
                            onClick={() => {
                                navigate('/');
                            }}
                                
                            >
                                
                            </div>
                            <div className="menu-mobile"
                            onClick={() => handleMenuOpenMobile()}
                            >
                                <i className="fa fa-bars icon-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
                                {/* <div className={isMenuOpen ? "menu-mobile-content" : "menu-mobile-content hide"}>
                                    
                                </div> */}
                            </div>

                        </div>
                        <div className="center-content">
                            <div className="search">
                            <div className="special-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder={
                            
                            searchTitle[lang]
                        } 
                        onChange={
                            (e) => {
                                setSearch(e.target.value);
                            }

                            
                        }
                        
                        />
                        <div className="search-icon">
                            <i 
                            className={searchIcon}
                            >

                            </i>
                        </div>
                </div>
                            </div>
                            {
                                search && 
                                <div className="menu-search"
                                ref={menuRef}
                                >
                                <div className="menu-search-header">
                                    <div className="menu-search-header-title">
                                        <i className="fa fa-search"></i>

                                        {" "}
                                       {
                                        specialityResult.length > 0 || doctorResult.length > 0 || handBookResult.length > 0 ?    "Kết quả cho từ khóa: " + search : "Không có kết quả"
                                       }
                                    </div>
                                </div>
                                <div className="menu-search-content">
                                    {
                                        specialityResult.length > 0 && search &&
                                        <div className="menu-search-content-special">
                                        <div className="menu-search-content-special-title">
                                            <p>Chuyên khoa</p>
                                            <Link to={`/specialty`} className="menu-search-content-special-title-link">Xem tất cả</Link>
                                        </div>
                                        {
                                            specialityResult && specialityResult.map((item, index) => {
                                                return (
                                                    <div className="menu-search-content-special-item"
                                                    
                                                    onClick={() => {
                                                        
                                                        setSearch("");
                                                        window.location.href=`/specialty/${item.id}`;
                                                    }}
                                                    >
                                            
                                                <div className="menu-search-content-special-item-content">
                                                    <div className="menu-search-content-special-item-content-left">
                                                        <div className="menu-search-content-special-item-content-left-avatar"
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                            
        

                                                        }}
                                                        ></div>
                                                    </div>
                                                    <div className="menu-search-content-special-item-content-right">
                                                        <div className="menu-search-content-special-item-content-right-title">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
    
                                                )
    
    
                                            }) 
                                        }
                                    
                                    
                                    </div>
                                    }
                                    {
                                        doctorResult.length > 0 && search &&
                                        <div className="menu-search-content-special">
                                        <div className="menu-search-content-special-title">
                                        <p>Bác sĩ</p>
                                            <Link to={`/doctor`} className="menu-search-content-special-title-link">Xem tất cả</Link>
                                        </div>
                                        {
                                            doctorResult && doctorResult.map((item, index) => {
                                                return (
                                                    <div className="menu-search-content-special-item"
                                                    to={`/doctor/${item.id}`}
                                                    onClick={() => {
                                                        
                                                        setSearch("");
                                                        window.location.href=`/doctor/${item.id}`;
                                                    }}
                                                    >
                                            
                                                <div className="menu-search-content-special-item-content">
                                                    <div className="menu-search-content-special-item-content-left">
                                                        <div className="menu-search-content-special-item-content-left-avatar"
                                                        style={{
                                                            backgroundImage: `url(${item.userData.image})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                            
        

                                                        }}
                                                        ></div>
                                                    </div>
                                                    <div className="menu-search-content-special-item-content-right">
                                                        <div className="menu-search-content-special-item-content-right-title">
                                                            {item.userData.lastName}  {item.userData.firstName}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            
    
                                                )
    
    
                                            }) 
                                        }
                                    
                                    
                                    </div>
                                    }
                                    {
                                        handBookResult.length > 0 && search &&
                                        <div className="menu-search-content-special">
                                        <div className="menu-search-content-special-title">
                                        <p>Cẩm nang</p>
                                            <Link to={`/handbook`} className="menu-search-content-special-title-link">Xem tất cả</Link>
                                        </div>
                                        {
                                            handBookResult && handBookResult.map((item, index) => {
                                                return (
                                                    <div className="menu-search-content-special-item"
                                                    to={`/handbook/${item.id}`}
                                                    onClick={() => {
                                                        
                                                        setSearch("");
                                                        window.location.href=`/handbook/${item.id}`;
                                                    }}
                                                    >
                                            
                                                <div className="menu-search-content-special-item-content">
                                                    <div className="menu-search-content-special-item-content-left">
                                                        <div className="menu-search-content-special-item-content-left-avatar"
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                            
        

                                                        }}
                                                        ></div>
                                                    </div>
                                                    <div className="menu-search-content-special-item-content-right">
                                                        <div className="menu-search-content-special-item-content-right-title">
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
    
                                                )
    
    
                                            }) 
                                        }
                                    
                                    
                                    </div>
                                    }
                                </div>

                                
                            </div>
                            }
                            </div>
                            <ToggleMode/>

                        </div>
                        <div className="right-content">
                        <div className="notification">
                                <i className="fa fa-bell notification-icon">
                                    {
                                        handleAuth().id && <div className="notification-number">
                                        4
                                    </div>
                                    }
                                </i>
                                <div className="notification-content">
                                    <div className="notification-content-header">
                                        <div className="notification-content-header-title">
                                            Thông báo
                                        </div>
                                    </div>

                                    <div className="notification-item">
                                        <div className="notification-item-content">
                                            <div className="notification-item-content-left">
                                                <div className="notification-item-content-left-avatar"
                                                style={{
                                                    backgroundImage: `url("https://data.thoitiet.vn/weather/2021/10/13/thoi-tiet-thanh-pho-%20Ha-Noi.jpg")`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                                >
                                                    
                                                </div>
                                            
                                            </div>
                                            <div className="notification-item-content-right">
                                                <div className="notification-item-content-right-content">
                                                    Đã đăng ký thành công khóa học
                                                </div>
                                                <div className="notification-item-content-right-time">
                                                    1 phút trước
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* <div className="support">
                                <i className="fa fa-question-circle"></i> Hỗ trợ
                            </div> */}
                            {/* <p className="lang-vi lang active">VN</p>
                            <p className="lang-en lang" >EN</p>
                        <p className="lang-jp lang" >日本語</p> */}
                        <SwitchLanguage />

                        {/* <ToggleMode/> */}
                        
                        
                       {
                            !(author==3) &&  <Link to="/login"
                            className="login-button"
                           >
                            <div>
                            {
                                lang == "vi" && "Đăng nhập"
                            }
                            {
                                lang == "en" && "Login"
                            }
                            {
                                lang == "ja" && "ログイン"
                            }
                            </div>
                           </Link>
                       }
                       
                        {
                            (author==3) && <div className="information"
                            ref={menuRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                               
                                <div
                                style={{display: "flex", alignItems: "center"}}
                                >
                                
                                <span className="user-name">  Xin chào 
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
                                    <i className="fa-solid fa-crown"
                                    style={{
                                        fontSize: '20px',
                                        display: 'block',
                                        color: 'rgb(251 255 0)',
                                        
                                    }}
                                    ></i>
                                    </div>
                                                </div>

                                                <div className="name">{lastName + " "+ firstName}</div> 
                                                <div className="email">Email : {email}</div>
                                            </div>
                                            <div className="user-menu-item-2">
                                                
                                                <Link className=" btn-menu-nav"
                                                to="/main-booking"
                                                >Thông tin đặt lịch</Link>
                                                <Link className=" btn-menu-nav"
                                                to="/profile"
                                                >Thông tin cá nhân</Link>
                                                
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