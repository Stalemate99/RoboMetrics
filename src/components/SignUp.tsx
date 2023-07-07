import { FormEvent, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

import OtpInput from "./OtpInput";
import { useAuth } from "../contexts/AuthContext";

import { SIGN_UP } from "../constants/auth";
import { DEFAULT_TOAST_CONFIG } from "../constants/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [formData, setFormData] = useState(SIGN_UP);
  const [otp, setOtp] = useState("");
  const [isVerificationActive, setVerificationActive] = useState(false);

  const navigate = useNavigate();
  const { user, signin } = useAuth();

  const saveUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (user) return navigate("/");
  }, []);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validating form data
    // Checks for basic email validation
    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Checks password for the following conditions,
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

    if (!formData.email.match(emailCheck)) {
      toast.error("Please enter a valid email address.", DEFAULT_TOAST_CONFIG);
      setFormData(SIGN_UP);

      return;
    }

    if (!formData.password.match(passwordCheck)) {
      toast.error(
        "Minimum eight characters, at least one letter, one number and one special character required",
        DEFAULT_TOAST_CONFIG
      );
      setFormData(SIGN_UP);

      return;
    }

    try {
      const { user } = await Auth.signUp({
        username: formData.email,
        password: formData.password,
      });

      setVerificationActive(true);
      if (user) {
        saveUserRef.current = user.getUsername();
      }
    } catch (error: any) {
      toast.error(error?.message, DEFAULT_TOAST_CONFIG);
    }
  };

  const handleVerification = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must contain 6 digits.", DEFAULT_TOAST_CONFIG);
      return;
    }

    try {
      await Auth.confirmSignUp(formData.email, otp);

      toast.success("Welcome to RobotMetrics.", DEFAULT_TOAST_CONFIG);
      signin(saveUserRef.current);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await Auth.resendSignUp(formData.email);
      toast.success("Resent verification email.", DEFAULT_TOAST_CONFIG);
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevVal) => ({
      ...prevVal,
      [event.target.name]: event.target.value,
    }));
  };

  const renderSignUpForm = () => {
    return (
      <form
        onSubmit={handleSignUp}
        className="w-full md:w-1/3 p-1 mt-24 flex flex-col items-center justify-center bg-yellow-50 rounded"
      >
        <h2 className="text-xl text-cyan-800 font-bold mt-4">Sign Up</h2>
        <span className="flex items-center justify-center gap-4 w-[90%] my-2 mt-6">
          <label htmlFor="email" className="font-medium text-lg text-cyan-800">
            <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
          </label>
          <input
            onChange={handleFormChange}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            autoComplete="email"
            className="flex items-center h-10 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
            placeholder="email@org.domain"
            required
          />
        </span>

        <span className="flex items-center justify-center gap-4 w-[90%] my-2">
          <label
            htmlFor="passowrd"
            className="font-medium text-lg text-cyan-800"
          >
            <FontAwesomeIcon icon={faKey} className="w-8 h-8" />
          </label>
          <input
            onChange={handleFormChange}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            autoComplete="current-password"
            className="flex items-center h-10 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
            placeholder="********"
            required
          />
        </span>

        <span className="flex flex-col gap-4 items-center mb-4 w-[90%] my-2">
          <button
            type="submit"
            className="inline-block w-32 h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
          >
            Register
          </button>

          <section className="flex justify-start gap-2 w-full text-sm font-medium text-amber-900">
            <p>Already have an account?</p>
            <Link className="hover:underline" to="/signin">
              Sign In
            </Link>
          </section>
        </span>
      </form>
    );
  };

  const renderVerificationForm = () => {
    return (
      <form
        onSubmit={handleVerification}
        className="w-1/2 p-1 mt-24 flex flex-col items-center justify-center bg-yellow-50 rounded"
      >
        <h2 className="mt-4 text-xl font-bold text-sky-800">Verification</h2>
        <p className="text-cyan-900">
          Please check your email and enter the verification code to complete
          sign up.
        </p>
        <span className="p-1">
          <OtpInput
            value={otp}
            handleChange={(val: string) => {
              setOtp(val);
            }}
          />
        </span>
        <span>
          <button
            type="submit"
            className="inline-block w-32 h-12 rounded bg-amber-900 px-5 pb-1 pt-2 mb-4 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
          >
            Register
          </button>
        </span>
        <a
          href="#"
          className="hover:underline text-cyan-900 mb-4"
          onClick={handleResendVerification}
        >
          Resend Verification Code
        </a>
      </form>
    );
  };

  return (
    <section className="flex justify-center">
      {isVerificationActive ? renderVerificationForm() : renderSignUpForm()}
    </section>
  );
}
