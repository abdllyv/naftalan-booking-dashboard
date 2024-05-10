// React Router Dom
import { NavLink } from "react-router-dom";

// Icon
import arrow from "../assets/images/icon/arrow-left.svg";
import { useContext } from "react";
import { MainContext } from "../utils/MainContext";

const SideBarMainMenu = () => {
  // Gloabal State
  const { mainMneuVisible, setMainMneuVisible } = useContext(MainContext);
  return (
    <div
      className={
        mainMneuVisible
          ? " isOpenMenu sidebar-main-menu"
          : "  sidebar-main-menu"
      }
    >
      <div className="head">
        <h4 className="caption">Menu</h4>
        <div className="icon" onClick={() => setMainMneuVisible(false)}>
          <img src={arrow} alt=" close" />
        </div>
      </div>
      <div className="body">
        <ul className="menu-list">
          <li className="menuItem">
            <NavLink
              to="/reservation"
              onClick={() => setMainMneuVisible(false)}
            >
              Reservation
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink
              to="/hotel"
              onClick={() => setMainMneuVisible(false)}
            >
              Hotel
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/comment" onClick={() => setMainMneuVisible(false)}>
              Comment
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/home-page" onClick={() => setMainMneuVisible(false)}>
              Home page
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink
              to="/exchange-rate"
              onClick={() => setMainMneuVisible(false)}
            >
              Exchange rate
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink
              to="/email-templates"
              onClick={() => setMainMneuVisible(false)}
            >
              Email templates
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink
              to="/coupon-code-overview"
              onClick={() => setMainMneuVisible(false)}
            >
              Coupon code overview
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/discount" onClick={() => setMainMneuVisible(false)}>
            Discount
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/photos" onClick={() => setMainMneuVisible(false)}>
            Photos
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/newsletter" onClick={() => setMainMneuVisible(false)}>
            Newsletter member
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/contact-us" onClick={() => setMainMneuVisible(false)}>
            Contact us
            </NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/settings" onClick={() => setMainMneuVisible(false)}>
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarMainMenu;
