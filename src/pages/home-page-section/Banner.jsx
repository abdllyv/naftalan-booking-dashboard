// Icon
import trash from "../../assets/images/icon/trash.svg";
import add from "../../assets/images/icon/add-plus.svg";
import edit from "../../assets/images/icon/edit.svg";
import BannerSideBAr from "../../components/side-bar-menu/BannerSideBAr";
import { useContext } from "react";
import { MainContext } from "../../utils/MainContext";

const Banner = () => {
  // Global State
  const {
    bannerData,
    setBannerData,
    bannerSideBarVisible,
    setBannerSideBarVisible,
    errorBannerText,
    setErrorBannerText,
  } = useContext(MainContext);

  return (
    <section className="banner">
      <div className="container">
        <div className="edit-area">
          <h6 className="title">Add Banner</h6>
          <button
            className="add-btn"
            onClick={() => {
              setBannerSideBarVisible(true);
              //   setType("create");
            }}
          >
            Add <img src={add} alt="add" />
          </button>
        </div>
        <div className="banner-body">
          <table className="table">
            <thead>
              <tr>
                <th className="first">ID</th>
                <th className="second">name</th>
                <th className="edit">Edit && Delete </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="first">1</td>
                <td className="second">test</td>

                <td className="edit">
                  <div className="btn-area">
                    <button>
                      <img src={trash} alt="delete" />
                    </button>
                    <button
                    // onClick={() => {
                    //   setNewsletterVisible(true);
                    //   setSelectNewsletter(newsletter);
                    //   setType("edit");
                    // }}
                    >
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
          bannerSideBarVisible 
            ? "overlay-sub-menu active"
            : "overlay-sub-menu"
        }
        onClick={() => {
          setBannerSideBarVisible(false);
        }}
      ></div>
      <BannerSideBAr />
    </section>
  );
};

export default Banner;
