import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end m-4">
        <p
          onClick={() => onRouteChange("signout")}
          className="font-bold text-white underline underline-offset-1 cursor-pointer px-5 py-2"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="flex justify-end m-4">
          <p
            onClick={() => onRouteChange("signin")}
            className="font-bold text-white underline underline-offset-1 cursor-pointer px-5 py-2"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="font-bold text-white underline underline-offset-1 cursor-pointer px-5 py-2"
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
