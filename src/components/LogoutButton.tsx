import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../contexts/AuthContext";

const LogoutButton: React.FC = () => {
  const { signout } = useAuth();

  return (
    <button
      onClick={() => signout()}
      className="flex gap-2 p-3 rounded items-center font-extrabold bg-amber-900 text-yellow-50 shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
    >
      <span>Logout</span>
      <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
    </button>
  );
};
export default LogoutButton;
