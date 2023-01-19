import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <div className='profile-container'>
      <div className='home-page'>
        <NavLink exact to="/">
          Home
        </NavLink>
 <div className='move-this'>
   <div className='new-listing'>
      {sessionUser ? (
        <NavLink to="/new">
          Create A New Listing
        </NavLink>
      ) : (
        null
        )}
  </div>
      <div>
        </div>
      </div>
      {isLoaded && (
          <div className="profile-button">

          <ProfileButton user={sessionUser} />
      </div>
      )}</div>
      </div>
    </ul>
  );
}
export default Navigation;