import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import GetAllSpots from "../Spots/GetAllSpots/GetSpots";
import "./profilebutton.css";

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [localUser, setLocalUser] = useState(sessionUser); // Track sessionUser locally
  const ulRef = useRef(null);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  const reviewClick = () => {
    closeMenu();
    history.push("/my-reviews");
  };

  const bookingClick = () => {
    closeMenu();
    history.push("/bookings");
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    // Update localUser when sessionUser changes
    setLocalUser(sessionUser);
  }, [sessionUser]);

useEffect(() => {
  if (!showMenu) return;

  const closeMenu = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("click", closeMenu);

  return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-open-button" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <span>{user.email}</span>
            {localUser ? (
              <button
                className="linkedin-button"
                color="black"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/eunicexpark01")
                }
              >
                LinkedIn
              </button>
            ) : null}
            <span>
              {localUser ? (
                <button
                  onClick={bookingClick}
                  className="my-bookings"
                  style={{ cursor: "pointer" }}
                >
                  My Bookings
                </button>
              ) : null}
              {localUser ? (
                <button
                  onClick={reviewClick}
                  className="my-reviews"
                  style={{ cursor: "pointer" }}
                >
                  My Reviews
                </button>
              ) : null}
              <button
                className="logout-button"
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                Log aOut
              </button>
            </span>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
