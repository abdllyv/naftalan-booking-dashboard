// React
import { useContext, useEffect } from "react";

// Context
import { MainContext } from "../../utils/MainContext";

// React Hook Form && yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

// Icon
import arrow from "../../assets/images/icon/arrow-left.svg";
import axios from "axios";
import { createRemoveAlert } from "../../utils/SweetAlert";

const FileFolderSideBarMenu = ({ selectFolder }) => {
  // Global State
  const {
    folderSideBarVisible,
    setFolderSideBarVisible,
    folderData,
    setFolderData,
    folderErrorText,
    setFolderErrorText,
  } = useContext(MainContext);

  // Yup schema
  const editSchema = object({
    folder_name: string().required().trim(),
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    setFolderErrorText("");
    if (folderSideBarVisible) {
      setValue("folder_name", selectFolder.folder.name);
    }
  }, [
    folderSideBarVisible,
    selectFolder.folder.name,
    setFolderErrorText,
    setValue,
  ]);

  const editFolder = async (data, e) => {
    e.preventDefault();
    console.log(data);
    const body = new FormData();
    body.append("name", data.folder_name);
    body.append("parent_folder", selectFolder.parent_folder);

    axios
      .put(
        `http://naftalan-backend.uptodate.az/private/folder/update/${selectFolder.folder.id}`,
        body
        // {
        //   crossdomain: true,
        // }
      )
      .then((res) => {
        setFolderData((prevData) => {
          return {
            ...prevData,
            subfolders: prevData.subfolders.map((item) => {
              if (item.id === res.data.id) {
                return {
                  ...item,
                  name: res.data.name,
                };
              }
              return item;
            }),
          };
        });
        setFolderSideBarVisible(false);
      })
      .catch((err) => setFolderErrorText(err.response?.data.errors));
  };

  //  Delete Folder
  const removeData = (folder) => {
    console.log(folder.id);
    createRemoveAlert(
      "Delete Folder!",
      `Are you sure you want to delete the ${folder.name} folder?`,
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/folder/delete/${folder.id}`
            // {
            //   crossdomain: true,
            // }
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              const updateFolder = folderData.subfolders.filter(
                (mainFolder) => mainFolder.id !== folder.id
              );
              setFolderData({ ...folderData, subfolders: updateFolder });
              setFolderSideBarVisible(false);
            }
          })
          .catch((err) => {
            console(err.response?.data.errors);
          });
      }
    );
  };

  return (
    <div
      className={
        folderSideBarVisible
          ? " isOpenMenu file-manager-folder-sidebar-menu "
          : "file-manager-folder-sidebar-menu "
      }
    >
      <div className="head">
        <h4 className="caption">Folder</h4>
        <div className="icon" onClick={() => setFolderSideBarVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="folder-form" noValidate>
          <div className="form-group">
            <label htmlFor="folder_name" className="inp-caption">
              Folder Name
            </label>
            <input
              type="text"
              className={errors.folder_name ? "inp error" : "inp"}
              id="folder_name"
              name="folder_name"
              {...register("folder_name")}
            />
          </div>

          <div className="form-footer">
            <p className="error-text">{folderErrorText}</p>
            <div className="btn-area">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeData(selectFolder.folder);
                }}
              >
                Delete
              </button>
              <button onClick={handleSubmit(editFolder)}>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileFolderSideBarMenu;
