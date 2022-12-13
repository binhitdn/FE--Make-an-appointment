import { useEffect } from "react";
import { useState } from "react";
import { handGetAllHandbook } from "../../../services/handbookService";

function ListHandBook() {
    const [handbooks, setHandbooks] = useState([]);
    let handleGetAllHandBook = async () => {
        let api = await handGetAllHandbook();
        setHandbooks(api.data);
    }
    useEffect(() => {
        handleGetAllHandBook();
    }, []);
    return (
        <table id="customers">
  <tr>
                <th>ID</th>
                <th>Tiêu Đề Bài Viết</th>
                <th>Tác Giả</th>
                <th>Ngày Đăng</th>
                <th>Thao tác</th>

  </tr>
  {
        handbooks.map((handbook, index) => {
            return (
                <tr key={index}>
                    <td>{handbook.id}</td>
                    <td>{handbook.title}</td>
                    <td>{handbook.poster}</td>
                    <td>{handbook.createdAt}</td>
                    <td>
                        <button className="btn btn-warning">Sửa</button>
                        <button className="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            )
        })
  }
  
            
        </table>
    )
}
export default ListHandBook;