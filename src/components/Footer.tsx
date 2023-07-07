import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="grid md:flex flex-none min-h-[10dvh] items-center justify-evenly w-full h-fit p-2 gap-2 bg-cyan-800 md:mt-auto md:gap-0 md:px-2">
      <div className="flex flex-none gap-2 items-center">
        <FontAwesomeIcon
          icon={faRobot}
          className="w-10 h-10 text-sky-200 border-sky-200 border-2 p-1"
        />
        <h1 className="text-2xl font-bold tracking-wider text-sky-200">
          RoboMetrics
        </h1>
      </div>
      <div
        className="mx-4 md:h-20 bg-yellow-50 w-0.5 invisible md:visible"
        content=" "
      ></div>
      <div className="flex gap-2 items-center hover:underline text-sky-200 hover:underline-offset-4 hover:text-sky-100">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="text-orange-400 w-6 h-6"
        />
        <a href="mailto:kanishqsunil99@gmail.com">
          <label>kanishqsunil99@gmail.com</label>
        </a>
      </div>
      <div
        className="mx-4 md:h-20 bg-yellow-50 w-0.5 invisible md:visible"
        content=" "
      ></div>
      <div className="cursor-pointer flex items-center justify-end text-sky-200 hover:underline hover:underline-offset-4 hover:text-sky-100">
        <a
          href="https://bmc.link/kanishqs"
          target="_blank"
          className="cursor-pointer hover:text-sky-100"
        >
          <label>
            Buy me a Coffee{" "}
            <FontAwesomeIcon
              icon={faMugHot}
              className="cursor-pointer px-2 text-orange-400 w-6 h-6 hover:text-orange-500"
            />
          </label>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
