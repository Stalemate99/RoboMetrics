import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="w-full max-h-[10dvh] flex flex-none items-center justify-center gap-4 p-2 bg-cyan-800 shadow-lg ">
      <FontAwesomeIcon
        icon={faRobot}
        className="w-10 h-10 text-sky-200 border-sky-200 border-2 p-1"
      />
      <h1 className="text-2xl font-bold tracking-wider text-sky-200">
        RoboMetrics
      </h1>
    </header>
  );
}

export default Header;
