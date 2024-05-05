import React, { useContext } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import edit from "../assets/images/icon/edit.svg";
import ExchangeRateSideBarMenu from "../components/side-bar-menu/ExchangeRateSideBarMenu";

const ExchangeRate = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    exchangeRateVisible,
    setExchangeRateVisible,
  } = useContext(MainContext);

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
                  <th className="first">Template content</th>
                  <th className="first">Selling rade</th>
                  <th className="first">Mean rade</th>

                  <th className="edit">Edit </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="first">AZN</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>

                  <td className="edit">
                    <div className="btn-area">
                      <button onClick={() => setExchangeRateVisible(true)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="first">EUR</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>

                  <td className="edit">
                    <div className="btn-area">
                      <button onClick={() => setExchangeRateVisible(true)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="first">KZT</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>

                  <td className="edit">
                    <div className="btn-area">
                      <button onClick={() => setExchangeRateVisible(true)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="first">RUB</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>

                  <td className="edit">
                    <div className="btn-area">
                      <button onClick={() => setExchangeRateVisible(true)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="first">USD</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>
                  <td className="first">01 02 2023 - 01 03 2023</td>

                  <td className="edit">
                    <div className="btn-area">
                      <button onClick={() => setExchangeRateVisible(true)}>
                        <img src={edit} alt="edit" />
                      </button>
                    </div>
                  </td>
                </tr>
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
        <ExchangeRateSideBarMenu/>
      </section>
    </main>
  );
};

export default ExchangeRate;
