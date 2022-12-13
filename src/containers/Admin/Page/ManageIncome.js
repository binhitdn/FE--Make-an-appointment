import { useEffect } from "react";
import "./scss/ManageIncome.scss"

let ManageIncome = () => {
    let getData = async () => {
        
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="manage-income">
            <div className="manage-income__header">
                <h1 className="manage-income__title">Manage Income</h1>
            </div>
            <div className="manage-income__body">
                <div className="manage-income__body__table">
                {/* <th>Id</th>
                                <th>Ảnh</th>
                                <th>Tên Bác Sĩ</th>
                                <th>Chuyên Khoa</th>
                                
                                <th>Thu Nhập</th>
                                <th>Thao tác</th> */}


{/* <table id="customers">
  <tr>
                                <th>Id</th>
                                <th>Ảnh</th>
                                <th>Tên Bác Sĩ</th>
                                <th>Chuyên Khoa</th>
                                
                                <th>Thu Nhập</th>
                                <th>Thao tác</th>
  </tr>
  
            {
                props.users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.lastName} {user.firstName}</td>
                            <td>{
                                user.genderData.valueVi
                            }</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.roleData.valueVi}</td>
                            <td>
                                <button className="btn btn-success"
                                    onClick={
                                        () => {
                                            
                                        }
                                    }
                                    
                                >Sửa</button>
                                <button className="btn btn-danger"
                                    onClick={
                                        
                                        () => {  }
                                        
                                    }
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })
            }
        </table> */}
                </div>
            </div>
                        


        </div>
    )
}
export default ManageIncome
