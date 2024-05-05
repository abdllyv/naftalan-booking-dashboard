import { useContext, useState } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import edit from "../assets/images/icon/edit.svg";
import add from "../assets/images/icon/add-plus.svg";
import arrow from "../assets/images/icon/arrow-left.svg";

const Discount = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  //   Local State
  const [currentTab, setCurrentTab] = useState("night");
  const [discountDetail, setDiscountDetail] = useState(false);
  return (
    <main>
      <section className="discount">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Discount</h2>
              </div>
              <div className="search-form">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="discount-header">
          <div className="container">
            <ul className="tab-list">
              <li
                className={
                  currentTab === "night" ? "tab-item active" : "tab-item"
                }
                onClick={() => setCurrentTab("night")}
              >
                Free night
              </li>
              <li
                className={
                  currentTab === "persentage" ? "tab-item active" : "tab-item"
                }
                onClick={() => setCurrentTab("persentage")}
              >
                Offer persentage
              </li>
            </ul>
            <div className="edit-area">
              <h6 className="title">Add discaunt</h6>
              <button
                className="add-btn"
                onClick={() => setDiscountDetail(true)}
              >
                Add <img src={add} alt="add" />
              </button>
            </div>
          </div>
        </div>
        <div className="discount-info-area">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Offer name</th>
                  <th>Period</th>
                  <th>
                    {currentTab === "night" ? "Free night quantity" : "Value"}
                  </th>
                  <th>Travel dates</th>
                  <th>Active</th>
                  <th>Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="carImg">1111</td>
                  <td>Double room, CLUB</td>
                  <td>12/12/2023-15/12/2023</td>
                  <td>1</td>
                  <td>Disactive</td>
                  <td>Active</td>

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
        </div>
        <div
          className={
            discountDetail || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : setDiscountDetail(false);
          }}
        ></div>
        <div
          className={
            discountDetail
              ? " isOpenMenu sidebar-discount-menu "
              : "sidebar-discount-menu  "
          }
        >
          <div className="head">
            <h4 className="caption">Discount</h4>
            <div className="icon" onClick={() => setDiscountDetail(false)}>
              <img src={arrow} alt=" close" />
            </div>
          </div>
          <div className="body">
            <form action="" className="discount-form">
              <div className="form-group">
                <label htmlFor="" className="inp-caption">
                  Offer name
                </label>
                <input type="text" className="inp" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="inp-caption">
                  Offer start
                </label>
                <input type="date" className="inp" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="inp-caption">
                  Offer end
                </label>
                <input type="date" className="inp" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="inp-caption">
                  Period
                </label>
                <input type="text" className="inp" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="inp-caption">
                  {" "}
                  {currentTab === "night" ? "Free night quantity" : "Value"}
                </label>
                <input type="text" className="inp" />
              </div>
              <div className="form-group">
                <label htmlFor="offer-active" className="inp-caption">
                  Offer active
                </label>
                <label htmlFor="offer-active" class="switch">
                  <input
                    type="checkbox"
                    id="offer-active"
                    className="checkbox"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="offer-travel" className="inp-caption">
                  Offer travel dates must be within offer dates
                </label>
                <label htmlFor="offer-travel" class="switch">
                  <input
                    type="checkbox"
                    id="offer-travel"
                    className="checkbox"
                  />
                  <span class="slider round"></span>
                </label>
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
      </section>
    </main>
  );
};

export default Discount;
