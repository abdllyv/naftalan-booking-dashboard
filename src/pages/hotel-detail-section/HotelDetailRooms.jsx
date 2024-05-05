// Icon
import add from "../../assets/images/icon/add-plus.svg";
import trash from "../../assets/images/icon/trash.svg";
import edit from "../../assets/images/icon/edit.svg";
import { useContext } from "react";
import { MainContext } from "../../utils/MainContext";
const HotelDetailRooms = () => {
  // Global State
  const { setHotelDEtailActiveTab } = useContext(MainContext);
  return (
    <form className="hotel-detail-rooms">
      <div className="container">
        <div className="rooms-head">
          <h2 className="main-caption">Rooms</h2>
          <div className="add-area">
            <h4 className="add-caption">Add room</h4>
            <button
              className="add-btn"
              onClick={() => setHotelDEtailActiveTab("Room Add")}
            >
              Add <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="rooms-body">
          <table className="table">
            <thead>
              <tr>
                <th className="first">Name</th>
                <th className="first">Active</th>
                <th className="edit">Edit && Delete </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="first">1111</td>
                <td className="first">Activated</td>

                <td className="edit">
                  <div className="btn-area">
                    <button>
                      <img src={trash} alt="trash" />
                    </button>
                    <button
                      onClick={() => setHotelDEtailActiveTab("Room Detail")}
                    >
                      <img src={edit} alt="edit" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-footer">
          <div className="handle-area">
            <p className="error-text">asd</p>
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HotelDetailRooms;
