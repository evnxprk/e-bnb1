import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import GetAllSpots from "../Spots/GetAllSpots/GetSpots";
import './profilebutton.css'

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const listingClick = () => {
    closeMenu();
    history.push("/listings");
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
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
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
            {sessionUser ? (
              <button
                className="linkedin-button"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/eunicexpark01"
                  )
                }
              >
                LinkedIn
              </button>
              
            ) : null}
            {/* <div className="linkedin-border"></div> */}
            <span>
              {sessionUser ? (
                <button onClick={listingClick} className="my-listings">
                  My Listings
                </button>
              ) : null}
              {sessionUser ? (
                <button onClick={bookingClick} className="my-bookings">
                  My Bookings
                </button>
              ) : null}
              {sessionUser ? (
                <button onClick={reviewClick} className="my-reviews">
                  My Reviews
                </button>
              ) : null}
              <button className="logout-button" onClick={logout}>
                Log Out
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
