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

const FileFolderSideBarMenu = ({ folderData }) => {
  // Global State
  const { folderSideBarVisible, setFolderSideBarVisible } =
    useContext(MainContext);

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
    if (folderSideBarVisible) {
      setValue("folder_name", folderData.folder.name);
    }
  }, [folderSideBarVisible, folderData.folder.name, setValue]);

  const editFolder = async (data, e) => {
    e.preventDefault();
    console.log(data);
    const body = new FormData();
    body.append("name", data.folder_name);
    body.append("parent_folder", folderData.parent_folder);

    axios
      .put(
        `   http://naftalan-backend.uptodate.az/private/folder/update/${folderData.parent_folder}`,
        body
        // {
        //   crossdomain: true,
        // }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  //  Delete Folder
  const removeData = (dataId) => {
    createRemoveAlert(
      "Delete Folder!",
      "Are you sure you want to delete the folder?",
      "Yes, Remove",
      async () => {
        await axios
          .delete(
            `http://naftalan-backend.uptodate.az/private/folder/delete/${dataId}`
            // {
            //   crossdomain: true,
            // }
          )
          .then((res) => {
            console.log(res);
            //   if (res.status === 200) {
            //     const updateHotel = allHotel.filter(
            //       (hotel) => hotel.id !== dataId
            //     );
            //     setAllHotel(updateHotel);
            //   }
            // setAllHotel(res.data.page_data);
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
        folderSideBarVisible
          ? " isOpenMenu file-manager-folder-sidebar-menu "
          : "file-manager-folder-sidebar-menu "
      }
    >
      <div className="head">
        <h4 className="caption">Attributes</h4>
        <div className="icon" onClick={() => setFolderSideBarVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <form action="" className="folder-form" noValidate>
          <div className="form-group">
            <label htmlFor="folder_name" className="inp-caption">
              Folder_Name
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
            <p className="error-text">asdasd</p>
            <div className="btn-area">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeData(folderData.parent_folder);
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
