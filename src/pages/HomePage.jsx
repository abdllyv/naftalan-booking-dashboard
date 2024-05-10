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
import Banner from "./home-page-section/Banner";
// import { useParams } from "react-router-dom";

const HomePage = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    homeActiveTab,
    setHomeActiveTab,
  } = useContext(MainContext);

  // Local State && DataList
  const tabList = [
    { id: 1, tab: "Banner" },
    { id: 2, tab: "Dinamic page" },
    { id: 3, tab: "Naftalan History" },
    { id: 4, tab: "Diseases" },
    { id: 5, tab: "FAQ" },
    { id: 6, tab: "Fav" },
  ];

  // // Params
  // const { hotelId } = useParams();

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
                <h2 className="caption">Home</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-detail-header">
          <div className="container">
            <ul className="tab-list">
              {homeActiveTab !== "Hotel Add" ? (
                tabList.map((menuTab) => (
                  <li
                    className={
                      homeActiveTab === menuTab.tab ||
                      (homeActiveTab === "Room Detail" &&
                        menuTab.tab === "Rooms") ||
                      (homeActiveTab === "Room Add" && menuTab.tab === "Rooms")
                        ? "tab-item active"
                        : "tab-item"
                    }
                    // className={
                    //   hotelDEtailActiveTab === menuTab.tab
                    //     ? "tab-item active"
                    //     : "tab-item"
                    // }
                    onClick={() => setHomeActiveTab(menuTab.tab)}
                    key={menuTab.id}
                  >
                    {homeActiveTab === "Room Detail" && menuTab.tab === "Rooms"
                      ? "Room Detail"
                      : homeActiveTab === "Room Add" && menuTab.tab === "Rooms"
                      ? "Room Add"
                      : menuTab.tab}
                  </li>
                ))
              ) : (
                <li className="tab-item active">{homeActiveTab}</li>
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
          {homeActiveTab === "Banner"  ? (
            <Banner />
          ) : homeActiveTab === "Description" ? (
            <HotelDetailDescription />
          ) : homeActiveTab === "Rooms" ? (
            <HotelDetailRooms />
          ) : homeActiveTab === "Room Add" ? (
            <HotelDetailRoomAdd />
          ) : homeActiveTab === "Room Detail" ? (
            <HotelDetailRoomDetail />
          ) : homeActiveTab === "SEO" ? (
            <HotelDetailSeo />
          ) : homeActiveTab === "Price list" ? (
            <HotelDEtailPriceList />
          ) : homeActiveTab === "Price list schedule" ? (
            <HotelDEtailPriceListSchedule />
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
