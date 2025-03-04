import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function Page() {
  const { is404 } = usePageContext();
  const errorText = is404 ? "404 Page Not Found" : "500 Internal Server Error";
  const errorDescription = is404 ? "This page could not be found." : "Something went wrong.";

  return (
    <div className="hero min-h-[75vh] animate-fade-in">
      <div className="hero-overlay rounded-4xl"></div>
      <div className="hero-content text-neutral-content text-center animate-scale-in">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-3xl sm:text-5xl font-bold">{errorText}</h1>
          <p className="mb-5 text-xl">{errorDescription}</p>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Add export for Vike routing
export const route = "/_error";
