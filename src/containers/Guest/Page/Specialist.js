import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalLoading from "../../../components/ModalLoading";
import specialtydata from "../../../data/specialtydata";
import { handleGetAllSpecialityApi } from "../../../services/specialtyService";
import { AuthToken } from "../../../utils/AuthToken";
import "./scss/Specialist.scss";

function Specialist() {
    // const [specialty, setSpecialty] = useState([]);
    const [specialtyView, setSpecialtyView] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const { specialty} = useContext(AuthToken);


    

    // let getDataSpecialty = async () => {
    //     // let data;

    //     // (async () => {
    //     //     setLoading(true);
    //     //     data = await handleGetAllSpecialityApi();
    //     // })().then(() => {
    //     //     setLoading(false);
    //     //     setSpecialty(data.specialities);
    //     // setSpecialtyView(data.specialities);
    //     // });
        
       
    // };
    // useEffect(() => {
    //     console.log("specialty: ", specialty);
    // }, []);
    useEffect(() => {
        setSpecialtyView(
            specialty.filter((item) =>

                item.name.toLowerCase().includes(
                    search.toLowerCase().trim()
                )
            )
        );
    }, [search, specialty]);




    
    
    return (

        <div class="special-page">
            <div class="special-page__header">
                <h4>Chuyên khoa</h4>
                <p>
                    CareHappy hỗ trợ bạn tìm kiếm các chuyên khoa y tế đa dạng,nhanh chóng và chính xác nhất.
                </p>
            </div>
            <div class="special-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm chuyên khoa" 
                        onChange={
                            (e) => {
                                setSearch(e.target.value);
                            }
                            
                        }
                        
                        />
                </div>
            </div>
            <div class="special-page__content">
                <div class="special-page__content__specialties">
                            
                    {
                        specialtyView && specialtyView.map((item, index) => {
                            return (
                                <div class="special-page__content__specialties__item"
                                key={index}
                                >
                                <div class="div-special-background"
                                style={{background: `url(${item.image})`}}
                                >
                                 <Link to={`/specialty/${item.id}`} className="view_specialty_detail">
                                     <div className="detail-btn">
                                        Xem chuyên khoa
                                     </div>
                                    </Link>       
                                </div>
                                    <p class="div-special-name">{ item.name}</p>
                            </div>
                            )
                        })
                        
                               }
                </div>
            </div>
            {
            loading && <ModalLoading />
         }


        </div>
    );
}
export default Specialist;