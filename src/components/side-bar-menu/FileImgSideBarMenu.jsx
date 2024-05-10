// React
import { useContext } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";

// Axois
import axios from "axios";

// Alert
import { createRemoveAlert } from "../../utils/SweetAlert";
const FileImgSideBarMenu = ({ selectImg }) => {
  // Global State
  const { imgSideBarVisible, setImgSideBarVisible, folderData, setFolderData } =
    useContext(MainContext);

  //  Delete Folder
  const removeData = () => {
    createRemoveAlert(
      "Delete Folder!",
      `Are you sure you want to delete the  Image?`,
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/folder-image/delete/${selectImg.id}`
            // {
            //   crossdomain: true,
            // }
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const updateFolder = folderData.images.filter(
                (mainFolder) => mainFolder.id !== selectImg.id
              );
              setFolderData({ ...folderData, images: updateFolder });
              setImgSideBarVisible(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  return (
    <div
      className={
        imgSideBarVisible
          ? " isOpenMenu file-manager-folder-sidebar-menu "
          : "file-manager-folder-sidebar-menu "
      }
    >
      <div className="head">
        <h4 className="caption">Image</h4>
        <div className="icon" onClick={() => setImgSideBarVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="folder-form delete-img" noValidate>
          <div className="folder-img">
            <img
              src={`http://naftalan-backend.uptodate.az${selectImg.image}`}
              alt="img"
            />
          </div>

          <div className="form-footer">
            <p className="error-text">asdasd</p>
            <div className="btn-area">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeData();
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

export default FileImgSideBarMenu;
