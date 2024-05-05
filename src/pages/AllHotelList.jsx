// React
import { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../utils/MainContext";

// React Router Dom
import { useLocation, useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// Sweet Alert
import { createRemoveAlert } from "../utils/SweetAlert";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import edit from "../assets/images/icon/edit.svg";
import add from "../assets/images/icon/add-plus.svg";

const AllHotelList = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible, setHotelDEtailActiveTab } =
    useContext(MainContext);

  // Router
  const { pathname } = useLocation();

  // Local State
  const [allHotel, setAllHotel] = useState([]);
  const [prevNumber, setPrevNumber] = useState(0);
  const [activeNumber, setActiveNumber] = useState(1);
  const [nextNumber, setNextNumber] = useState(2);

  // Scrool Set Reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* ------------------------------- Change Page ------------------------------ */
  const handleChange = (step) => {
    if (step === "prev" && prevNumber > 0) {
      setPrevNumber(prevNumber - 1);
      setActiveNumber(activeNumber - 1);
      setNextNumber(nextNumber - 1);
      getAllHotelData(activeNumber);
    } else if (step === "next") {
      setPrevNumber(prevNumber + 1);
      setActiveNumber(activeNumber + 1);
      setNextNumber(nextNumber + 1);
      getAllHotelData(activeNumber);
    } else {
      return null;
    }
  };

  // Get Setting Data
  const getAllHotelData = useCallback(async (page_number) => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel/read/all?locale="en"&page_length=20&page_number=${page_number}`,
        // {
        //   crossdomain: true,
        // }
      )
      .then((res) => {
        console.log(res);

        setAllHotel(res.data.page_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (pathname === "/hotel") {
      getAllHotelData(1);
    }
  }, [getAllHotelData, pathname]);

  // Delete Hotel
  const removeData = (dataId) => {
    createRemoveAlert(
      "Delete Hotel!",
      "Are you sure you want to delete the hotel?",
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/hotel/delete/${dataId}`,
            {
              crossdomain: true,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              const updateHotel = allHotel.filter(
                (hotel) => hotel.id !== dataId
              );
              setAllHotel(updateHotel);
            }
            // setAllHotel(res.data.page_data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  const navigate = useNavigate();
  return (
    <main>
      <section className="all-hotel-list">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Hotel</h2>
              </div>
              <div className="search-form">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="edit-area">
            <h6 className="title">Add discaunt</h6>
            <button
              className="add-btn"
              onClick={() => {
                navigate("/hotel-detail");
                setHotelDEtailActiveTab("Hotel Add");
              }}
            >
              Add <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="hotel-info-area">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hotel name</th>
                  <th>Address</th>
                  <th>Active</th>
                  <th>Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                {allHotel.map((hotel) => (
                  <tr key={hotel.id}>
                    <td>{hotel.id}</td>
                    <td>{hotel.hotel_name}</td>
                    <td>{hotel.hotel_address}</td>
                    <td>{hotel.hotel_active ? "Active" : "Disactive"}</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button onClick={() => removeData(hotel.id)}>
                          <img src={trash} alt="trash" />
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/hotel-detail/${hotel.id}`);
                            setHotelDEtailActiveTab("General");
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
            mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
          }
          onClick={() => setMainMneuVisible(false)}
        ></div>
        <div className="pagination">
          <button className="btn prev" onClick={() => handleChange("prev")}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27C26.73 30 29.985 26.745 29.985 21.285V8.715C30 3.255 26.745 0 21.285 0ZM17.685 19.5C18.12 19.935 18.12 20.655 17.685 21.09C17.46 21.315 17.175 21.42 16.89 21.42C16.605 21.42 16.32 21.315 16.095 21.09L10.8 15.795C10.365 15.36 10.365 14.64 10.8 14.205L16.095 8.91C16.53 8.475 17.25 8.475 17.685 8.91C18.12 9.345 18.12 10.065 17.685 10.5L13.185 15L17.685 19.5Z"
                fill=" #AD471F"
              />
            </svg>
          </button>
          {prevNumber !== 0 && (
            <button
              className="btn prev-number"
              onClick={() => handleChange("prev")}
            >
              {prevNumber}
            </button>
          )}
          <button className="btn active">{activeNumber}</button>
          <button
            className="btn next-number"
            onClick={() => handleChange("next")}
          >
            {nextNumber}
          </button>
          <button className="btn next" onClick={() => handleChange("next")}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27C26.73 30 29.985 26.745 29.985 21.285V8.715C30 3.255 26.745 0 21.285 0ZM19.185 15.795L13.89 21.09C13.665 21.315 13.38 21.42 13.095 21.42C12.81 21.42 12.525 21.315 12.3 21.09C11.865 20.655 11.865 19.935 12.3 19.5L16.8 15L12.3 10.5C11.865 10.065 11.865 9.345 12.3 8.91C12.735 8.475 13.455 8.475 13.89 8.91L19.185 14.205C19.635 14.64 19.635 15.36 19.185 15.795Z"
                fill=" #AD471F"
              />
            </svg>
          </button>
        </div>
      </section>
    </main>
    // <main>
    //   <section className="all-hotel-list">
    //     <div className="sub-header">
    //       <div className="container">
    //         <div className="row">
    //           <div className="info">
    //             <button onClick={() => setMainMneuVisible(true)}>
    //               <img src={menuIcon} alt="menu" />
    //             </button>
    //             <h2 className="caption">Hotel</h2>
    //           </div>
    //           <div className="search-form">
    //             <input type="text"  placeholder="Search"  />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="hotel-info-area">
    //       <div className="container">
    //         <table className="table">
    //           <thead>
    //             <tr>
    //               <th>ID</th>
    //               <th>Hotel name</th>
    //               <th>Country</th>
    //               <th>Region</th>
    //               <th>Edit && Delete </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td className="carImg">1111</td>
    //               <td>GARABAG RESORT</td>
    //               <td>Azerbaijan</td>
    //               <td>Naftalan</td>

    //               <td className="edit">
    //                 <div className="btn-area">

    //                 <button>
    //                   <img src={trash} alt="trash" />
    //                 </button>
    //                 <button>
    //                   <img src={edit} alt="edit" />
    //                 </button>
    //                 </div>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //     <div
    //       className={
    //         mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
    //       }
    //       onClick={() => setMainMneuVisible(false)}
    //     ></div>
    //   </section>
    // </main>
  );
};

export default AllHotelList;
