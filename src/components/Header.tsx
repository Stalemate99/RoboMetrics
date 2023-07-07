import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user, signout } = useAuth();

  return (
    <header className="w-full h-24 flex items-center p-2 bg-cyan-800 shadow-lg ">
      <span className="flex gap-2 items-center flex-grow mx-8">
        <FontAwesomeIcon
          icon={faRobot}
          className="w-10 h-10 text-sky-200 border-sky-200 border-2 p-1"
        />
        <h1 className="text-2xl font-bold tracking-wider text-sky-200">
          RoboMetrics
        </h1>
      </span>
      {user ? (
        <button onClick={() => signout()} className="text-sky-200 mr-8">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6" />
        </button>
      ) : null}
    </header>
  );
}

export default Header;
