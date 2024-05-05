import React, { useState } from "react";
// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
const HotelDetailRoomAdd = () => {
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
    <div className="hotel-detai-room-add">
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
      </div>
    </div>
  );
};

export default HotelDetailRoomAdd;
