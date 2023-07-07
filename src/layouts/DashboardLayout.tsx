import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Robot } from "../models";

import RobotCard from "../components/RobotCard";
import Sidebar from "../components/Sidebar";
import RobotSideBar from "../components/RobotSideBar";
import RobotInstance from "../components/RobotInstance";

import { ROBOT_INITIAL_VALUE } from "../constants/robot";

import { IRobotSideBarProps } from "../types/Robot";

function DashboardLayout() {
  const [robotData, setRobotData] = useState<IRobotSideBarProps[]>([]);
  const [isRobotSelected, setIsRobotSelected] = useState(false);
  const [selectedRobotData, setSelectedRobotData] =
    useState<IRobotSideBarProps>(ROBOT_INITIAL_VALUE);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const subscription = DataStore.observe(Robot).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element, "test in");
    });

    return subscription.unsubscribe();
  }, []);

  useEffect(() => {
    DataStore.query(Robot).then((data) => {
      setRobotData(() => {
        const robots: IRobotSideBarProps[] = [];

        data?.forEach((robot) => {
          robots.push({
            name: robot.name,
            id: robot.id,
            length: robot.length,
            width: robot.width,
            height: robot.height,
            sensorType: robot.sensorType,
            imageUrl: robot.imageUrl,
          });
        });

        return robots;
      });
    });
  }, []);

  useEffect(() => {
    if (searchText) {
      DataStore.query(Robot, (c) => c.name.contains(searchText)).then(
        (data) => {
          setRobotData(() => {
            const robots: IRobotSideBarProps[] = [];

            data?.forEach((robot) => {
              robots.push({
                name: robot.name,
                id: robot.id,
                length: robot.length,
                width: robot.width,
                height: robot.height,
                sensorType: robot.sensorType,
                imageUrl: robot.imageUrl,
              });
            });

            return robots;
          });
        }
      );
    }
  }, [searchText]);

  const renderSelectedRobot = (name: string) => {
    // Fetch robot details
    const selectedRobot = robotData.filter(
      (robot: IRobotSideBarProps) => robot.name === name
    );

    setSelectedRobotData(selectedRobot[0]);
    setIsRobotSelected(true);
  };

  const renderRobotCards = () => {
    return robotData.map((data: IRobotSideBarProps, idx) => (
      <RobotCard
        key={idx}
        name={data.name}
        handleSelection={renderSelectedRobot}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-4 h-full">
      {isRobotSelected ? (
        <RobotSideBar {...selectedRobotData} />
      ) : (
        <Sidebar handleSearch={(text: string) => setSearchText(text)} />
      )}
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
