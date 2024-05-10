// React
import { useContext } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import addFile from "../../assets/images/icon/add-btn.svg";


// Axois
import axios from "axios";

// Alert
import { createRemoveAlert } from "../../utils/SweetAlert";

const BannerSideBAr = () => {
  // Global State
  const {
    bannerData,
    setBannerData,
    bannerSideBarVisible,
    setBannerSideBarVisible,
    errorBannerText,
    setErrorBannerText,
  } = useContext(MainContext);

  //   //  Delete Folder
  //   const removeData = () => {
  //     createRemoveAlert(
  //       "Delete Folder!",
  //       `Are you sure you want to delete the  Image?`,
  //       "Yes, Remove",
  //       async () => {
  //         await axios
  //           .delete(
  //             `http://naftalan-backend.uptodate.az/private/folder-image/delete/${selectImg.id}`
  //             // {
  //             //   crossdomain: true,
  //             // }
  //           )
  //           .then((res) => {
  //             console.log(res);
  //             // if (res.status === 200) {
  //             //   const updateFolder = folderData.images.filter(
  //             //     (mainFolder) => mainFolder.id !== selectImg.id
  //             //   );
  //             //   setFolderData({ ...folderData, images: updateFolder });
  //             //   setImgSideBarVisible(false);
  //             // }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     );
  //   };
  return (
    <div
      className={
        bannerSideBarVisible
          ? " isOpenMenu file-manager-folder-sidebar-menu "
          : "file-manager-folder-sidebar-menu "
      }
    >
      <div className="head">
        <h4 className="caption">Banner</h4>
        <div className="icon" onClick={() => setBannerSideBarVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="folder-form delete-img" noValidate>
          <div className="image-area">
            {/* <h2 className="main-caption">Main</h2> */}
            <div className="form-group">
              <label htmlFor="add-main-photo" className="add">
                <div className="icon">
                  <img src={addFile} alt="addfile" />
                </div>
                Choose file
              </label>
              <input type="file" name="add-main-photo" id="add-main-photo" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="review_reviewer_name" className="inp-caption">
              Name
            </label>
            <input
              type="text"
              className={"errors.review_reviewer_name" ? "inp error" : "inp"}
              id="review_reviewer_name"
              name="review_reviewer_name"
              //   onChange={() => errorText !== "" && setErrorText("")}
              //   {...register("review_reviewer_name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review_reviewer_name" className="inp-caption">
              Url
            </label>
            <input
              type="text"
              className={"errors.review_reviewer_name" ? "inp error" : "inp"}
              id="review_reviewer_name"
              name="review_reviewer_name"
              //   onChange={() => errorText !== "" && setErrorText("")}
              //   {...register("review_reviewer_name")}
            />
          </div>
          <div className="folder-img">
            <img src={`http://naftalan-backend.uptodate.az`} alt="img" />
          </div>

          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <div className="btn-area">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //   removeData();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerSideBAr;
