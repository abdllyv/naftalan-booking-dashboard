import testImg from "../assets/images/test-img.png";
// Icon
import close from "../assets/images/icon/close.svg";
import { useEffect, useState } from "react";

const ImageCard = ({ img, type }) => {
  // // Local State
  // const [closeIconVisivle,setCloseIconVisivle]=useState(false)

  //   // RenderCheck
  //   useEffect(()=>{
  // if(type==="new img"){

  // }
  //   },[])
  return (
    <div className="img-card">
      <div className="top">
        {type !== "logo" && type !== "new logo"   ? (
          <div className="close-icon">
            <img src={close} alt="close" />
          </div>
        ) : null}
      </div>
      <div className="middle">
        <img
          src={
            type === "new img"
              ? img
              : `http://naftalan-backend.uptodate.az${img}`
          }
          alt="logo"
        />
      </div>
      <div className="bottom">
        {/* <h6 className="img-title">Filename.jpg</h6> */}
      </div>
    </div>
  );
};

export default ImageCard;
