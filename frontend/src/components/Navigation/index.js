import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import night from "../../nights.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
        {/* <button onClick={logout}>Log Out</button> */}
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <div className="profile">
      <NavLink exact to="/">
        <img className="logo" src={night} sizes="32x32" />
      </NavLink>
      <div className="create-new-listing">
        <div className="new-listing">
          {sessionUser ? (
            <NavLink to="/new">CloudBnB</NavLink>
          ) : null}
          {isLoaded && (
            <div className="profile-nav">
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
