// React
import { useCallback, useContext, useEffect, useState } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import deleteIcon from "../../assets/images/icon/delete.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
const AtributesSideBarMenu = () => {
  // Params
  const { hotelId } = useParams();

  // Global State
  const {
    atributeAddAreaVisible,
    setAtributeAddAreaVisible,
    hotelGeneral,
    setHotelGeneral,
  } = useContext(MainContext);

  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [newData, setNewData] = useState([{ id: 7, attribute_name: "pool" }]);
  const [atributeData, setAtributeData] = useState([]);

  const deleteCharacter = (id) => {
    const updatedData = newData.filter((item) => item.id !== id);
    setNewData(updatedData);
  };

  const handleCharacterAddData = (data) => {
    const keyExists = newData.some((item) => {
      return item.id === data.id;
    });
    console.log(keyExists);

    if (!keyExists) {
      setNewData([...newData, data]);
    }
  };

  const gelAllAtribute = useCallback(async () => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel-attribute/read/all`
      )
      .then((res) => {
        setAtributeData(res.data.Room);
      })
      .catch((err) => console.log(err));
  }, []);
  // Set Dropdown Data
  useEffect(() => {
    if (atributeAddAreaVisible) {
      gelAllAtribute();
    }
  }, [atributeAddAreaVisible, gelAllAtribute]);

  const atributes = async (value) => {
    if (value.length > 2) {
      await axios
        .get(
          `http://naftalan-backend.uptodate.az/private/hotel-attribute/read/by-substring/${value}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      gelAllAtribute();
    }
  };

  const putData = () => {
    const body = new FormData();
    // var objKeys = Object.getOwnPropertyNames(data);
    const updatedHotelGeneral = hotelGeneral.map((item) => {
      if (item.title === "hotel_associated_attributes") {
        console.log(item);
        return { ...item, value: `${newData.map((obj) => obj.id).join(",")}` };
      }
      return item;
    });

    updatedHotelGeneral.map((data) => body.append(data.title, data.value));
    console.log(updatedHotelGeneral);
    for (const pair of body.entries()) {
      console.log(pair[0], pair[1]);
    }
    body.delete("hotel_associated_main_image");

    axios
      .put(
        `http://naftalan-backend.uptodate.az/private/hotel/update/${hotelId}`,
        body
      )
      .then((res) => {
        console.log(res);
        // if (res.status === 200) {
        //   toast.info("Data Update!", {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     transition: Bounce,
        //   });
        // }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={
        atributeAddAreaVisible
          ? " isOpenMenu atribute-sidebar-menu "
          : "atribute-sidebar-menu  "
      }
    >
      <div className="head">
        <h4 className="caption">Attributes</h4>
        <div className="icon" onClick={() => setAtributeAddAreaVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="atribute-form">
          {/* <div className="form-group">
            <label htmlFor="" className="inp-caption">
              Characteristics title
            </label>
            <input type="text" className="inp" />
          </div> */}
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
              onChange={(e) => atributes(e.target.value)}
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
                {atributeData.map((item) => (
                  <li
                    className="select-item"
                    onClick={() => {
                      setDropDownVisible(false);
                      handleCharacterAddData(item);
                    }}
                    key={item.id}
                  >
                    {item.attribute_name}
                  </li>
                ))}

                {/* <p className="alert-text">
                  Character not found, please add a character, try searching and
                  adding again <button>Add Character</button>
                </p> */}
              </ul>
            </div>
          </div>
          <div className="clarifyingArea scrool">
            {newData.map((item) => (
              <div className="clarifying-btn" key={item.id}>
                <span className="text">{item.attribute_name}</span>
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
              {/* <button>Cancel</button> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  putData();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtributesSideBarMenu;
