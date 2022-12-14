import React, { useState, useEffect } from 'react'
import './css/SideBar.scss';
import { Link } from 'react-router-dom';
import ToggleMode from '../../../components/ToggleMode';
import { useContext } from 'react';
import { AuthToken } from '../../../utils/AuthToken';


const SideBar = () => {
    const [activeId, setActiveId] = useState(1);
    const [language, setLanguage] = useState('vi');
    const {lang} = useContext(AuthToken)
    const menuItems = [
        {
            id: 1,
            en: "Home",
            vi: "Trang chủ",
            ja: "ホーム",
            link: "/",
            icon: "fas fa-home"
        },
        
        {
            id: 2,
            en: "Specialty",
            vi: "Chuyên khoa",
            ja: "専門",
            link: "/specialty",
            icon: "fa-duotone fa-flask"
        },
        {
            id: 3,
            en: "Doctor",
            vi: "Bác sĩ",
            ja: "医者",
            link: "/doctor",
            icon: "fa-solid fa-user-doctor"
        },
        {
            id: 5,
            en: "HandBook",
            vi: "Cẩm nang",
            ja: "ハンドブック",
            link: "/handbook",
            icon: "fa-solid fa-newspaper"
        },
        // {
        //     id: 4,
        //     en: "Health Facilities",
        //     vi: "Cơ sở y tế",
        //     ja: "医療施設",
        //     link: "/clinic",
        //     icon: "fa-solid fa-house-chimney-medical"
        // },
        // {
        //     id: 6,
        //     en: "Community",
        //     vi: "Cộng đồng",
        //     ja: "コミュニティ",
        //     link: "/community",
        //     icon: "fa-solid fa-earth-americas"
        // }
    ]

    return (
        
            <div className="side-bars">
                <ul className="side-bar-list">
                    { menuItems &&
                        menuItems.map((item, index) => {
                            return (
                                <li className="side-bar-item"
                                    key={index}
                                    onClick={
                                        () => {
                                            
                                            setActiveId(item.id);
                                           
                                        }
                                    }
                                >
                                    <Link className={
                                        "side-bar-link" + (activeId === item.id ? " active" : "")
                                    }
                                        onClick={(e) => {
                                            
                                            // setActiveId(item.id);
                                            // console.log(item);
                                        }}
                                        to={item.link}
                                    >
                                        <i className={item.icon + " menu-icon"}></i>
                                        <span className="side-bar-text">
                                            {item[lang]}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                   
                   <div>
                   
                    
                </div>
                </ul>
                
                
                <div class="toggle-mode">
                    <ToggleMode />
                </div>
                
           
        </div>
    )
}

export default SideBar
