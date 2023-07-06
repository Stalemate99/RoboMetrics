import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const checkErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      // error is type `ErrorResponse`
      return error.error?.message || error.statusText;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  };

  return (
    <div
      id="error-page"
      className="h-screen w-full flex flex-col gap-4 items-center"
    >
      <h1 className="w-full text-4xl font-bold text-cyan-800 text-center mt-32">
        Oops!
      </h1>
      <p className="w-full text-center">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="w-full flex gap-2 text-center justify-center items-center">
        <label className="text-cyan-800 font-bold text-xl">
          Error Message:
        </label>
        <i>{checkErrorMessage()}</i>
      </p>
    </div>
  );
}
