import "./scss/ManagerSchedule.scss";
import { useState, useEffect } from "react";
import { handleAuth } from "../../../Auth/index";
import {
  bulkCreateScheduleApi,
  handleGetIdDoctorByIdUserApi,
  handleGetScheduleByDateApi,
} from "../../../services/doctorService";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { handleGetAllCode } from "../../../services/systemService";
import moment from "moment/moment";
import { toast } from "react-toastify";

function ManagerSchedule() {
  const [doctors, setDoctors] = useState([]);
  const [id, setId] = useState(null);
  const [arrTime, setArrTime] = useState([]);
  const [rangeTime, setRangeTime] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const [startDate, setStartDate] = useState();
  const [dateFm, setDateFm] = useState();

  registerLocale("vi", vi);

  let getData = async () => {
    let id = await handleAuth().id;

    let data = await handleGetIdDoctorByIdUserApi(id);
    setId(data.data.id);
    let schedulenow = await handleGetScheduleByDateApi(
      data.data.id,
      moment(currentDate).format("YYYY-MM-DD")
    );
    console.log(schedulenow.data);
    let arr = [];
    schedulenow.data.forEach((element) => {
      arr.push(element.timeType);
    });

    let arrD = await handleGetAllCode("TIME");
    let times = arrD.data.data;
    if (times && times.length > 0) {
      times.map((item) => {
        if (arr.includes(item.keyMap)) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });
    }

    setArrTime(times);
  };

  useEffect(() => {
    getData();

    console.log("arrTime2 ", arrTime);
    if (!currentDate) {
      let dates = new Date();
      dates.setDate(dates.getDate());
      setCurrentDate(dates);
      setDateFm(
        dates.getFullYear() +
          "-" +
          (dates.getMonth() + 1) +
          "-" +
          dates.getDate()
      );
    }
  }, []);
  useEffect(() => {
    getData();
  }, [currentDate]);
  let handleChangeDatePicker = (date) => {
    // console.log(date.getDate);
    // setStartDate(date)
    let dates =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setDateFm(dates);
    setCurrentDate(date);
  };
  let handleClickBtnTime = (time) => {
    if (arrTime && arrTime.length > 0) {
      let arrTimeAnother = arrTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      setArrTime(arrTimeAnother);
    }
  };

  let handleSaveSchedule = async () => {
    let formatedDate = moment(currentDate).format("YYYY-MM-DD");
    let result = [];
    if (arrTime && arrTime.length > 0) {
      let arrTimeResult = arrTime.filter((item) => item.isSelected === true);
      if (arrTimeResult.length > 0) {
        arrTimeResult.map((schedule) => {
          let object = {};
          object.doctorId = id;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      }
    }
    console.log(result);

    let bulk = await bulkCreateScheduleApi({
      arrSchedule: result,
      doctorId: id,
      date: moment(currentDate).format("YYYY-MM-DD"),
    });
    toast.success("Lưu thành công");
  };

  return (
    <>
      <div className="manage-doctor-container col-7">
        <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content">
            <div className="content-left">
              <label>Chọn Ngày: </label>
              <DatePicker
                selected={currentDate}
                onChange={(date) => handleChangeDatePicker(date)}
                locale="vi"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="form-control"
              />
            </div>
          </div>
          {/* <div className="content-2">
                        {arrTime.slice(0,4) && arrTime.slice(0,4).map(
                            (time, index) => {
                                return (
                                    <button key={index} value={time.keyMap}
                                        className={time.isSelected === true ? "button-time active" : "button-time"}
                                        onClick={() => handleClickBtnTime(time)}
                                    >
                                        {time.valueVi}

                                    </button>
                                )
                            }
                        )


                        }

                        <div className="button-container">
                    <button className="button-save" 
                        onClick={handleSaveSchedule}
                    >Tạo lịch hẹn</button>
                </div>
                    </div> */}
        </div>
        <div className="schedule">
          <div className="schedule-title">Lịch hẹn</div>
          <div className="schedule-content">
            <div className="schedule-content-morning">
              <div className="schedule-content-morning-title">Sáng</div>
              {arrTime.slice(0, 4) &&
                arrTime.slice(0, 4).map((time, index) => {
                  return (
                    <button
                      key={index}
                      value={time.keyMap}
                      className={
                        time.isSelected === true
                          ? "button-time active"
                          : "button-time"
                      }
                      onClick={() => handleClickBtnTime(time)}
                    >
                      {time.valueVi}
                    </button>
                  );
                })}
            </div>
            <div className="schedule-content-morning">
              <div className="schedule-content-morning-title">Chiều</div>
              {arrTime.slice(4, 8) &&
                arrTime.slice(4, 8).map((time, index) => {
                  return (
                    <button
                      key={index}
                      value={time.keyMap}
                      className={
                        time.isSelected === true
                          ? "button-time active"
                          : "button-time"
                      }
                      onClick={() => handleClickBtnTime(time)}
                    >
                      {time.valueVi}
                    </button>
                  );
                })}
            </div>
            <div className="button-container">
              <button className="button-save" onClick={handleSaveSchedule}>
                Lưu lịch
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="background-schedule col-5"
        style={{
          backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/5c702dbd4d8711d477f494d9/1569872550806-R3DBCTKNXN266XGFFYKJ/AdobeStock_260797051.png?format=1500w")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          right: "0",
          zIndex: "-1",
          opacity: "0.2",
        }}
      ></div>
    </>
  );
}
export default ManagerSchedule;
