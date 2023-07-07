import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRobotSideBarProps } from "../types/Robot";
import { useNavigate } from "react-router-dom";

export default function RobotSideBar(props: IRobotSideBarProps) {
  const { name, width, height, length, sensorType, imageUrl } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-50 rounded p-2">
      <section>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <img src="/images/robot1.jpg" alt={name} className="w-full h-auto" />
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
