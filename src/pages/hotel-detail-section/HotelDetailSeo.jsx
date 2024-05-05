// React
import { useContext, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import HotelDetailSeoAcordion from "../../components/acordion/HotelDetailSeoAcordion";

const HotelDetailSeo = () => {
  // Global State
  const { setHotelDEtailActiveTab } = useContext(MainContext);
  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [inpValue, setInpValue] = useState("Select Room");
  //   Test List
  const testArr = [
    { id: 1, character: "tv" },
    { id: 2, character: "tv +test" },
    { id: 3, character: "tvvvvvv" },
    { id: 4, character: "tv lgg" },
  ];
  return (
    <div className="hotel-detail-seo">
      <div className="container">
        <div className="select-room">
          <div
            className={`form-group ${
              dropDownVisible ? "select open" : "select"
            } `}
          >
            <label htmlFor="" className="inp-caption">
              Rooms
            </label>
            <input
              type="text"
              value={inpValue}
              className="inp select-inp"
              placeholder="Search and Select Character"
              onClick={() => setDropDownVisible(true)}
            />
            <div
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                setDropDownVisible(!dropDownVisible);
              }}
            >
              <img src={arrowDown} alt="open-close-dropdown" />
            </div>
            <div
              className="select-area"
              style={{ height: dropDownVisible ? 111.6 : 0 }}
            >
              <ul className="select-list scrool">
                {testArr.map((item) => (
                  <li
                    className="select-item"
                    onClick={() => {
                      setDropDownVisible(false);
                      setInpValue(item.character);
                    }}
                    key={item.id}
                  >
                    {item.character}
                  </li>
                ))}

                <p className="alert-text">
                  Room not found, please add a room, try adding again{" "}
                  <button onClick={() => setHotelDEtailActiveTab("Room Add")}>
                    Add Room
                  </button>
                </p>
              </ul>
            </div>
          </div>
        </div>
        <HotelDetailSeoAcordion/>
        
      </div>
    </div>
  );
};

export default HotelDetailSeo;
