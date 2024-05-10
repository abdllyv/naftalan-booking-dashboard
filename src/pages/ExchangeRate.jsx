import React, { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import edit from "../assets/images/icon/edit.svg";
import ExchangeRateSideBarMenu from "../components/side-bar-menu/ExchangeRateSideBarMenu";
import axios from "axios";

const ExchangeRate = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    exchangeRateVisible,
    setExchangeRateVisible,

    // data
    exchangeRateData,setExchangeRateData
  } = useContext(MainContext);

  // LOcal State
  // const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState({
    currency_code:""
  });
  // Get DAta
  const getCurrencyData = useCallback(async () => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/currency/read/all?locale=en`
      )
      .then((res) => setExchangeRateData(res.data))
      .catch((err) => console.log(err));
  }, [setExchangeRateData]);

  // RenderingData
  useEffect(() => {
    getCurrencyData();
  }, [getCurrencyData]);

  return (
    <main>
      <section className="exchange-rate">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Exchange Rate</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="exchange-rate-body">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th className="first">Code</th>
                  <th className="first">Name</th>
                  <th className="first">Price</th>

                  <th className="edit">Edit </th>
                </tr>
              </thead>
              <tbody>
                {exchangeRateData &&
                  exchangeRateData.map((currency) => (
                    <tr key={currency.id}>
                      <td className="first">{currency.currency_code}</td>
                      <td className="first">{currency.currency_name}</td>
                      <td className="first">{currency.currency_price}</td>

                      <td className="edit">
                        <div className="btn-area">
                          <button
                            onClick={() => {
                              setExchangeRateVisible(true);
                              setSelectData(currency);
                            }}
                          >
                            <img src={edit} alt="edit" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={
            exchangeRateVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : setExchangeRateVisible(false);
          }}
        ></div>
        <ExchangeRateSideBarMenu selectData={selectData} />
      </section>
    </main>
  );
};

export default ExchangeRate;
