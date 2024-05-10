import React, { useCallback, useEffect, useState } from "react";
// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import trash from "../../assets/images/icon/trash.svg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createRemoveAlert } from "../../utils/SweetAlert";
const HotelComments = () => {
  // Local State
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [prevNumber, setPrevNumber] = useState(0);
  const [activeNumber, setActiveNumber] = useState(1);
  const [nextNumber, setNextNumber] = useState(2);
  const [listData, setListData] = useState([]);
  const [commentData, setCommentData] = useState(null);
  const [hotelId, setHotelId] = useState(0);

  const getAllHotel = useCallback(async () => {
    await axios
      .get(
        "http://naftalan-backend.uptodate.az/private/hotel/read/all?locale=en&page_length=10&page_number=1"
      )
      .then((res) => setListData(res.data.page_data))
      .catch((err) => console.log(err));
  }, []);
  const searchHotel = useCallback(async (inputValue) => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel/read/by-substring/${inputValue}?locale=en`
      )
      .then((res) => setListData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // React hook form
  const { register, setValue } = useForm();

  const dataController = (inp) => {
    if (inp.trim().length > 2) {
      searchHotel(inp);
    } else {
      getAllHotel();
    }
  };

  useEffect(() => {
    getAllHotel();
  }, [getAllHotel]);

  //   Get Comment Request
  const getComment = useCallback(
    async (page_number, id) => {
      await axios
        .get(
          `http://naftalan-backend.uptodate.az/private/hotel-user-review/read/by-hotel/${
            id ? id : hotelId
          }?page_length=1&page_number=${page_number}`
        )
        .then((res) => {
          console.log(res);
          setCommentData(res.data);
        })
        .catch((err) => console.log(err));
    },
    [hotelId]
  );

  const dataActivated = async (value, data) => {
    console.log(value);
    const body = new FormData();
    body.append("review_approval_status", value);
    body.append("review_locale", data.review_locale);
    body.append("review_text", data.review_text);
    body.append("review_star_rating", data.review_star_rating);
    body.append("review_reviewer_name", data.review_reviewer_name);
    body.append("review_associated_hotel", data.review_associated_hotel);
    axios
      .put(
        `http://naftalan-backend.uptodate.az/private/hotel-user-review/update/${data.id}`,
        body,
        {
          crossdomain: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // Delete Coupon
  const removeData = (dataId, name) => {
    console.log(dataId);
    createRemoveAlert(
      "Delete Coupon!",
      `Are you sure you want to delete the ${name} Comment?`,
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/hotel-user-review/delete/${dataId}`
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const update = commentData.filter((item) => item.id !== dataId);
              setCommentData(update);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  /* ------------------------------- Change Page ------------------------------ */

  const handleChange = (step) => {
    let newPrevNumber = prevNumber;
    let newActiveNumber = activeNumber;
    let newNextNumber = nextNumber;

    if (step === "prev" && prevNumber > 0) {
      newPrevNumber = prevNumber - 1;
      newActiveNumber = activeNumber - 1;
      newNextNumber = nextNumber - 1;
    } else {
      newPrevNumber = prevNumber + 1;
      newActiveNumber = activeNumber + 1;
      newNextNumber = nextNumber + 1;
    }

    setPrevNumber(newPrevNumber);
    setActiveNumber(newActiveNumber);
    setNextNumber(newNextNumber);

    getComment(newActiveNumber);
  };
  console.log(commentData);

  return (
    <div className="hotel-comments">
      <div className="container">
        <div className="select-hotel">
          <div
            className={`form-group ${
              dropDownVisible ? "select open" : "select"
            } `}
          >
            <label htmlFor="inp_value" className="inp-caption">
              Rooms
            </label>
            <input
              type="text"
              //   value={inpValue}
              name="inp_value"
              id="inp_value"
              className="inp select-inp"
              placeholder="Search and Select Character"
              {...register("inp_value")}
              onChange={(e) => dataController(e.target.value)}
              onClick={() => setDropDownVisible(true)}
              autoComplete="off"
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
              style={{
                height: dropDownVisible
                  ? listData.length > 3
                    ? 111.6
                    : listData.length * 38
                  : 0,
              }}
            >
              <ul className="select-list scrool">
                {listData.map((item) => (
                  <li
                    className="select-item"
                    onClick={() => {
                      setDropDownVisible(false);
                      setValue("inp_value", item.hotel_name);
                      setHotelId(item.id);
                      getComment(activeNumber, item.id);
                    }}
                    key={item.id}
                  >
                    {item.hotel_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {commentData && (
          <div className="comment-area">
            {commentData?.page_data.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="left-side">
                  <h3 className="name">{comment.review_reviewer_name}</h3>
                  <div className="evaluation">
                    {Array.from({ length: 5 }, (_, index) => (
                      <div
                        key={index}
                        className={
                          comment.review_star_rating >= index + 1
                            ? "icon selectStar"
                            : "icon"
                        }
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            stroke="#FFAA00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="comment">{comment.review_text}</p>
                </div>
                <div className="right-side">
                  <div className="edit">
                    <div className="form-group checkbox-group">
                      <label
                        htmlFor={`active${comment.id}`}
                        className="inp-caption"
                      >
                        Deactive {""}
                      </label>
                      <label htmlFor={`active${comment.id}`} className="switch">
                        <input
                          type="checkbox"
                          id={`active${comment.id}`}
                          name={`active${comment.id}`}
                          // value={comment.review_approval_status}
                          // checked={comment.review_approval_status}
                          defaultChecked={comment.review_approval_status}
                          // onChange={() => dataActivated(comment)}
                          onChange={(e) =>
                            dataActivated(e.target.checked, comment)
                          }
                          className="checkbox"
                        />
                        <span className="slider round"></span>
                      </label>
                      <label
                        htmlFor={`active${comment.id}`}
                        className="inp-caption"
                      >
                        Active {""}
                      </label>
                    </div>
                  </div>
                  <button
                    className="trash"
                    onClick={() =>
                      removeData(comment.id, comment.review_reviewer_name)
                    }
                  >
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {commentData && (
          <div className="pagination">
            <button className="btn prev" onClick={() => handleChange("prev")}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27C26.73 30 29.985 26.745 29.985 21.285V8.715C30 3.255 26.745 0 21.285 0ZM17.685 19.5C18.12 19.935 18.12 20.655 17.685 21.09C17.46 21.315 17.175 21.42 16.89 21.42C16.605 21.42 16.32 21.315 16.095 21.09L10.8 15.795C10.365 15.36 10.365 14.64 10.8 14.205L16.095 8.91C16.53 8.475 17.25 8.475 17.685 8.91C18.12 9.345 18.12 10.065 17.685 10.5L13.185 15L17.685 19.5Z"
                  fill=" #AD471F"
                />
              </svg>
            </button>
            {prevNumber !== 0 && (
              <button
                className="btn prev-number"
                onClick={() => handleChange("prev")}
              >
                {prevNumber}
              </button>
            )}
            <button className="btn active">{activeNumber}</button>
            {commentData && commentData.page_has_next && (
              <button
                className="btn next-number"
                onClick={() => handleChange("next")}
              >
                {nextNumber}
              </button>
            )}

            {commentData && (
              <button
                className="btn next"
                disabled={!commentData.page_has_next}
                onClick={() => handleChange("next")}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27C26.73 30 29.985 26.745 29.985 21.285V8.715C30 3.255 26.745 0 21.285 0ZM19.185 15.795L13.89 21.09C13.665 21.315 13.38 21.42 13.095 21.42C12.81 21.42 12.525 21.315 12.3 21.09C11.865 20.655 11.865 19.935 12.3 19.5L16.8 15L12.3 10.5C11.865 10.065 11.865 9.345 12.3 8.91C12.735 8.475 13.455 8.475 13.89 8.91L19.185 14.205C19.635 14.64 19.635 15.36 19.185 15.795Z"
                    fill=" #AD471F"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelComments;
