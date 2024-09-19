import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: Error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page" className="flex items-center justify-center min-h-screen flex-col gap-4">
      <Link className="bg-blue-600 text-white font-semibold px-5 py-2" to={"/"}>Back to home</Link>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-4xl text-black font-semibold">404!</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}