import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  const errorText = is404 ? "404 Page Not Found" : "500 Internal Server Error";
  const errorDescription = is404 ? "This page could not be found." : "Something went wrong.";

  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">{errorText}</h1>
          <p className="mb-5 text-xl">{errorDescription}</p>
          <button className="btn btn-primary" onClick={() => (window.location.href = "/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
