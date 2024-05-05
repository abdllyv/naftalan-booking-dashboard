import React, { useCallback, useContext, useEffect } from "react";
import { MainContext } from "../utils/MainContext";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import add from "../assets/images/icon/add-plus.svg";
import edit from "../assets/images/icon/edit.svg";
import CouponSideBarMenu from "../components/side-bar-menu/CouponSideBarMenu";
import axios from "axios";
import { createRemoveAlert } from "../utils/SweetAlert";
const CouponCodeOverview = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    couponVisible,
    setCouponVisible,
    couponData,
    setCouponData,
    selectCoupon,
    setSelectCoupon,
  } = useContext(MainContext);

  // Get Logo Data
  const getCouponData = useCallback(async () => {
    await axios
      .get(`http://naftalan-backend.uptodate.az/private/coupon/read/all`, {
        crossdomain: true,
      })
      .then((res) => {
        console.log(res);
        setCouponData(res.data.page_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCouponData]);

  useEffect(() => {
    getCouponData();
  }, [getCouponData]);

  // Delete Coupon
  const removeData = (dataId) => {
    console.log(dataId);
    createRemoveAlert(
      "Delete Coupon!",
      "Are you sure you want to delete the Coupon?",
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/coupon/delete/${dataId}`
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const updateCoupon = couponData.filter(
                (item) => item.id !== dataId
              );
              setCouponData(updateCoupon);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  return (
    <main>
      <section className="coupon-code-overview">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Coupon code overview</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="add-area">
          <div className="container">
            <h6 className="title">Add Coupon Code Overview </h6>
            <button className="add-btn" onClick={() => setCouponVisible(true)}>
              Add <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="coupon-code-overview-body">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th className="first">Name</th>
                  <th className="first"> Period</th>
                  <th className="first">Coupon Percentage Value</th>
                  <th className="first">Code</th>
                  <th className="first">Active</th>

                  <th className="edit">Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                {couponData.map((item) => (
                  <tr key={item.id}>
                    <td className="first">{item.coupon_name}</td>
                    <td className="first">
                      {item.coupon_start} - {item.coupon_end}{" "}
                    </td>
                    <td className="first">{item.coupon_percentage_value}</td>
                    <td className="first">{item.coupon_code}</td>
                    <td className="first">
                      {item.coupon_active ? "Active" : "Disactive"}
                    </td>
                    <td className="edit">
                      <div className="btn-area">
                        <button onClick={() => removeData(item.id)}>
                          <img src={trash} alt="delete" />
                        </button>
                        <button
                          onClick={() => {
                            setCouponVisible(true);
                            setSelectCoupon(item);
                          }}
                        >
                          <img src={edit} alt="edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={
            couponVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : couponVisible
              ? setCouponVisible(false)
              : setSelectCoupon(null);
          }}
        ></div>
        <CouponSideBarMenu />
      </section>
    </main>
  );
};

export default CouponCodeOverview;
