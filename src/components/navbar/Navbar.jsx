import React from "react";
import { Link } from "react-router-dom";
import { Fire } from "../UI/icons";
import { navbarRoutes } from "./routes";

function Navbar() {
  return (
    <>
      <div className="bg-[#1b3c5b] py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <i className="mr-2 text-[#ff3e3e] text-2xl">
              <Fire className="animate-pulse" />
            </i>
            <Link to={"/"} className="text-white text-xl font-bold">
              {" "}
              Fire Data
            </Link>
          </div>
          <div className="flex">
            {navbarRoutes.map((route, index) => (
              <Link
                to={route.path}
                className="text-white font-semibold mx-1 bg-[#ff3e3e] px-2 py-2 rounded-xl hover:bg-[#bf4141] hover:rounded-xl "
                key={index}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
