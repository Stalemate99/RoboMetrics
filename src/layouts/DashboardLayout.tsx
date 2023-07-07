import { useState } from "react";
import RobotCard from "../components/RobotCard";
import Sidebar from "../components/Sidebar";
import { ROBOTS, ROBOT_INITIAL_VALUE } from "../constants/robot";
import { IRobotSideBarProps } from "../types/Robot";
import RobotSideBar from "../components/RobotSideBar";
import RobotInstance from "../components/RobotInstance";

function DashboardLayout() {
  const [robotData, setRobotData] =
    useState<IRobotSideBarProps>(ROBOT_INITIAL_VALUE);
  const [isRobotSelected, setIsRobotSelected] = useState(false);

  const renderSelectedRobot = (name: string) => {
    // Fetch robot details
    setIsRobotSelected(true);
    console.log(name);
  };

  const renderRobotCards = () => {
    return ROBOTS.map((data, idx) => (
      <RobotCard
        key={idx}
        name={data.name}
        url={data.imageUrl}
        handleSelection={renderSelectedRobot}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4 h-full">
      {isRobotSelected ? <RobotSideBar {...robotData} /> : <Sidebar />}
      {isRobotSelected ? (
        <RobotInstance />
      ) : (
        <div className="grid md:flex gap-2 justify-center p-1 overflow-y-auto bg-yellow-50 rounded md:flex-row md:flex-wrap md:col-span-3">
          {renderRobotCards()}
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
