import React, { useContext } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import HotelDetailGeneral from "./hotel-detail-section/HotelDetailGeneral";
import HotelDetailDescription from "./hotel-detail-section/HotelDetailDescription";
import HotelDetailRooms from "./hotel-detail-section/HotelDetailRooms";
import HotelDetailRoomDetail from "./hotel-detail-section/HotelDetailRoomDetail";
import HotelDEtailPriceListSchedule from "./hotel-detail-section/HotelDEtailPriceListSchedule";
import HotelDEtailPriceList from "./hotel-detail-section/HotelDEtailPriceList";
import HotelDetailSeo from "./hotel-detail-section/HotelDetailSeo";
import HotelDetailRoomAdd from "./hotel-detail-section/HotelDetailRoomAdd";
import { useParams } from "react-router-dom";
const HotelDetail = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    hotelDEtailActiveTab,
    setHotelDEtailActiveTab,
  } = useContext(MainContext);

  // Local State && DataList
  const tabList = [
    { id: 1, tab: "General" },
    { id: 2, tab: "Description" },
    { id: 3, tab: "Rooms" },
    { id: 4, tab: "SEO" },
    { id: 5, tab: "Price list" },
    { id: 6, tab: "Price list schedule" },
  ];

  // // Params
  const { hotelId } = useParams();

  return (
    <main>
      <section className="hotel-detail">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Hotel</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-detail-header">
          <div className="container">
            <ul className="tab-list">
              {hotelDEtailActiveTab !== "Hotel Add" ? (
                tabList.map((menuTab) => (
                  <li
                    className={
                      hotelDEtailActiveTab === menuTab.tab ||
                      (hotelDEtailActiveTab === "Room Detail" &&
                        menuTab.tab === "Rooms") ||
                      (hotelDEtailActiveTab === "Room Add" &&
                        menuTab.tab === "Rooms")
                        ? "tab-item active"
                        : "tab-item"
                    }
                    // className={
                    //   hotelDEtailActiveTab === menuTab.tab
                    //     ? "tab-item active"
                    //     : "tab-item"
                    // }
                    onClick={() => setHotelDEtailActiveTab(menuTab.tab)}
                    key={menuTab.id}
                  >
                    {hotelDEtailActiveTab === "Room Detail" &&
                    menuTab.tab === "Rooms"
                      ? "Room Detail"
                      : hotelDEtailActiveTab === "Room Add" &&
                        menuTab.tab === "Rooms"
                      ? "Room Add"
                      : menuTab.tab}
                  </li>
                ))
              ) : (
                <li className="tab-item active">{hotelDEtailActiveTab}</li>
              )}
            </ul>
          </div>
        </div>
        <div
          className={
            mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible && setMainMneuVisible(false);
          }}
        ></div>
        <div className="hotel-detail-body">
          {hotelDEtailActiveTab === "General" ||
          hotelDEtailActiveTab === "Hotel Add" ? (
            <HotelDetailGeneral />
          ) : hotelDEtailActiveTab === "Description" ? (
            <HotelDetailDescription />
          ) : hotelDEtailActiveTab === "Rooms" ? (
            <HotelDetailRooms />
          ) : hotelDEtailActiveTab === "Room Add" ? (
            <HotelDetailRoomAdd />
          ) : hotelDEtailActiveTab === "Room Detail" ? (
            <HotelDetailRoomDetail />
          ) : hotelDEtailActiveTab === "SEO" ? (
            <HotelDetailSeo />
          ) : hotelDEtailActiveTab === "Price list" ? (
            <HotelDEtailPriceList />
          ) : hotelDEtailActiveTab === "Price list schedule" ? (
            <HotelDEtailPriceListSchedule />
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default HotelDetail;
