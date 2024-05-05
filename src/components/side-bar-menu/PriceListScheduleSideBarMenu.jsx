// React
import { useContext } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";

const PriceListScheduleSideBarMenu = () => {
  // Global State
  const { priceListScheduleVisible, setPriceListScheduleVisible } =
    useContext(MainContext);

  return (
    <div
      className={
        priceListScheduleVisible
          ? " isOpenMenu priceListSchedule-sidebar-menu "
          : "priceListSchedule-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Price list schedule</h4>
        <div
          className="icon"
          onClick={() => setPriceListScheduleVisible(false)}
        >
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="priceListSchedule-form">
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              Start Day
            </label>
            <input type="date" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              Start Month
            </label>
            <input type="date" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              End Day
            </label>
            <input type="date" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              End Month
            </label>
            <input type="date" className="inp" />
          </div>

          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <div className="btn-area">
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceListScheduleSideBarMenu;
