import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthToken } from "../utils/AuthToken";
import "./SwitchLanguage.scss"

function SwitchLanguage() {
  const [language, setLanguage] = useState(0);
  const {lang, setLang} = useContext(AuthToken)
  

  let languages = [
    {
      id: 1,
      code: 'ja',
      en: 'Japanese',
      vi: 'Tiếng Nhật',
      ja: '日本語',

      icon: 'fi-jp'
    },
    {
      id: 2,
      code: 'vi',
     
      icon: 'fi-vn',
      vi: 'Tiếng Việt',
      en: 'Vietnamese',
      ja: 'ベトナム語',
    },
    {
      id: 3,
      code: 'en',
      icon: 'fi-us',
      vi: 'Tiếng Anh(Mỹ)',
      en: 'English(US)',
      ja: '英語',
    },
    
  ];
  let changeLanguage = (index) => {
    setLanguage(index);
    localStorage.setItem('language', languages[index].code);
    setLang(languages[index].code)
      
  }
  useEffect(() => {
    let language = localStorage.getItem('language');
    if (language) {
      let index = languages.findIndex(item => item.code === language);
      if (index !== -1) {
        setLanguage(index);
        setLang(languages[index].code)
      }
    } else {
      localStorage.setItem('language', languages[0].code);
    }
  }, []);
  
 
    return (
      <div className="dropdown">
      <a className="btn dropdown-toggle"  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <span className={"fi " + languages[language].icon}></span>
          <span className="ms-2 lang-text">
            {languages[language][lang]}
          </span>
      </a>
  
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {languages.map((item, index) => {
          return (
            <li className="dropdown-menu-item" key={index}>
              <a className="dropdown-item" href="#" onClick={
                () => {
                  
                  changeLanguage(index);
                }
              }>
                <span className={"fi " + item.icon}></span>
                <span className="ms-2 lang-text"
                >
                  {item[lang]}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
       
      
      
  </div>
    )
}
export default SwitchLanguage;