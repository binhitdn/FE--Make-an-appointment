import "./TableUser.scss";
import axios from "../../../../axios";
import { useEffect, useState } from "react";
import { isBuffer, set } from "lodash";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";

function TableUser(props) {
  let [listUser, setListUser] = useState(["R1", "R2", "R3"]);
  let [listUserFilter, setListUserFilter] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setListUserFilter(props.users);
  }, [props.users]);

  let handleEditUser = (user) => {
    props.handleEditUserFromParentKey(user);
  };
  let handleDeleteUser = async (id) => {
    await props.handleDeleteUserFromParent(id);
  };
  let handleFilterUser = (e) => {
    (async () => {
      let role = e.target.value;
      if (e.target.checked) {
        setListUser([...listUser, role]);
      } else {
        setListUser(listUser.filter((item) => item != role));
      }
      console.log("listUser: ", listUser);
    })();
  };
  let removeAccents = (str) =>{
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');  
}

  return (
    <div class="table-user">
      <div className="row">
        <div className="col-6">
          <label>Lọc người dùng</label>
          <div>
            {props.roleData &&
              props.roleData.map((item, index) => {
                return (
                  <span>
                    <label>{item.valueVi}</label>
                    <input
                      key={index}
                      type="checkbox"
                      name="role"
                      onChange={(e) => handleFilterUser(e)}
                      value={item.keyMap}
                      checked={listUser.some((user) => user == item.keyMap)}
                    ></input>
                  </span>
                );
              })}
          </div>
        </div>
        <div className="col-6">
        <div className="special-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder={
                            
                            "Tìm kiếm"
                        } 
                        onChange={
                            (e) => {
                                setSearch(e.target.value)
                            }

                            
                        }
                        
                        />
                        </div>
                        
         
          </div>  

      </div>
        
        </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Họ Tên</th>
            <th scope="col">Giới Tính</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {props.users
            .filter((user) => {
              return listUser.some((role) => {
                return user.roleId.includes(role);
              });
            }).filter((user) => {
              return removeAccents(user.lastName + " "+user.firstName).toLowerCase().includes(removeAccents(search).toLowerCase())  || removeAccents(user.email).toLowerCase().includes(removeAccents(search).toLowerCase()) || removeAccents(user.phone).toLowerCase().includes(removeAccents(search).toLowerCase())
            })
            .map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          user.image
                            ? user.image
                            : "https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">
                          {user.lastName} {user.firstName}
                        </p>
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{user.genderData.valueVi}</p>
                    <p className="text-muted mb-0">Người Dùng</p>
                  </td>
                  <td>
                    <MDBBadge
                      color={
                        user.roleData.valueVi === "Quản trị viên"
                          ? "danger"
                          : "success"
                      }
                      pill
                    >
                      {user.roleData.valueVi}
                    </MDBBadge>
                  </td>
                  <td>{user.phone}</td>
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
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleEditUser(user);
                      }}
                      style={{ margin: "5px" }}
                    >
                      <i className="fas fa-pencil-alt" />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        console.log("user.id: ", user.id);
                        props.handleDeleteUserFromParent(user.id);
                      }}
                      style={{ margin: "5px" }}
                      disabled={user.roleData.valueVi === "Quản trị viên"}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
export default TableUser;
