import React from "react";

export default function Loader() {
  return <div className="absolute bg-slate-100/30 inset-0 backdrop-blur-sm flex justify-center items-center">
    <div className="loader"></div>;
  </div>
}