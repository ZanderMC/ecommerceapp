
"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(value.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [onSearch, value]);

  return (
    <div className=" bg-white mx-auto mt-8 mb-10 flex h-auto w-full max-w-xl items-center justify-between rounded-2xl border-2 border-gray-300   px-4 py-2 sm:mt-10 sm:mb-16 sm:px-4 ">
      <input
        aria-label="Buscar productos"
        className="w-full bg-transparent text-gray-700 outline-none placeholder-gray-400"
        onChange={(event) => setValue(event.target.value)}
        placeholder="¿Qué estás buscando?"
        type="search"
        value={value}
      />
      <svg
        className="ml-2 h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}


   