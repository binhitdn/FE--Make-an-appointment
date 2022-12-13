
    

    function BookingAboutToExpire(props) {
        return (
            <table id="customers">
            <tr>
              <th>Id</th>
              <th>Email Bệnh Nhân</th>
              <th>Thời gian</th>
              <th>Thao tac</th>
            </tr>
            
              {
               props.booking && props.booking.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.patientData.userData.email}</td>
                      <td>{item.timeTypeData2.valueVi}</td>
    
                      <td>
                        
                        <button 
                        
                        >Xem chi tiet</button>
                      </td>
                    </tr>
                  )
                }) 
              }
              {
                props.booking && props.booking.length === 0 &&
                <tr>
                  <td colSpan="4">Không có lịch hẹn nào sắp hết hạn</td>
                </tr>
              }
            
                          </table>
        );
    }
    export default BookingAboutToExpire;