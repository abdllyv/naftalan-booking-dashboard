// React
import React, { useCallback, useContext, useEffect, useState } from "react";

// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

// Component
import NewsletterSideBarMenu from "../components/side-bar-menu/NewsletterSideBarMenu";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import trash from "../assets/images/icon/trash.svg";
import add from "../assets/images/icon/add-plus.svg";
import edit from "../assets/images/icon/edit.svg";
import exportIcon from "../assets/images/icon/export.svg";

const NewsLetter = () => {
  // Global State
  const {
    mainMneuVisible,
    setMainMneuVisible,
    newsletterVisible,
    setNewsletterVisible,
    newsletterData,
    setNewsletterData,
    setSelectNewsletter,
  } = useContext(MainContext);

  //   Local State
  const [type, setType] = useState("");
  const [prevNumber, setPrevNumber] = useState(0);
  const [activeNumber, setActiveNumber] = useState(1);
  const [nextNumber, setNextNumber] = useState(2);

  // Get Setting Data
  const getnewsletterData = useCallback(
    async (page_number) => {
      console.log(page_number);
      await axios
        .get(
          `http://naftalan-backend.uptodate.az/private/newsletter-member/read/all?locale="en"&page_length=20&page_number=${page_number}`
          // {
          //   crossdomain: true,
          // }
        )
        .then((res) => {
          setNewsletterData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [setNewsletterData]
  );

  const handleDownload = async () => {
    await axios
      .get(
        `http://naftalan-backend.uptodate.az/private/newsletter-member/export`,
        { responseType: "blob" }
      )
      .then((response) => {
        // Yanıtı Blob olarak al
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });

        // Blob'u URL'e dönüştürme
        const url = window.URL.createObjectURL(blob);

        // Bir <a> etiketi oluşturma
        const a = document.createElement("a");
        a.href = url;
        a.download = "genel_veri.xlsx"; // İndirilecek dosyanın adı

        // <a> etiketini tıklama
        a.click();

        // Kullanılmayan URL'yi temizleme
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Veri alınamadı:", error);
      });
  };

  // Get Request
  useEffect(() => {
    getnewsletterData(activeNumber);
  }, [activeNumber, getnewsletterData]);

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

    getnewsletterData(newActiveNumber);
  };

  return (
    <main>
      <section className="newsletter-member">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Newsletter Member</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="add-area">
          <div className="container">
            <div className="top">
              <div className="add-btn-area">
                <h6 className="title">Add newsletter member </h6>
                <button
                  className="add-btn"
                  onClick={() => {
                    setNewsletterVisible(true);
                    setType("create");
                  }}
                >
                  Add <img src={add} alt="add" />
                </button>
              </div>
              <button className="download" onClick={() => handleDownload()}>
                Exsport to Excel <img src={exportIcon} alt="export" />
              </button>
            </div>
          </div>
        </div>
        <div className="newsletter-member-body">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th className="first">ID</th>
                  <th className="second">Mail</th>
                  <th className="edit">Edit && Delete </th>
                </tr>
              </thead>
              <tbody>
                {newsletterData &&
                  newsletterData.page_data.map((newsletter) => (
                    <tr key={newsletter.id}>
                      <td className="first">{newsletter.id}</td>
                      <td className="second">{newsletter.member_email}</td>

                      <td className="edit">
                        <div className="btn-area">
                          <button>
                            <img src={trash} alt="delete" />
                          </button>
                          <button
                            onClick={() => {
                              setNewsletterVisible(true);
                              setSelectNewsletter(newsletter);
                              setType("edit");
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
              {newsletterData && newsletterData.page_has_next && (
                <button
                  className="btn next-number"
                  onClick={() => handleChange("next")}
                >
                  {nextNumber}
                </button>
              )}

              {newsletterData && (
                <button
                  className="btn next"
                  disabled={!newsletterData.page_has_next}
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
        </div>
        <div
          className={
            newsletterVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : setNewsletterVisible(false);
          }}
        ></div>
        <NewsletterSideBarMenu type={type} />
      </section>
    </main>
  );
};

export default NewsLetter;
