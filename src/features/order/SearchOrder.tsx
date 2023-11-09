import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        className="rounded-full bg-yellow-100 text-xs sm:text-sm px-4 py-2 placeholder:text-stone-400 w-24 sm:w-64 focus:w-28 sm:focus:w-72 transition-all duration-500 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 focus:ring-offset-2"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
