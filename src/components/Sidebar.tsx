import { FormEvent, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Storage } from "@aws-amplify/storage";
import { DataStore } from "aws-amplify";

import { Robot } from "../models";

import LogoutButton from "./LogoutButton";

import { ROBOT_INITIAL_VALUE } from "../constants/robot";

interface ISideBar {
  handleSearch: (text: string) => void;
}

function Sidebar({ handleSearch }: ISideBar) {
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(ROBOT_INITIAL_VALUE);

  const renderSearch = () => {
    handleSearch(search);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await Storage.put(formData.name, formData.imageUrl);
    } catch (error) {
      console.error(error);
    }

    try {
      await DataStore.save(
        new Robot({
          name: formData.name,
          width: formData.width,
          length: formData.length,
          height: formData.height,
          sensorType: formData.sensorType,
          imageUrl: formData.name,
        })
      );

      setFormData(ROBOT_INITIAL_VALUE);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "imageUrl") {
      const { files } = event.target;
      const selectedFiles = files as FileList;

      setFormData((prevVal) => ({
        ...prevVal,
        [event.target.name]: selectedFiles?.[0],
      }));
    } else {
      setFormData((prevVal) => ({
        ...prevVal,
        [event.target.name]: event.target.value,
      }));
    }
  };

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
        <FontAwesomeIcon
          icon={faSearch}
          className="w-6 h-6 cursor-pointer"
          onClick={renderSearch}
        />
      </div>
      <section className="grid">
        <form onSubmit={handleSubmit} className="px-2">
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="name" className="text-cyan-800">
              Enter Name
            </label>
            <input
              onChange={handleFormChange}
              id="name"
              type="text"
              name="name"
              value={formData.name}
              autoComplete="username"
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
              placeholder="R2 D2 Clone"
              required
            />
          </span>
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="length" className="text-cyan-800">
              Enter Length
            </label>
            <input
              onChange={handleFormChange}
              id="length"
              type="text"
              name="length"
              value={formData.length}
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
              placeholder="0.00m"
              required
            />
          </span>
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="width" className="text-cyan-800">
              Enter Width
            </label>
            <input
              onChange={handleFormChange}
              id="width"
              type="text"
              name="width"
              value={formData.width}
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
              placeholder="0.00m"
              required
            />
          </span>
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="height" className="text-cyan-800">
              Enter Height
            </label>
            <input
              onChange={handleFormChange}
              id="height"
              type="text"
              name="height"
              value={formData.height}
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
              placeholder="0.00m"
              required
            />
          </span>
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="sensorType" className="text-cyan-800">
              Enter Sensor Type
            </label>
            <input
              onChange={handleFormChange}
              id="sensorType"
              type="text"
              name="sensorType"
              value={formData.sensorType}
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
              placeholder="Lidar"
              required
            />
          </span>
          <span className="flex flex-col items-start gap-2 w-[90%] my-2">
            <label htmlFor="imageUrl" className="text-cyan-800">
              Upload Image
            </label>
            <input
              onChange={handleFormChange}
              id="imageUrl"
              type="file"
              name="imageUrl"
              accept="image/*"
              className="flex items-center h-8 text-black outline-none border-2 border-orange-400 rounded px-2 py-1 text-xs bg-white"
              required
            />
          </span>
          <span className="flex flex-col gap-4 items-center mb-4 w-full my-2">
            <button
              type="submit"
              className="inline-block w-fit h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
            >
              Register Robot
            </button>
          </span>
        </form>
      </section>
      <span className="flex justify-center mt-auto md:mb-2">
        <LogoutButton />
      </span>
    </div>
  );
}

export default Sidebar;
