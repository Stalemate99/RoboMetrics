import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogoutButton from "./LogoutButton";

function Sidebar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-2 h-fit bg-yellow-50 rounded p-2 w-full md:h-full">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          placeholder="Find robots"
          className="text-cyan-800 border-2 p-2 h-14 w-full border-orange-400 rounded"
        />
        <FontAwesomeIcon icon={faSearch} className="w-6 h-6" />
      </div>
      <span className="flex justify-center items-end md:flex-grow md:mb-2">
        <LogoutButton />
      </span>
    </div>
  );
}

export default Sidebar;
