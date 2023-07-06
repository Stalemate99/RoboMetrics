import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { SIGN_UP } from "../constants/auth";
import { DEFAULT_TOAST_CONFIG } from "../constants/toast";

export default function SignUp() {
  const [formData, setFormData] = useState(SIGN_UP);
  const [isVerificationActive, setVerificationActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validating form data
    // Checks password for the following conditions,
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

    // Checks for basic email validation
    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

    return;
  };

  const handleVerification = () => {
    return;
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
        className="w-1/2 p-1 mt-24 flex flex-col items-center justify-center bg-yellow-50 rounded"
      >
        <span className="flex flex-col gap-4 w-[90%] my-2 mt-6">
          <label htmlFor="email" className="font-medium text-lg text-cyan-600">
            Enter Email
          </label>
          <input
            onChange={handleFormChange}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            className="flex items-center w-full h-10 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
            placeholder="email@org.domain"
            required
          />
        </span>

        <span className="flex flex-col gap-4 w-[90%] my-2">
          <label
            htmlFor="passowrd"
            className="font-medium text-lg text-cyan-600"
          >
            Enter Password
          </label>
          <input
            onChange={handleFormChange}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            className="flex items-center w-full h-10 text-black outline-none border-2 border-orange-400 rounded px-2 py-1"
            placeholder="********"
            required
          />
        </span>

        <span className="flex flex-col gap-4 items-center mb-4 w-full pl-6 my-2">
          <button
            type="submit"
            disabled={!!isLoading}
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
    return <form onSubmit={handleVerification}>Verification</form>;
  };

  return (
    <section className="flex justify-center">
      {isVerificationActive ? renderVerificationForm() : renderSignUpForm()}
    </section>
  );
}
