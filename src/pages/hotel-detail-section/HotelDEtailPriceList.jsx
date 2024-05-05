// React
import { useContext, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import add from "../../assets/images/icon/add-plus.svg";
import trash from "../../assets/images/icon/trash.svg";
import edit from "../../assets/images/icon/edit.svg";
import PriceListSidebarMenu from "../../components/side-bar-menu/PriceListSidebarMenu";
const HotelDEtailPriceList = () => {
  // Global State
  const { priceListVisible, setPriceListVisible,setHotelDEtailActiveTab ,  mainMneuVisible,setMainMneuVisible} = useContext(MainContext);

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
    <div className="hotel-detail-price-list">
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
              readOnly
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
                  Room not found, please add a room, try 
                  adding again <button  onClick={()=>setHotelDEtailActiveTab("Room Add")} >Add Room</button>
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div className="price-list-tab">
          <div className="tab-head">
            <div className="tab-caption">Standart</div>
            <div className="tab-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="first-line"></th>
                    <th className="main-tab">Min. ps</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Max. ng</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>

                    <th className="edit">Edit && Delete </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button onClick={() => setPriceListVisible(true)}>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="add-btn"
              onClick={() => setPriceListVisible(true)}
            >
              Add line <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="price-list-tab">
          <div className="tab-head">
            <div className="tab-caption">Minor</div>
            <div className="tab-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="first-line"></th>
                    <th className="main-tab">Min. age</th>
                    <th className="main-tab">Max. age</th>
                    <th className="main-tab">Min. ps</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Max. ng</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>

                    <th className="edit">Edit && Delete </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button onClick={() => setPriceListVisible(true)}>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
         
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button onClick={() => setPriceListVisible(true)}>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
         
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button onClick={() => setPriceListVisible(true)}>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
         
                </tbody>
              </table>
            </div>
            <button
              className="add-btn"
              onClick={() => setPriceListVisible(true)}
            >
              Add line <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="price-list-tab">
          <div className="tab-head">
            <div className="tab-caption">Minor</div>
            <div className="tab-body">
              <table className="table">
                <thead>
                  <tr>
                    <th className="first-line"></th>
                    <th className="main-tab">Min. ps</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Min. ng</th>
                    <th className="main-tab">Max. ng</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>
                    <th className=" changable-tab">01 02 2023 - 01 03 2023</th>

                    <th className="edit">Edit && Delete </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button onClick={() => setPriceListVisible(true)}>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="first-line"></td>
                    <td className="main-tab">1111</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="main-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>
                    <td className="changable-tab">5</td>

                    <td className="edit">
                      <div className="btn-area">
                        <button>
                          <img src={trash} alt="trash" />
                        </button>
                        <button>
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="add-btn"
              onClick={() => setPriceListVisible(true)}
            >
              Add line <img src={add} alt="add" />
            </button>
          </div>
        </div>
      </div>
      <PriceListSidebarMenu />
      <div
        className={
            priceListVisible || mainMneuVisible
            ? "overlay-sub-menu active"
            : "overlay-sub-menu"
        }
        onClick={() => {
          mainMneuVisible
            ? setMainMneuVisible(false)
            : setPriceListVisible(false);
        }}
      ></div>
    </div>
  );
};

export default HotelDEtailPriceList;
