// React
import React, { useCallback, useContext } from "react";

// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

// Component
import EmailSideBarMenu from "../components/side-bar-menu/EmailSideBarMenu";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import add from "../assets/images/icon/add-plus.svg";
import edit from "../assets/images/icon/edit.svg";

const EmailTemplates = () => {
  // Global State
  const { mainMneuVisible, setMainMneuVisible, emailVisible, setEmailVisible } =
    useContext(MainContext);

  // Get Setting Data
  const getEmailData = useCallback(async (page_number) => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/hotel/read/all?locale="en"&page_length=20&page_number=${page_number}`
        // {
        //   crossdomain: true,
        // }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <section className="email-templates">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Email templates</h2>
              </div>
              <div className="search-form">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="add-area">
          <div className="container">
            <h6 className="title">Add Email Templates </h6>
            <button className="add-btn" onClick={() => setEmailVisible(true)}>
              Add <img src={add} alt="add" />
            </button>
          </div>
        </div>
        <div className="email-templates-body">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th className="first">ID</th>
                  <th className="second">Template name</th>
                  <th className="changable-tab">Template content</th>

                  <th className="edit">Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="first">123</td>
                  <td className="second">GARABAG RESORT</td>
                  <td className="changable-tab">
                    Double room, CLUBDouble room, CLUBDouble room, CLUBDouble
                    room, CLUBDouble room, CLUBDouble room, CLUBDouble room,
                    CLUBDouble room, CLUBDouble room, CLUBDouble room,
                    CLUBDouble room, CLUBDouble room, CLUBDouble room, CLUB
                  </td>
                  <td className="edit">
                    <div className="btn-area">
                      <button>
                        <img src={trash} alt="delete" />
                      </button>
                      <button onClick={() => setEmailVisible(true)}>
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
            emailVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : setEmailVisible(false);
          }}
        ></div>
        <EmailSideBarMenu />
      </section>
    </main>
  );
};

export default EmailTemplates;
