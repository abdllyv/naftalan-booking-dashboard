// React
import { useContext } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
const ExchangeRateSideBarMenu = () => {
  // Global State
  const { exchangeRateVisible, setExchangeRateVisible } =
    useContext(MainContext);

  return (
    <div
      className={
        exchangeRateVisible
          ? " isOpenMenu exchange-rate-sidebar-menu "
          : "exchange-rate-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Exchange rate</h4>
        <div className="icon" onClick={() => setExchangeRateVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <h4 className="form-caption"> AZN</h4>
        <form action="" className="exchange-rate-form">
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              Selling rade
            </label>
            <input type="text" className="inp" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="inp-caption">
              Mean rade
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
};

export default ExchangeRateSideBarMenu;
