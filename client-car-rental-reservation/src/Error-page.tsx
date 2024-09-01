import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: Error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <Link to={"/"}>Back to home</Link>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}