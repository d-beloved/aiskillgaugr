import React from "react";
import { Link } from "../../components/Link.js";

export default function Page() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">Gauge Your Skill Level</h1>
          <h2 className="mb-5 text-3xl font-bold">Get AI Recommendations For Upskilling</h2>
          <p className="mb-5 text-xl">Select a language and level to start the quiz.</p>
          <button className="btn btn-primary">Select Language</button>
        </div>
      </div>
    </div>
  );
}
