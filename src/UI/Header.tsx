import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

export default function Header() {
  return (
    <header className="uppercase bg-yellow-400 px-8 py-5 flex justify-between items-center">
      <Link to={"/"} className="tracking-widest font-bold">Fast React Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
