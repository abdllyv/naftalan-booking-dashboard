import { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import arrow from "../assets/images/icon/arrow-left.svg";
import axios from "axios";
import { createRemoveAlert } from "../utils/SweetAlert";
const Reservation = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  // LOcal State
  const [data, setData] = useState(null);

  // Get DAta
  const getREservasionDAta = useCallback(async (page_number) => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel-suite-reservation/read/all?page_length=${20}&page_number=${1}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // RenderingDAta
  useEffect(() => {
    getREservasionDAta();
  }, [getREservasionDAta]);
  console.log(data && data.page_data);
  //   Local State
  const [reservationDetailVisible, setReservationDetailVisible] =
    useState(false);
  const [selectReservasion, setSelectReservasion] = useState(null);

  // Delete Coupon
  const removeData = (dataId) => {
    console.log(dataId);
    createRemoveAlert(
      "Delete Coupon!",
      "Are you sure you want to delete the Coupon?",
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/hotel-suite-reservation/delete/${dataId}`
          )
          .then((res) => {
            if (res.status === 200) {
              let arr = data.page_data;
              const update = arr.filter((item) => item.id !== dataId);
              setData({ ...data, page_data: update });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  // const updateCoupon = data?.page_data.filter(
  //   (item) => console.log(item)
  // );
  // console.log(data.page_data)
  // setData(updateCoupon);
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
                {data &&
                  data.page_data.map((reservasion) => (
                    <tr
                      onClick={() => {
                        setReservationDetailVisible(true);
                        setSelectReservasion(reservasion);
                      }}
                      key={reservasion.id}
                    >
                      <td className="carImg">{reservasion.id}</td>
                      <td>{reservasion.reservation_associated_hotel_name}</td>
                      <td>
                        {reservasion.reservation_associated_suite.suite_associated_descriptions.map(
                          (suit) =>
                            suit.description_locale === "en" &&
                            suit.description_suite_name
                        )}
                      </td>
                      <td>
                        {reservasion.reservation_contact_first_name +
                          " " +
                          reservasion.reservation_contact_last_name}
                      </td>

                      <td>
                        {reservasion.reservation_from} /{" "}
                        {reservasion.reservation_until}
                      </td>
                      <td className="price">
                        {reservasion.reservation_total_price}{" "}
                        {reservasion.reservation_currency_code}
                      </td>
                      <td
                        className="edit"
                        onClick={(e) => {
                          e.stopPropagation();

                          removeData(reservasion.id);
                        }}
                      >
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                <td>{selectReservasion && selectReservasion.id}</td>
              </tr>
              <tr>
                <th>Hotel name</th>
                <td>
                  {selectReservasion &&
                    selectReservasion.reservation_associated_hotel_name}
                </td>
              </tr>
              <tr>
                <th>Room name</th>
                <td>
                  {selectReservasion &&
                    selectReservasion.reservation_associated_suite.suite_associated_descriptions.map(
                      (suit) =>
                        suit.description_locale === "en" &&
                        suit.description_suite_name
                    )}
                </td>
              </tr>
              <tr>
                <th>Customer</th>
                <td>
                  {selectReservasion &&
                    selectReservasion.reservation_contact_first_name +
                      " " +
                      selectReservasion.reservation_contact_last_name}
                </td>
              </tr>
              <tr>
                <th>Period</th>
                <td>
                  {" "}
                  {selectReservasion &&
                    selectReservasion.reservation_from} /{" "}
                  {selectReservasion && selectReservasion.reservation_until}
                </td>
              </tr>
              <tr>
                <th>Price</th>
                <td>
                  {" "}
                  {selectReservasion &&
                    selectReservasion.reservation_total_price}{" "}
                  {selectReservasion &&
                    selectReservasion.reservation_currency_code}
                </td>
              </tr>
              <tr>
                <th>Number</th>
                <td>
                  {selectReservasion &&
                    selectReservasion.reservation_contact_phone}
                </td>
              </tr>
              <tr>
                <th>Mail</th>
                <td>
                  {selectReservasion &&
                    selectReservasion.reservation_contact_email}
                </td>
              </tr>
              {selectReservasion && selectReservasion.reservation_comment && (
                <tr>
                  <th>Comment</th>
                  <td>{selectReservasion.reservation_comment}</td>
                </tr>
              )}
              {selectReservasion &&
                selectReservasion.reservation_associated_guests.map((item) => (
                  <>
                    <tr>
                      <th>Guest1</th>
                      <td>{item.guest_name}</td>
                    </tr>
                    <tr>
                      <th>Guest 1</th>
                      <td>{item.guest_date_of_birth}</td>
                    </tr>
                  </>
                ))}
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reservation;
