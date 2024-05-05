import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../utils/MainContext";

// Icon
import add from "../../assets/images/icon/add-plus.svg";
import addFile from "../../assets/images/icon/add-btn.svg";
import AtributesSideBarMenu from "../../components/side-bar-menu/AtributesSideBarMenu";
import HotelDetailDescriptoinAcordion from "../../components/acordion/HotelDetailDescriptoinAcordion";
import ImageCard from "../../components/ImageCard";
import axios from "axios";

const HotelDetailDescription = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    atributeAddAreaVisible,
    setAtributeAddAreaVisible,
    // hotelDEtailActiveTab,
    // hotelGeneral,
    // setHotelGeneral,
  } = useContext(MainContext);

  // // Local State
  // const [updateState, setUpdateState] = useState(true);
  //   // getData
  //   useEffect(() => {
  //     if (hotelDEtailActiveTab === "Description") {
  //       axios
  //         .get(
  //           `http://naftalan-backend.uptodate.az/private/hotel/read/${hotelId}`
  //         )
  //         .then((res) => {
  //           // setValue("hotel_name", res.data.hotel_name);
  //           // setValue("hotel_type", res.data.hotel_type);
  //           // setValue("hotel_active", res.data.hotel_active);
  //           // setValue("hotel_offer_category", res.data.hotel_offer_category);
  //           // setValue("hotel_phone", res.data.hotel_phone);
  //           // setValue("hotel_email", res.data.hotel_email);
  //           // setValue("hotel_address", res.data.hotel_address);
  //           // setValue("hotel_priority_rating", res.data.hotel_priority_rating);
  //           // setValue("hotel_infant_age", res.data.hotel_infant_age);
  //           // setValue("hotel_star_rating", res.data.hotel_star_rating);
  //           // setValue("hotel_fax", res.data.hotel_fax);
  //           var objKeys = Object.getOwnPropertyNames(res.data);
  
  //           if (updateState) {
  //             const updatedHotelGeneral = hotelGeneral.map((item) => {
  //               if (objKeys.includes(item.title)) {
  //                 return { ...item, value: res.data[item.title] }; // value'sini "set" olarak güncelle
  //               }
  //               return item;
  //             });
  //             setHotelGeneral(updatedHotelGeneral);
  //             setUpdateState(false);
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, [hotelGeneral, hotelId, setHotelGeneral, setValue, updateState]);

  return (
    <div className="hotel-detail-description">
      <div className="container">
        <div className="artibute-area">
          <div className="atribute-head">
            <h2 className="main-caption">Attributes</h2>
            <div className="add-area">
              <h4 className="add-caption">Add attributes</h4>{" "}
              <button
                className="add-btn"
                onClick={() => setAtributeAddAreaVisible(true)}
              >
                Add <img src={add} alt="add" />
              </button>
            </div>
          </div>
          <div className="atribute-body">
            <div className="character-list">
              <h4 className="list-title">Title</h4>
              <ul className="list">
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
              </ul>
            </div>
          </div>
          <AtributesSideBarMenu />
          <div
            className={
              atributeAddAreaVisible || mainMneuVisible
                ? "overlay-sub-menu active"
                : "overlay-sub-menu"
            }
            onClick={() => {
              mainMneuVisible
                ? setMainMneuVisible(false)
                : setAtributeAddAreaVisible(false);
            }}
          ></div>
        </div>
        <div className="discription-area">
          <h2 className="main-caption">Description & Short description</h2>
          <HotelDetailDescriptoinAcordion />
        </div>
        <div className="image-area">
          <h2 className="main-caption">Main</h2>
          <div className="form-group">
            <label htmlFor="add-main-photo" className="add">
              <div className="icon">
                <img src={addFile} alt="addfile" />
              </div>
              Choose file
            </label>
            <input type="file" name="add-main-photo" id="add-main-photo" />
          </div>
          <div className="img-cards-area">
            <ImageCard/>
          </div>

          <h2 className="main-caption">Additional photo</h2>
          <div className="form-group">
            <button className="add">
              <div className="icon">
                <img src={addFile} alt="addfile" />
              </div>
              File Manage
            </button>
          </div>
          <div className="img-cards-area">
            <ImageCard/>
            <ImageCard/>
            <ImageCard/>
          </div>
        </div>
        <div className="map-area">
          <h2 className="main-caption">Map</h2>
          <div className="form-group">
            <label htmlFor="">Map link</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-footer">
            <div className="handle-area">
              <p className="error-text">asd</p>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
      </div>

    </div>
  );
};

export default HotelDetailDescription;
