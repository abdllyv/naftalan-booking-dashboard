import { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import arrow from "../assets/images/icon/arrow-left.svg";
import axios from "axios";
import { createRemoveAlert } from "../utils/SweetAlert";
const ContactUs = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  // LOcal State
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState(null);

  // Get DAta
  const getContactUsData = useCallback(async (page_number) => {
    await axios
      .get(
        `https://naftalan-backend.uptodate.az/private/contact-message/read/all`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // RenderingDAta
  useEffect(() => {
    getContactUsData();
  }, [getContactUsData]);

  //   Local State
  const [reservationDetailVisible, setReservationDetailVisible] =
    useState(false);

  // Delete Hotel
  const removeData = (dataId) => {
    createRemoveAlert(
      "Delete Hotel!",
      "Are you sure you want to delete the Message?",
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `https://naftalan-backend.uptodate.az/private/contact-message/delete/${dataId}`,
            {
              crossdomain: true,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              const updateHotel = data.filter((hotel) => hotel.id !== dataId);
              setData(updateHotel);
            }
            // setAllHotel(res.data.page_data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

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
                <h2 className="caption">Contact Us Message</h2>
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
                  <th> Name</th>
                  <th>Email</th>
                  <th>Edit </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((person) => (
                    <tr
                      onClick={() => {
                        setReservationDetailVisible(true);
                        setSelectData(person);
                      }}
                      key={person.id}
                    >
                      <td className="carImg">{person.id}</td>
                      <td>{person.message_messenger_name}</td>
                      <td>{person.message_messenger_email}</td>

                      <td
                        className="edit"
                        onClick={(e) => {
                          e.stopPropagation();

                          removeData(person.id);
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
                <td>{selectData && selectData.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{selectData && selectData.message_messenger_name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{selectData && selectData.message_messenger_email}</td>
              </tr>
              <tr>
                <th>Message</th>
                <td>{selectData && selectData.message}</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
