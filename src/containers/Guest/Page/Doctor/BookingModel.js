import moment from "moment";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleAuth } from "../../../../Auth";
import "./scss/BookingModel.scss";
import { getUserByIdApi } from "../../../../services/userService";
import { useState } from "react";
import { useEffect } from "react";
function BookingModel(props) {
  const [idPatient, setIdPatient] = useState(handleAuth().id);
  const [infoPatient, setInfoPatient] = useState({});
  const [idDoctor, setIdDoctor] = useState(1);
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [reason, setReason] = useState();

  let getDataUser = async () => {
    let data = await getUserByIdApi(idPatient);
    setInfoPatient(data.users);
    setDay(props.info.date);
    setTime(props.info.timeTypeData.keyMap);

    console.log("A", props.info);
  };
  useEffect(() => {
    getDataUser();
  }, []);
  useEffect(() => {
    let data = {
      idPatient: idPatient,
      idDoctor: idDoctor,
      day: day,
      time: time,
      reason: reason,
    };
    console.log("data booking modal: ", data);
  });

  let handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "reason") {
      setReason(value);
    }
  };
  let formatCurrency = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <Modal
      isOpen={true}
      className={"booking-modal-container"}
      centered={true}
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title"> 健康診断を予約するための情報</h5>
        <i
          class="fa-solid fa-xmark"
          onClick={props.handleToogleBookingFarent}
        ></i>
      </div>
      <div className="modal-body">
        <div>
          <div className="info-schedule">
            <div
              className="info-doctor"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="info-doctor-left">
                <div
                  className="info-doctor-img"
                  style={{
                    backgroundImage: `url(${props.doctorAvatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    display: "inline-block",
                    flexShrink: "0",
                    backgroundClip: "content-box",
                    border: "1px solid #e9ecef",
                    padding: "2px",
                    boxSizing: "border-box",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.125)",
                  }}
                ></div>
                <div
                  className="info-doctor-name"
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    lineHeight: "1.5",
                  }}
                >
                  {/* {props.doctorPosition.valueVi} - */}
                  {props.doctorName}
                </div>
                <div className="info-doctor">予約の確認</div>
              </div>
              <div
                className="info-doctor-right"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="info-extra">
                  <div className="select-price">
                    <center>
                      Giá tiền :
                      <input type="radio" checked />
                      {formatCurrency(props.price)} VNĐ
                    </center>
                  </div>
                  <p>
                    Ngày khám: {moment(props.info.date).format("MM-DD-YYYY")}
                  </p>
                  <p> Giờ khám: {props.info.timeTypeData.valueEn}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i className="fa-solid fa-user input-icon-icon"></i>

                  <input
                    className=" input-icon-input"
                    placeholder="名前"
                    value={
                      "名前番号:" +
                      infoPatient.lastName +
                      " " +
                      infoPatient.firstName
                    }
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i class="fa-regular fa-calendar input-icon-icon"></i>
                  <DatePicker
                    selected={new Date()}
                    //             onChange={
                    //  (date) => handleChangeDatePicker(date) }

                    locale="vi"
                    dateFormat="dd/MM/yyyy"
                    className="form-control datepicker-custom"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i class="fa-solid fa-phone input-icon-icon"></i>
                  <input
                    className=" input-icon-input"
                    placeholder="電話番号"
                    value={"電話番号: " + infoPatient.phone}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                  <input
                    className=" input-icon-input"
                    placeholder="Email"
                    type="email"
                    value={"Email: " + infoPatient.email}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i class="fa-sharp fa-solid fa-location-dot input-icon-icon"></i>
                  <input
                    className=" input-icon-input"
                    placeholder="Địa chỉ liên hệ"
                    type="text"
                    value={"Địa chỉ: " + infoPatient.address}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="input-icon">
                  <i class="fa-light fa-square-user input-icon-icon"></i>
                  <input
                    className=" input-icon-input"
                    placeholder="Đặt cho ai"
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="input-icon">
                  <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                  {/* <input className=" input-icon-input" placeholder="Lí do khám" type="text" value={reason}
                                    name="reason"
                                    onChange={handleChangeInput}
                                    ></input> */}
                  <textarea
                    className=" input-icon-input"
                    placeholder="Lí do khám"
                    type="text"
                    value={reason}
                    name="reason"
                    onChange={handleChangeInput}
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="button btn-continue"
          data-dismiss="modal"
          onClick={() => props.handleBookingSuccess(day, time, reason)}
        >
          Thanh toán trực tiếp
        </button>
        <button
          type="button"
          className="button btn-primary"
          data-dismiss="modal"
          onClick={() => props.handleBookingSuccess(day, time, reason)}
        >
          Thanh toán Bằng MOMO
        </button>
        <button
          type="button"
          className="button btn-exit"
          data-dismiss="modal"
          onClick={props.handleToogleBookingFarent}
        >
          Thoát
        </button>
      </div>
    </Modal>
  );
}
export default BookingModel;
