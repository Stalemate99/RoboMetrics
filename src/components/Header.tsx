import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="relative w-full h-24 flex gap-2 items-center justify-center p-2 bg-cyan-800 shadow-lg ">
      <FontAwesomeIcon
        icon={faRobot}
        className="w-10 h-10 border-sky-200 border-2 p-1"
      />
      <h1 className="text-2xl font-bold tracking-wider">RoboMetrics</h1>
    </header>
  );
}

export default Header;
