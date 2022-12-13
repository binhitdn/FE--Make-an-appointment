import Admin from "./containers/Authorazation/Admin";
import Guest from "./containers/Authorazation/Guest";
import Doctor from "./containers/Authorazation/Doctor";
import Cookies from "js-cookie";
import React, {useContext} from "react";
import {AuthToken} from "./utils/AuthToken";
import {handleAuth } from "./Auth/index";
import "./style/App.scss";
import { getUserByIdApi } from "./services/userService";
import { handleGetAllSpecialityApi } from "./services/specialtyService";
import { handleGetTopDoctorApi } from "./services/doctorService";
import { handGetAllHandbook } from "./services/handbookService";
function App() {
    const [author, setAuthor] = React.useState(handleAuth().roleId ? handleAuth().roleId : "guest");
    const [loading, setLoading] = React.useState(true);
    const [account, setAccount] = React.useState({});
    const [specialty, setSpecialty] = React.useState([]);
    const [doctor, setDoctor] = React.useState([]);
    const [handBook, setHandBook] = React.useState([]);
    const [lang, setLang] = React.useState(localStorage.getItem("language") ? localStorage.getItem("language") : "ja");
    let language = localStorage.getItem('language');
        if (language) {
          console.log("Không có language");
        } else {
          localStorage.setItem('language', "ja");
          console.log("Có language");
        }

    React.useEffect(() => {
        if (handleAuth().id) {
            (async () => {
                let api = await getUserByIdApi(handleAuth().id);
                console.log("api: ", api.users);
                setAccount(api.users);
                
                
            })();
            
            
            
        }
        getData();
        


        
    }, []);
  
    let getData = async () => {
      
            let getDataSpecialty = await handleGetAllSpecialityApi();
            
            setSpecialty(getDataSpecialty.specialities);
            let getDataDoctor = await handleGetTopDoctorApi();
           
            setDoctor(getDataDoctor.data);
            let getDataHandBook = await handGetAllHandbook();
            setHandBook(getDataHandBook.data);
            

            
    };
    React.useEffect(() => {
        console.log("account: ", account);
        console.log(handleAuth())
    }, [account]);
    React.useEffect(() => {
        console.log("specialty: ", specialty);
    }, [specialty]);
    React.useEffect(() => {
        console.log("doctor: ", doctor);
    }, [doctor]);
    React.useEffect(() => {
        console.log("handBook: ", handBook);
    }, [handBook]);





    

    


    if (handleAuth().roleId === "1") {
        return (
            <div className="app-react">
                <AuthToken.Provider value={{author, setAuthor,loading,setLoading,account,setAccount}}>
                <Admin/>
            </AuthToken.Provider>
            </div>
        )
    } else if (handleAuth().roleId === "2") {
        return (
            <div className="app-react">
                <AuthToken.Provider value={{author, setAuthor,loading,setLoading,account,setAccount}}>
                <Doctor/>
            </AuthToken.Provider>
            </div>
            
        )
    } else {
        return (
            <div className="app-react">
                <AuthToken.Provider value={{author, setAuthor,loading,setLoading,account,setAccount,specialty,doctor,handBook,lang,setLang}}>
                <Guest/>
            </AuthToken.Provider>
            </div>
        )
    }
}

export default App;
