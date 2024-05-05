import React, { useContext, useState } from "react";
import HotelDetailRoomDetailAcordion from "../../components/acordion/HotelDetailRoomDetailAcordion";
import { MainContext } from "../../utils/MainContext";

// Icon
import add from "../../assets/images/icon/add-plus.svg";
import addFile from "../../assets/images/icon/add-btn.svg";
import AtributesSideBarMenu from "../../components/side-bar-menu/AtributesSideBarMenu";
import ImageCard from "../../components/ImageCard";
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import OfferSideBarMenu from "../../components/side-bar-menu/OfferSideBarMenu";

const HotelDetailRoomDetail = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    atributeAddAreaVisible,
    setAtributeAddAreaVisible,
    offerVisible,
    setOfferVisible,
  } = useContext(MainContext);

  const [dropDownVisible, setDropDownVisible] = useState(null);
  const suite_types = [
    { id: 1, character: "single-suite" },
    { id: 2, character: "double-suite" },
    { id: 3, character: "family-suite" },
    { id: 4, character: "executive-suite" },
    { id: 5, character: "presidential-suite" },
  ];
  const suite_pricing_types = [
    { id: 1, character: "per-night" },
    { id: 2, character: "per-person per-night" },
  ];

  return (
    <div className="hotel-detail-room-detail">
      <div className="container">
        <form action="" className="room-main-form">
          <div className="inp-area">
            <div className="form-group">
              <label htmlFor="">Room Name</label>
              <input type="text" className="inp" />
            </div>
            <div
              className={`form-group ${
                dropDownVisible === "type" ? "select open" : "select"
              } `}
            >
              <label htmlFor="suit-type" className="inp-caption">
                Suit Type
              </label>
              <input
                type="text"
                id="suit-type"
                name="suit-type"
                // value={inpValue}
                readOnly
                className="inp select-inp"
                placeholder="Search and Select Character"
                onClick={() =>
                  setDropDownVisible(dropDownVisible === "type" ? null : "type")
                }
              />
              <div className="icon">
                <img src={arrowDown} alt="open-close-dropdown" />
              </div>
              <div
                className="select-area"
                style={{ height: dropDownVisible ? 120 : 0 }}
              >
                <ul className="select-list scrool">
                  {suite_types.map((item) => (
                    <li
                      className="select-item"
                      onClick={(e) => {
                        e.target.parentElement.parentElement.parentElement.children[1].setAttribute(
                          "value",
                          item.character
                        );
                        setDropDownVisible(false);
                      }}
                      key={item.id}
                    >
                      {item.character}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className={`form-group ${
                dropDownVisible === "pricing_types" ? "select open" : "select"
              } `}
            >
              <label htmlFor=" pricing_types" className="inp-caption">
                Suite Pricing Types
              </label>
              <input
                type="text"
                id="pricing_types"
                name="pricing_types"
                readOnly
                className="inp select-inp"
                placeholder="Select"
                onClick={() =>
                  setDropDownVisible(
                    dropDownVisible === "pricing_types" ? null : "pricing_types"
                  )
                }
              />
              <div
                className="icon"
                onClick={() =>
                  setDropDownVisible(
                    dropDownVisible === "pricing_types" ? null : "pricing_types"
                  )
                }
              >
                <img src={arrowDown} alt="open-close-dropdown" />
              </div>
              <div
                className="select-area"
                style={{
                  height: dropDownVisible === "pricing_types" ? 120 : 0,
                }}
              >
                <ul className="select-list scrool">
                  {suite_pricing_types.map((item) => (
                    <li
                      className="select-item"
                      onClick={(e) => {
                        e.target.parentElement.parentElement.parentElement.children[1].setAttribute(
                          "value",
                          item.character
                        );
                        setDropDownVisible(false);
                      }}
                      key={item.id}
                    >
                      {item.character}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Max Capacity</label>
              <input type="text" className="inp" />
            </div>
            <div className="form-group">
              <label htmlFor="">Min Capacity</label>
              <input type="text" className="inp" />
            </div>

            <div className="form-group">
              <label htmlFor="">Adition Guest After</label>
              <input type="text" className="inp" />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="offer-active" className="inp-caption">
                Activated {""}
              </label>
              <label htmlFor="offer-active" className="switch">
                <input type="checkbox" id="offer-active" className="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </form>
        <div className="artibute-area">
          <div className="atribute-head">
            <h2 className="main-caption">Offer</h2>
            <div className="add-area">
              <h4 className="add-caption">Add offer</h4>{" "}
              <button className="add-btn" onClick={() => setOfferVisible(true)}>
                Add <img src={add} alt="add" />
              </button>
            </div>
          </div>
          <div className="atribute-body">
            <div className="character-list">
              <h4 className="list-title">Free Night</h4>
              <ul className="list">
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
              </ul>
            </div>
            <div className="character-list">
              <h4 className="list-title">Persentage Night</h4>
              <ul className="list">
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
                <li className="list-item">Input</li>
              </ul>
            </div>
          </div>
          <OfferSideBarMenu />
          <div
            className={
              atributeAddAreaVisible || mainMneuVisible || offerVisible
                ? "overlay-sub-menu active"
                : "overlay-sub-menu"
            }
            onClick={() => {
              mainMneuVisible
                ? setMainMneuVisible(false)
                : atributeAddAreaVisible
                ? setAtributeAddAreaVisible(false)
                : setOfferVisible(false);
            }}
          ></div>
        </div>
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

        <div className="image-area">
          <h2 className="main-caption">Photos </h2>
          <div className="form-group">
            <button className="add">
              <div className="icon">
                <img src={addFile} alt="addfile" />
              </div>
              File Manage
            </button>
          </div>
          <div className="img-cards-area">
            <ImageCard />
            <ImageCard />
            <ImageCard />
          </div>
        </div>
        <div className="form-footer">
          <div className="handle-area">
            <p className="error-text">asd</p>
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
        <div className="discription-area">
          <h2 className="main-caption">Room Description</h2>
          <HotelDetailRoomDetailAcordion />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailRoomDetail;
