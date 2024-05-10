import React, { useContext } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import MainPageComments from "./comment-section/MainPageComments";
import HotelComments from "./comment-section/HotelComments";
const Comment = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    commentSideBarVisible,
    setCommentSideBarVisible,
    commentData,
    setCommentData,
    selectComent,
    setSelectComent,
    commentActiveTab,
    setCommentActiveTab,
  } = useContext(MainContext);

  // Local State && DataList
  const tabList = [
    { id: 1, tab: "Main page comment" },
    { id: 2, tab: "Hotel comment" },
  ];
  return (
    <main>
      <section className="hotel-detail">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Hotel</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-detail-header">
          <div className="container">
            <ul className="tab-list">
              {tabList.map((menuTab) => (
                <li
                  className={
                    commentActiveTab === menuTab.tab
                      ? "tab-item active"
                      : "tab-item"
                  }
                  onClick={() => setCommentActiveTab(menuTab.tab)}
                  key={menuTab.id}
                >
                  {menuTab.tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={
            mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible && setMainMneuVisible(false);
          }}
        ></div>
        <div className="hotel-detail-body">
          {commentActiveTab === "Main page comment" ? (
            <MainPageComments />
          ) : commentActiveTab === "Hotel comment" ? (
            <HotelComments />
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Comment;
