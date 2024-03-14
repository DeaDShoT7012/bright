import React from "react";
import { Link } from "react-router-dom";

function Setting() {
  return (
    <div className="form-main">
      <div className="login-body">
        <div className="login-page">
          <div className="form">
            <h2 className="text-success mb-3">
              <b>Change Password</b>
            </h2>
            <form className="login-form">
              <input type="text" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
              <button type="submit">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
