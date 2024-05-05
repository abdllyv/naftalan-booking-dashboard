import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import menuIcon from "../assets/images/icon/burger-menu.svg";

import { MainContext } from "../utils/MainContext";

const LandingPage = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);

  // Local State
  const [naftalanText, setNaftalanText] = useState("");
  const [bookingText, setBookingText] = useState("");
  const [pageUpload, setPageUpload] = useState(false);
  const naftalan = "Naftalan";
  const booking = "Booking";
  const location = useLocation();

  //   CheckPage
  useEffect(() => {
    setPageUpload(false);
    if (location.pathname) {
      setNaftalanText("");
      setBookingText("");
      setPageUpload(true);
    }
  }, [location.pathname]);

  //   Write Text
  const timerWrite = useCallback(() => {
    for (let i = 0; i < naftalan.length; i++) {
      setTimeout(() => {
        setNaftalanText((prev) => prev + naftalan[i]);
      }, i * 100);
    }

    setTimeout(() => {
      for (let i = 0; i < booking.length; i++) {
        setTimeout(() => {
          setBookingText((prev) => prev + booking[i]);
        }, i * 100);
      }
    }, naftalan.length * 100);
  }, [naftalan, booking]);

  //   Write Control
  useEffect(() => {
    const timer = setTimeout(() => {
      timerWrite();
    });

    return () => clearTimeout(timer);
  }, [timerWrite]);

  return (
    <main>
      <section className="landing-page">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="container">
            <div className="row">
              <p className={pageUpload ? "text up" : "text"}>
                Welcome To <br />
                <span className="naftalan">{naftalanText}</span>{" "}
                <span className="booking">{bookingText}</span>
                <br />
                Dashboard
              </p>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div
          className={
            mainMneuVisible ? "overlay-sub-menu active" : "overlay-sub-menu"
          }
          onClick={() => setMainMneuVisible(false)}
        ></div>
      </section>
    </main>
  );
};

export default LandingPage;
