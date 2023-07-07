import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

import { DEFAULT_TOAST_CONFIG } from "../constants/toast";
import { SIGN_IN } from "../constants/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  const [formData, setFormData] = useState(SIGN_IN);

  const { user, signin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate("/");
  }, []);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validating form data
    // Checks for basic email validation
    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Checks password for the following conditions,
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

    if (!formData?.email.match(emailCheck)) {
      toast.error("Please enter a valid email address.", DEFAULT_TOAST_CONFIG);
      setFormData(SIGN_IN);

      return;
    }

    if (!formData.password.match(passwordCheck)) {
      toast.error(
        "Minimum eight characters, at least one letter, one number and one special character required",
        DEFAULT_TOAST_CONFIG
      );
      setFormData(SIGN_IN);

      return;
    }

    try {
      const user = await Auth.signIn({
        username: formData.email,
        password: formData.password,
      });

      if (signin) signin(user);
    } catch (error: any) {
      toast.error(error?.message, DEFAULT_TOAST_CONFIG);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevVal) => ({
      ...prevVal,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSignIn}
        className="w-full md:w-1/3 p-1 mt-24 flex flex-col items-center justify-center bg-yellow-50 rounded"
      >
        <h2 className="text-xl text-cyan-800 font-bold mt-4">Sign In</h2>
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
            Sign In
          </button>

          <section className="flex gap-2 w-full text-sm font-medium text-amber-900">
            <p>New here?</p>
            <Link className="hover:underline" to="/signup">
              Create Account
            </Link>
          </section>
        </span>
      </form>
    </section>
  );
}
