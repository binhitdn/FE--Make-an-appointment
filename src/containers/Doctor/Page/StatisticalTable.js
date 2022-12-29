import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import moment from 'moment';
import { useEffect, useState } from 'react';
import "./scss/StatisticalTable.scss"

function StatisticalTable(props) {
  
  const [time, setTime] = useState(Date.now());


 let  letGetFromNowBooking = (fromNowBooking) => {
    
 }
 useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);

  

    return (
        
       
            <div className="statistical-table">
               {
                props.bookingToday && 
                <MDBTable align='middle'

>
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Bệnh Nhân</th>
          <th scope='col'>Thời gian</th>
          <th scope='col'>Thời hạn</th>
          {/* <th scope='col'>Thao tác </th> */}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        
        
        {
                 props.bookingToday && props.bookingToday.map((item, index) => {
                  let status = "";
                  let statusColor = "";
                 
                  let fromNowBooking = item.timeTypeData2.valueVi.slice(0,5);
                  let fromNowBookings = fromNowBooking.slice(0,2);
                 
                  let hoursNow = new Date().getHours();
                  let minutesNow = new Date().getMinutes();
                  let secondsNow = new Date().getSeconds();
                  let time = hoursNow*60*60 + minutesNow*60 + secondsNow;
                  
                  let timeBooking = fromNowBookings*60*60;
                  let timeResult = timeBooking - time;
                 let hours = Math.floor(timeResult / 3600);
                  let minutes = Math.floor((timeResult - (hours * 3600)) / 60);
                  let seconds = timeResult - (hours * 3600) - (minutes * 60);
                  if (hours < 0 || minutes < 0 || seconds < 0) {
                    status = "Đã hết hạn";
                    statusColor = "danger";
                  } else {
                     status = "Còn " + hours + " giờ " + minutes + " phút " + seconds + " giây";
                      statusColor = "success";
                    


                  }

                  
                  
               




                 
                  
              
                        return (
                            <tr key={index}>
            <td>{index + 1}</td>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={ item.patientData.userData.image ? item.patientData.userData.image : 'https://res.cloudinary.com/dkwojfcv8/image/upload/v1670239396/bmc6u64kd2p3jam6ugiu.png'}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>
                {item.patientData.userData.lastName} {item.patientData.userData.firstName}
                </p>
                <p className='text-muted mb-0'>
                {item.patientData.userData.email}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>
                {moment(item.date).format("DD-MM-YYYY")} 
            </p>
            <p className='text-muted mb-0'>
                {item.timeTypeData2.valueVi}
            </p>
          </td>
          <td>
            <MDBBadge color={
                statusColor
            } 
             pill>
               {
                status
                 
               }
            </MDBBadge>
          </td>
          
          {/* <td>
          
                                <button className="btn btn-primary"
                                    
                                    onClick={
                                    () => { 
                                        
                                        

                                    }
                                    }
                                      
                                >
                                    Xem chi tiết
                                    <i className='fas fa-edit' />
                                </button>

          </td> */}
        </tr>
                        )
                    })
                }

        
      </MDBTableBody>
    </MDBTable>
               }
            </div>
    );

}

export default StatisticalTable;