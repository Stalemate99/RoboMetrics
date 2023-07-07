import { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRobotSideBarProps } from "../types/Robot";
import { Storage } from "aws-amplify";

export default function RobotSideBar(props: IRobotSideBarProps) {
  const { name, width, height, length, sensorType } = props;
  const [url, setUrl] = useState("");

  useEffect(() => {
    Storage.get(name)
      .then((data) => setUrl(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-yellow-50 rounded p-2">
      <section>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="w-6 h-6 cursor-pointer"
          onClick={() => location.reload()}
        />
        <img src={url} alt={name} className="w-full h-auto" />
      </section>
      <section className="flex flex-col gap-2 p-2">
        <h2 className="font-bold">{name}</h2>
        <span>
          <h3 className="font-bold">Width</h3>
          <p>{width}</p>
        </span>
        <span>
          <h3 className="font-bold">Length</h3>
          <p>{length}</p>
        </span>
        <span>
          <h3 className="font-bold">Height</h3>
          <p>{height}</p>
        </span>
        <span>
          <h3 className="font-bold">Sensor Type</h3>
          <p>{sensorType}</p>
        </span>
      </section>
    </div>
  );
}
