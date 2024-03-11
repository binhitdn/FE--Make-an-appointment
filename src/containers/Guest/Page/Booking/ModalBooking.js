import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "reactstrap";
import { handleAuth } from "../../../../Auth/index";
import { useState } from "react";
import { useEffect } from "react";
import { getUserByIdApi } from "../../../../services/userService";
import { handleCreateNewReviewApi } from "../../../../services/doctorService";
import "./ModalBookingReview.scss";
import moment from "moment";

function ModalBookingReview(props) {
  const [idPatient, setIdPatient] = useState(handleAuth().id);
  const [infoPatient, setInfoPatient] = useState({});
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  var Buffer = require("buffer/").Buffer;

  let getDataUser = async () => {
    let data = await getUserByIdApi(idPatient);
    setInfoPatient(data.users);
  };
  useEffect(() => {
    getDataUser();
  }, []);
  useEffect(() => {
    console.log("A", props.info);
  });

  let parsePhoto = (image) => {
    if (image) {
      return new Buffer(image, "base64").toString("binary");
    } else {
      return "";
    }
  };
  let convertCurrency = (money) => {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  let handleSaveReview = async () => {
    let data = {
      bookingId: props.info.id,
      rate: rating,
      review: review,
    };
    let a = await handleCreateNewReviewApi(data);
    console.log("a", a);
  };

  return (
    <Modal
      isOpen={true}
      className={"booking-modal-container"}
      centered={true}
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title"> Thông tin đặt lịch khám bệnh</h5>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div className="modal-body">
        <div>
          <div className="info-schedule">
            <div
              className="info-doctor"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className="info-doctor-avatar"
                style={{
                  backgroundImage: `url(${props.info.doctorData.userData.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
              ></div>
              <div
                className="info-doctor-name"
                style={{ maxWidth: "600px", marginRight: "20px" }}
              >
                <span>{props.info.doctorData.description}</span>
              </div>
            </div>
            <div className="info-extra">
              <div className="select-price">
                <center>
                  <div className="price">
                    <span className="price-number">
                      {convertCurrency(props.info.doctorData.priceId)}
                    </span>
                    <span className="price-unit">VNĐ</span>
                  </div>
                </center>
              </div>
              <span>
                {props.info.timeTypeData2.valueEn} &&{" "}
                {moment(props.info.date).format("DD/MM/YYYY")}
              </span>
              <span> </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <div className="input-icon">
                <i className="fa-solid fa-user input-icon-icon"></i>
                <p>
                  Họ Tên Bác Sĩ:
                  {props.info.doctorData.userData.lastName}{" "}
                  {props.info.doctorData.userData.firstName}
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="input-icon">
                <i class="fa-regular fa-calendar input-icon-icon"></i>
                <p>
                  Chuyên Khoa:
                  {props.info.doctorData.specialtyData.name}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="input-icon">
                <i class="fa-solid fa-phone input-icon-icon"></i>
                <p>
                  {" "}
                  Lí Do Khám:
                  {props.info.reason}
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="input-icon">
                <i class="fa-solid fa-phone input-icon-icon"></i>
                <p>
                  {" "}
                  Trạng Thái:
                  {props.info.statusData.valueVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        {/* <input type="button" className="btn btn-primary" value="Xác nhận" onClick={()=>{handleComfirmBooking(props.info.id)}} />
                    <button type="button" className="button btn-continue" data-dismiss="modal">Hủy</button>
                    <button type="button" className="button btn-exit" data-dismiss="modal"
                    onClick={props.handleToggleModal}
                    >Thoát</button> */}
        {/* <button className="btn btn-primary" onClick={handleSaveReview  }>Đánh Giá</button> */}
        {/* {
                        props.statusEdit == "E" ? <button className="btn btn-primary" onClick={handleEditReview  }>Sửa Đánh Giá</button>
                        : <button className="btn btn-primary" onClick={handleSaveReview  }>Đánh Giá</button>
                    }   */}
        <button
          type="button"
          className="button btn-exit"
          data-dismiss="modal"
          onClick={props.handleToggleModal}
        >
          Thoát
        </button>
      </div>
    </Modal>
  );
}
export default ModalBookingReview;
