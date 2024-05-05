import add from "../../assets/images/icon/add-plus.svg";
import trash from "../../assets/images/icon/trash.svg";
import edit from "../../assets/images/icon/edit.svg";
import { useContext } from "react";
import { MainContext } from "../../utils/MainContext";
import PriceListScheduleSideBarMenu from "../../components/side-bar-menu/PriceListScheduleSideBarMenu";
const HotelDEtailPriceListSchedule = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    priceListScheduleVisible,
    setPriceListScheduleVisible,
  } = useContext(MainContext);
  return (
    <div className="hotel-detail-priceList-schedule">
      <div className="container">
        <div className="priceList-schedule-head">
          <div className="add-area">
            <h4 className="add-caption">Add room</h4>
            <button
              className="add-btn"
                onClick={() => setPriceListScheduleVisible(true)}
            >
              Add <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="priceList-schedule-body">
          <table className="table">
            <thead>
              <tr>
                <th className="first">Name</th>
                <th className="first">Period</th>

                <th className="edit">Edit && Delete </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="first">1111</td>
                <td className="first">01 02 2023 - 01 03 2023</td>

                <td className="edit">
                  <div className="btn-area">
                    <button>
                      <img src={trash} alt="trash" />
                    </button>
                    <button onClick={() => setPriceListScheduleVisible(true)}>
                      <img src={edit} alt="edit" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-footer">
          <div className="handle-area">
            <p className="error-text">asd</p>
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>
      <PriceListScheduleSideBarMenu />
      <div
        className={
          priceListScheduleVisible || mainMneuVisible
            ? "overlay-sub-menu active"
            : "overlay-sub-menu"
        }
        onClick={() => {
          mainMneuVisible
            ? setMainMneuVisible(false)
            : setPriceListScheduleVisible(false);
        }}
      ></div>
    </div>
  );
};

export default HotelDEtailPriceListSchedule;
