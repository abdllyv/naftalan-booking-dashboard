// React
import { useContext } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";

const PriceListSidebarMenu = () => {
  // Global State
  const {  priceListVisible, setPriceListVisible } =
    useContext(MainContext);

  return (
    <div
      className={
        priceListVisible
          ? " isOpenMenu priceList-sidebar-menu "
          : "priceList-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Standart</h4>
        <div
          className="icon"
          onClick={() => setPriceListVisible(false)}
        >
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="priceList-form">
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            Min. ps
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            Min. ng
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            Min. ng
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            Max. ng
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            01 02 2023 - 01 03 2023
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            01 02 2023 - 01 03 2023
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
            01 02 2023 - 01 03 2023
            </label>
            <input type="text" className="inp" />
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
}

export default PriceListSidebarMenu