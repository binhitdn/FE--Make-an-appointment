import axios from "../../../axios";
import { useEffect, useState } from "react";
import { handleGetIdDoctorByIdUserApi, handleGetIncomeDoctorApi } from "../../../services/doctorService";
import { handleAuth } from "../../../Auth";


function IncomeManagement(){
  const [totalIncome, setTotalIncome] = useState(0);
    let getData = async () => {
      let idDoctor = await handleGetIdDoctorByIdUserApi(handleAuth().id);
      console.log(idDoctor.data.id);

        let res = await handleGetIncomeDoctorApi(idDoctor.data.id,11);
        console.log(res.data);
       
        setTotalIncome(res.data[0].doctorData.totalIncome);
        

    }
    useEffect(() => {

        getData();
    }, [])
    let changeCurrency = (number) => {
      console.log("Number: ",number)

        
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }
      
      return (
        <div>
          <div>
                <h1>Income Management</h1>
          </div>
          <div className="body-incomemanagement">
            <div className="body-incomemanagement-header">
              <h2>Tổng số lượt đặt khám: 2</h2>
              <h2>Tổng thu nhập: { changeCurrency(totalIncome) } VNĐ
              
              
              </h2>
              <h2>Thu nhập nhận được:

                    {
                        totalIncome - (totalIncome * 0.1)
                    }
              </h2>
              
            </div>
              
          </div>
                
        </div>
        );
}
export default IncomeManagement