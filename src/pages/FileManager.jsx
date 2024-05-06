// React
import { useCallback, useContext, useEffect, useState } from "react";
// Context
import { MainContext } from "../utils/MainContext";

// Axios
import axios from "axios";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { boolean, number, object, string } from "yup";

// Icon
import menuIcon from "../assets/images/icon/burger-menu.svg";
import folderImg from "../assets/images/icon/folder.svg";
import add from "../assets/images/icon/add-plus.svg";
import arrow from "../assets/images/icon/arrow-left.svg";
import FileFolderSideBarMenu from "../components/side-bar-menu/FileFolderSideBarMenu";

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
  const [folderData, setFolderData] = useState([]);
  const [link, setLink] = useState([]);
  const [createFolderModalVisible, setCreateFolderModalVisible] =
    useState(false);
  const [selectFolder, setSelectFolder] = useState(null);

  //   Base Folder
  const getBaseFolderDAta = useCallback(async () => {
    axios
      .get("http://naftalan-backend.uptodate.az/private/folder/read/base")
      .then((res) => setFolderData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Folder Manipulation Walking
  const getFolderData = useCallback(async (folderId) => {
    axios
      .get(
        `http://naftalan-backend.uptodate.az/private/folder/read/${folderId}`
      )
      .then((res) => {
        setFolderData(res.data);
      })
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
    console.log(updateLink);
    if (updateLink.length === 0) {
      getBaseFolderDAta();
    } else {
      getFolderData(link[updateLink.length - 1].id);
    }
    setLink(updateLink);
  };

  // Yup schema
  const createSchema = object({
    folder_name: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createSchema),
  });
  //   Create Folder

  const createFolder = async (data) => {
    const body = new FormData();
    body.append("name", data.folder_name);
    body.append("parent_folder", folderData.id);

    axios
      .post(
        `   http://naftalan-backend.uptodate.az/private/folder/create`,
        body
      )
      .then((res) => {
        console.log(res.data);
        setCreateFolderModalVisible(false);
        const newSubfolder = { id: res.data.id, name: res.data.name };
        console.log(newSubfolder);
        const newSubfolders = [...folderData.subfolders];
        newSubfolders.push(newSubfolder);
        setFolderData({
          ...folderData,
          subfolders: newSubfolders,
        });
      })
      .catch((err) => console.log(err));
  };

  //Photo Choose
  const createImg = async (e) => {
    console.log(e);
    // // Check if files were selected
    // if (!e.target.files || e.target.files.length === 0) {
    //   console.error("No file selected.");
    //   return;
    // }

    let file = e.target.files[0];
    console.log(file);
    const body = new FormData();
    body.append("image", file);
    body.append("parent_folder", folderData.id);
    await axios
      .post(
        "http://naftalan-backend.uptodate.az/private/folder-image/create",
        body
      )
      .then((res) => {
        const newImages = [...folderData.images];
        newImages.push(res.data);
        setFolderData({
          ...folderData,
          images: newImages,
        });
      })
      .catch((err) => console.log(err));
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
        {/* <div
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
        ></div> */}
        <div className="manager-body">
          <div className="container">
            <div className="edit-area">
              <h6 className="title">Add Folder</h6>
              <button
                className="add-btn"
                onClick={() => setCreateFolderModalVisible(true)}
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
              <input type="file" name="img" id="img" onChange={createImg} />
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
                {folderData.length !== 0 &&
                  folderData.subfolders.map((folder) => (
                    <div
                      className="folder-group"
                      key={folder.id}
                      onClick={() => {
                        setFolderSideBarVisible(true);

                        setSelectFolder({
                          parent_folder: folderData.id ? folderData.id : "",
                          folder: folder,
                        });
                      }}
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
                {folderData.length !== 0 &&
                  folderData.images.map((photo) => (
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
        {createFolderModalVisible && (
          <div className="create-folder">
            <form
              className="content"
              noValidate
              onSubmit={handleSubmit(createFolder)}
            >
              <label htmlFor="folder_name">Folder Name</label>
              <input
                className={errors.folder_name ? "inp error" : "inp"}
                type="text"
                name="folder_name"
                id="folder_name"
                {...register("folder_name")}
              />
              <button className="submit">Create</button>
            </form>
          </div>
        )}
        {selectFolder && <FileFolderSideBarMenu folderData={selectFolder} />} 
      </section>
    </main>
  );
};

export default FileManager;
