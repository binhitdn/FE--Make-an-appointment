import "./TableUser.scss"
import axios from '../../../../axios';
import { useEffect, useState } from "react";
import { isBuffer, set } from "lodash";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function TableUser(props) {
    // const [users, setUsers] = useState([]);
    


    // let handleGetAllUser = async () => {
    //     let inputId = "ALL";
    //     let api = await axios.get(`/api/get-all-users?id=${inputId}`)
    //     console.log("api: ", api.users);
    //     setUsers(api.users);
    // }
    // let updateListUsers = async (user) => {
    //     await handleGetAllUser();
    // }

    //  useEffect(() => {
    //     console.log("render con")
    //  })
    // useEffect(() => {
    //     handleGetAllUser();
    // }, [])
    

    
   
    
    

    let handleEditUser = (user) => {
        props.handleEditUserFromParentKey(user);
    }
    let handleDeleteUser =  async(id) => {
        await props.handleDeleteUserFromParent(id);
    }


    return (
//         <table id="customers">
//   <tr>
//                 <th>ID</th>
//                 <th>Họ Tên</th>
//                 <th>Giới Tính</th>
//                 <th>Email</th>
//                 <th>Số Điện Thoại</th>
//                 <th>Vai trò</th>
//                 <th>Thao tác</th>
//   </tr>
  
//             {
//                 props.users.map((user, index) => {
//                     return (
//                         <tr key={index}>
//                             <td>{user.id}</td>
//                             <td>{user.lastName} {user.firstName}</td>
//                             <td>{
//                                 user.genderData.valueVi
//                             }</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                             <td>{user.roleData.valueVi}</td>
//                             <td>
//                                 <button className="btn btn-success"
//                                     onClick={
//                                         () => {
//                                             handleEditUser(user)
//                                         }
//                                     }
                                    
//                                 >Sửa</button>
//                                 <button className="btn btn-danger"
//                                     onClick={
                                        
//                                         () => { handleDeleteUser(user.id) }
                                        
//                                     }
//                                 >Xóa</button>
//                             </td>
//                         </tr>
//                     )
//                 })
//             }
//         </table>
<MDBTable align='middle'

>
      <MDBTableHead>
        <tr>
          <th scope='col'>Họ Tên</th>
          <th scope='col'>Giới Tính</th>
          <th scope='col'>Vai trò</th>
          <th scope='col'>Số điện thoại</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        
        {
                 props.users.map((user, index) => {
                        return (
                            <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={user.image? user.image : 'https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png'}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>
                    {user.lastName}  {user.firstName}
                </p>
                <p className='text-muted mb-0'>
                    {user.email}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>
                {user.genderData.valueVi}
            </p>
            <p className='text-muted mb-0'>
                Người Dùng
            </p>
          </td>
          <td>
            <MDBBadge color={
                user.roleData.valueVi === "Quản trị viên" ? "danger" : "success"
            } 
             pill>
                {user.roleData.valueVi}
            </MDBBadge>
          </td>
          <td>
            {user.phone}
          </td>
          <td>
            {/* <MDBBtn color='warning' rounded size='sm'
            onClick={
                handleEditUser(user)
            }
            >
                <i className='fas fa-pencil-alt' />
            </MDBBtn>
            <MDBBtn color='danger' rounded size='sm'
            onClick={
                handleDeleteUser(user.id)
            }
            >
                <i className='fas fa-trash' />
            </MDBBtn> */}
            <button className="btn btn-warning"
                                    onClick={
                                        () => {
                                            handleEditUser(user)
                                        }
                                    }
                                    style={{margin: '5px'}}   
                                >
                                  <i className='fas fa-pencil-alt' />
                                </button>
                                <button className="btn btn-danger"

                                    onClick={
                                    () => { 
                                      console.log("user.id: ", user.id);
                                      this.handleDeleteUser(user.id) 

                                    }
                                    }
                                    style={{margin: '5px'}}  
                                >
                                  <i className='fas fa-trash' />
                                </button>

          </td>
        </tr>
                        )
                    })
                }

        
      </MDBTableBody>
    </MDBTable>
    );
        

}
export default TableUser;