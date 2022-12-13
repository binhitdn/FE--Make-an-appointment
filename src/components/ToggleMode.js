import './ToggleMode.css';
import React, { useState, useEffect } from 'react'
// import {useSelector,useDispatch } from 'react-redux';

const ToggleMode = () => {
    const [theme, setTheme] = useState('light');
    // const dispatch = useDispatch();

   
    let handChangeTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
        } else {
            setTheme('light');
            document.getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", "light");
            localStorage.setItem("data-theme", "light");
        }
    }
    // useEffect(() => {
    //     let theme = localStorage.getItem('data-theme');
    //     if (theme === 'dark') {
    //         setDarkMode(true);
    //         document
    //     .getElementsByTagName("HTML")[0]
    //     .setAttribute("data-theme", "dark");
    //     localStorage.setItem("data-theme", "dark");
    //     } else {
    //         setDarkMode(false);
    //         document
    //     .getElementsByTagName("HTML")[0]
    //     .setAttribute("data-theme", "dark");
    //     localStorage.setItem("data-theme", "dark");
    //     }
        
    //   },[]);

    //   useEffect(() => {
        

    //     if (darkMode === true) {
    //         document
    //     .getElementsByTagName("HTML")[0]
    //     .setAttribute("data-theme", "dark");
    //     localStorage.setItem("data-theme", "dark");
    //     } else {
    //         document
    //     .getElementsByTagName("HTML")[0]
    //     .setAttribute("data-theme", "light");
    //     localStorage.setItem("data-theme", "light");
    //     }
    //     },[darkMode]);
    useEffect(() => {
        document.getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", "light");
        let theme = localStorage.getItem('data-theme');
        if (!theme) {
            document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        setTheme('light');
        } else if (theme === 'dark') {
            setTheme('dark');
            
            document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
        }
    },[])



    return (
        <>
            <label class="content">
            
	                <input type="checkbox" style={{display:"none"}} 
    checked= {
        theme === 'dark' ? true : false
    } 
        
                     ></input>
	                <div class="toggle" 
    // onClick={handChangeTheme}
                    >
		            <div class="btn btn-mode"
    onClick={handChangeTheme}
                    >
             { theme === 'light' ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i> }
               
               
            
            
                    </div>
	                </div>
	    </label>
        </>
    )
}

export default ToggleMode
