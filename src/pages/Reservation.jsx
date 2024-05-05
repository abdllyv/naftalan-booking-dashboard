import { useContext, useState } from "react";
import { MainContext } from "../utils/MainContext";


// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import arrow from "../assets/images/icon/arrow-left.svg";
const Reservation = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  //   Local State
  const [reservationDetailVisible, setReservationDetailVisible] =
    useState(false);
  return (
    <main>
      <section className="reservation">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Reservation</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="reservation-info-area">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hotel name</th>
                  <th>Room name</th>
                  <th>Customer</th>
                  <th>Period</th>
                  <th>Price</th>
                  <th>Edit </th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => setReservationDetailVisible(true)}>
                  <td className="carImg">1111</td>
                  <td>GARABAG RESORT</td>
                  <td>Double room, CLUB</td>
                  <td>Name Surname</td>

                  <td>12/12/2023-15/12/2023</td>
                  <td>2500 AZN</td>
                  <td className="edit" onClick={(e) => e.stopPropagation()}>
                    <button>
                      <img src={trash} alt="trash" />
                    </button>
                  </td>
                </tr>
                <tr onClick={() => setReservationDetailVisible(true)}>
                  <td className="carImg">1111</td>
                  <td>GARABAG RESORT</td>
                  <td>Double room, CLUB</td>
                  <td>Name Surname</td>

                  <td>12/12/2023-15/12/2023</td>
                  <td>2500 AZN</td>
                  <td className="edit" onClick={(e) => e.stopPropagation()}>
                    <button>
                      <img src={trash} alt="trash" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={
            reservationDetailVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : setReservationDetailVisible(false);
          }}
        ></div>
        <div
          className={
            reservationDetailVisible
              ? " isOpenMenu sidebar-reservatoin-menu "
              : "sidebar-reservatoin-menu  "
          }
        >
          <div className="head">
            <h4 className="caption">Collection title</h4>
            <div
              className="icon"
              onClick={() => setReservationDetailVisible(false)}
            >
              <img src={arrow} alt=" close" />
            </div>
          </div>
          <div className="body">
            <table className="submmenu-table">
              <tr>
                <th>ID</th>
                <td>123</td>
              </tr>
              <tr>
                <th>Hotel name</th>
                <td>GARABAG RESORTGARABAG RESORTGARABAG RESORT</td>
              </tr>
              <tr>
                <th>Room name</th>
                <td>Double room, CLUB</td>
              </tr>
              <tr>
                <th>Customer</th>
                <td>Name Surname</td>
              </tr>
              <tr>
                <th>Period</th>
                <td>12/12/2023-15/12/2023</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>2500 AZN</td>
              </tr>
              <tr>
                <th>Number</th>
                <td>+99455 262 02 02</td>
              </tr>
              <tr>
                <th>Mail</th>
                <td>mail@mail.com</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reservation;
