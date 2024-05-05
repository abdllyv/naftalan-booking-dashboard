// React
import { useCallback, useContext, useEffect, useState } from "react";
// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import folderImg from "../assets/images/icon/folder.svg";
import add from "../assets/images/icon/add-plus.svg";
import arrow from "../assets/images/icon/arrow-left.svg";

const FileManager = () => {
  // Global state
  const {
    mainMneuVisible,
    setMainMneuVisible,
    imgSideBarVisible,
    setImgSideBarVisible,
    folderSideBarVisible,
    setFolderSideBarVisible,
  } = useContext(MainContext);

  // Local State
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);

  //   Base Folder
  const getBaseFolderDAta = useCallback(async () => {
    axios
      .get("http://naftalan-backend.uptodate.az/private/folder/read/base")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Folder Manipulation Walking
  const getFolderData = useCallback(async (folderId) => {
    axios
      .get(
        `http://naftalan-backend.uptodate.az/private/folder/read/${folderId}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Rendering Data
  useEffect(() => {
    getBaseFolderDAta();
  }, [getBaseFolderDAta]);

  //   Back Step
  const backToStep = () => {
    const updateLink = [...link];
    updateLink.pop();
    console.log(updateLink)
    if (updateLink.length === 0) {
      getBaseFolderDAta();
    } else {
      getFolderData(link[updateLink.length - 1].id);
    }
    setLink(updateLink);
  };
  return (
    <main>
      <section className="file-manager">
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="info">
                <button onClick={() => setMainMneuVisible(true)}>
                  <img src={menuIcon} alt="menu" />
                </button>
                <h2 className="caption">Photo</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            imgSideBarVisible || folderSideBarVisible || mainMneuVisible
              ? "overlay-sub-menu active"
              : "overlay-sub-menu"
          }
          onClick={() => {
            mainMneuVisible
              ? setMainMneuVisible(false)
              : imgSideBarVisible
              ? setImgSideBarVisible(false)
              : setFolderSideBarVisible(false);
          }}
        ></div>
        <div className="manager-body">
          <div className="container">
            <div className="edit-area">
              <h6 className="title">Add Folder</h6>
              <button
                className="add-btn"
                // onClick={() => setDiscountDetail(true)}
              >
                Add <img src={add} alt="add" />
              </button>
            </div>
            <div className="edit-area">
              <h6 className="title">Add Photo</h6>
              <label
                htmlFor="img"
                className="add-btn"
                // onClick={() => setDiscountDetail(true)}
              >
                Add <img src={add} alt="add" />
              </label>
              <input type="file" name="img" id="img" />
            </div>
            <h2 className="hyper-link">
              <button onClick={() => backToStep()}>
                <img src={arrow} alt="" /> Back
              </button>{" "}
              | Base
              {link.length !== 0 &&
                `/ ${link.map((item) => item.name).join(" / ")}`}
            </h2>
            <div className="image-folder">
              <div className="row">
                {data.length !== 0 &&
                  data.subfolders.map((folder) => (
                    <div
                      className="folder-group"
                      key={folder.id}
                      onDoubleClick={() => {
                        getFolderData(folder.id);

                        setLink([
                          ...link,
                          { id: folder.id, name: folder.name },
                        ]);
                      }}
                    >
                      <div className="folder">
                        <img src={folderImg} alt={folder.name} />
                      </div>
                      <h2 className="folder-name">{folder.name}</h2>
                    </div>
                  ))}
                {data.length !== 0 &&
                  data.images.map((photo) => (
                    <div className="image-group" key={photo.id}>
                      <img
                        src={`http://naftalan-backend.uptodate.az${photo.image}`}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FileManager;
