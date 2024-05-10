import React, { useCallback, useContext, useEffect, useState } from "react";
// Icon
import arrowDown from "../../assets/images/icon/arrow-down.svg";
import trash from "../../assets/images/icon/trash.svg";
import { createRemoveAlert } from "../../utils/SweetAlert";
import axios from "axios";
import { MainContext } from "../../utils/MainContext";
import CommentSideBar from "../../components/side-bar-menu/CommentSideBar";
import edit from "../../assets/images/icon/edit.svg";
const MainPageComments = () => {
  // Global State
  const {
    commentData,
    setCommentData,
    selectComent,
    setSelectComent,
    commentSideBarVisible,
    setCommentSideBarVisible,
  } = useContext(MainContext);

  // Local State
  const [prevNumber, setPrevNumber] = useState(0);
  const [activeNumber, setActiveNumber] = useState(1);
  const [nextNumber, setNextNumber] = useState(2);

  // Get Setting Data
  const getnHotelReviewData = useCallback(async (page_number) => {
    console.log(page_number);
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel-review/read/all?page_length=6&page_number=${page_number}`
        // {
        //   crossdomain: true,
        // }
      )
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

    getnHotelReviewData(newActiveNumber);
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
            // if (res.status === 200) {
            //   const update = commentData.filter((item) => item.id !== dataId);
            //   setCommentData(update);
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  // Rendering Data
  useEffect(() => {
    getnHotelReviewData(1);
  }, [getnHotelReviewData]);
  return (
    <div className="main-page-comments">
      <div className="container">
        <div className="comment-area">
          {commentData &&
            commentData.page_data.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="left-side">
                  <div className="profile-img">
                    <img
                      src={`http://naftalan-backend.uptodate.az${comment.review_reviewer_image}`}
                      alt=""
                    />
                  </div>
                  <h3 className="name">{comment.review_reviewer_name}</h3>
                  <h3 className="name">{comment.review_reviewer_origin}</h3>
                  <h3 className="name">{comment.review_reviewer_title}</h3>
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
                  <p className="comment">{comment.review_short_text}</p>
                  <p className="comment">{comment.review_text}</p>
                </div>
                <div className="right-side">
                  <button
                  onClick={() => {
                    setCommentSideBarVisible(true);
                    // setSelectData(currency);
                  }}
                  >
                    <img src={edit} alt="edit" />
                  </button>
                  <button className="trash" onClick={() => removeData()}>
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </div>
            ))}
        </div>
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
      </div>
      <CommentSideBar />
    </div>
  );
};

export default MainPageComments;
