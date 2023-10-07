import React from "react";
import { Link } from "react-router-dom";
import { Fire } from "../components/UI/icons";

function Navbar() {
  
  return (
    <>
      <div className="bg-[#1b3c5b] py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <i className="mr-2 text-[#ff3e3e] text-2xl"><Fire className="animate-pulse"/></i>
            <Link to={"/"} className="text-white text-xl font-bold">
              {" "}
              Fire Data
            </Link>
          </div>
          <div className="flex">
            <Link
              to={"/map"}
              className="text-white mx-2 bg-[#ff3e3e] px-2 py-2 rounded-xl hover:bg-[#bf4141] hover:rounded-2xl"
            >
              Mapa
            </Link>
            <Link to={"/card"} className="text-white mx-2 bg-[#ff3e3e] px-2 py-2 rounded-xl hover:bg-[#bf4141] hover:rounded-2xl">
              Datos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
