import { useState } from "react";
import down from "../../assets/images/icon/arrow-down.svg";

const HotelDetailSeoAcordion = () => {
  // Local State
  const [acordionVisible, setAcordionVisible] = useState("az");

  return (
    <div className="seo-acordion-area">
      <div
        className={
          acordionVisible === "az"
            ? "acordion-group  active"
            : "acordion-group "
        }
      >
        <div
          className="axordion-head "
          onClick={() =>
            setAcordionVisible(acordionVisible === "az" ? "" : "az")
          }
        >
          <h3 className="acordion-caption">Azerbaijan</h3>
          <div className="icon">
            <img src={down} alt="down" />
          </div>
        </div>
        <form
          className="acrodion-body"
          style={{ height: acordionVisible === "az" ? 280 : 0 }}
        >
          <div className="form-group">
            <label htmlFor="">Title</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor=""> Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="scrool"
            ></textarea>
          </div>
          <div className="form-footer">
            <div className="handle-area">
              <p className="error-text">asd</p>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
      <div
        className={
          acordionVisible === "en"
            ? "acordion-group  active"
            : "acordion-group "
        }
      >
        <div
          className="axordion-head "
          onClick={() =>
            setAcordionVisible(acordionVisible === "en" ? "" : "en")
          }
        >
          <h3 className="acordion-caption">English</h3>
          <div className="icon">
            <img src={down} alt="down" />
          </div>
        </div>
        <form
          className="acrodion-body"
          style={{ height: acordionVisible === "en" ? 280 : 0 }}
        >
                <div className="form-group">
            <label htmlFor="">Title</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor=""> Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="scrool"
            ></textarea>
          </div>
          <div className="form-footer">
            <div className="handle-area">
              <p className="error-text">asd</p>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
      <div
        className={
          acordionVisible === "ru"
            ? "acordion-group  active"
            : "acordion-group "
        }
      >
        <div
          className="axordion-head "
          onClick={() =>
            setAcordionVisible(acordionVisible === "ru" ? "" : "ru")
          }
        >
          <h3 className="acordion-caption">Russian</h3>
          <div className="icon">
            <img src={down} alt="down" />
          </div>
        </div>
        <form
          className="acrodion-body"
          style={{ height: acordionVisible === "ru" ? 280 : 0 }}
        >
              <div className="form-group">
            <label htmlFor="">Title</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor=""> Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="scrool"
            ></textarea>
          </div>
          <div className="form-footer">
            <div className="handle-area">
              <p className="error-text">asd</p>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelDetailSeoAcordion;
