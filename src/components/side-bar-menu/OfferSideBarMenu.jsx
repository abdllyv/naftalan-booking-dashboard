// React
import { useContext, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import deleteIcon from "../../assets/images/icon/delete.svg";
const OfferSideBarMenu = () => {
  // Global State
  const { offerVisible, setOfferVisible } = useContext(MainContext);

  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [newData, setNewData] = useState([]);

  //   Test List
  const testArr = [
    { id: 1, character: "tv" },
    { id: 2, character: "tv +test" },
    { id: 3, character: "tvvvvvv" },
    { id: 4, character: "tv lgg" },
  ];

  const suite_pricing_types = [
    { id: 1, character: "per-night" },
    { id: 2, character: "per-person per-night" },
  ];

  const deleteCharacter = (id) => {
    const updatedData = newData.filter((item) => item.id !== id);
    setNewData(updatedData);
  };

  const handleCharacterAddData = (title) => {
    const keyExists = newData.some((item) => {
      return item.title === title;
    });

    if (!keyExists) {
      const newAgeObject = {
        id: "test" + Math.random().toString(36).substring(7),
        title: title,
      };

      setNewData([...newData, newAgeObject]);
    }
  };

  return (
    <div
      className={
        offerVisible
          ? " isOpenMenu atribute-sidebar-menu "
          : "atribute-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Offer</h4>
        <div className="icon" onClick={() => setOfferVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="atribute-form">
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
          <div
            className={`form-group ${
              dropDownVisible ? "select open" : "select"
            } `}
          >
            <label htmlFor="" className="inp-caption">
              Characteristics
            </label>
            <input
              type="text"
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
                      handleCharacterAddData(item.character);
                    }}
                    key={item.id}
                  >
                    {item.character}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="clarifyingArea scrool">
            {newData.map((item) => (
              <div className="clarifying-btn" key={item.id}>
                <span className="text">{item.title}</span>
                <div
                  className="delete"
                  onClick={() => deleteCharacter(item.id)}
                >
                  <img src={deleteIcon} alt="delete" />
                </div>
              </div>
            ))}
          </div>

          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <div className="btn-area">
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferSideBarMenu;
