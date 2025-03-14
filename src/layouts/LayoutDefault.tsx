import "./style.css";
import "./tailwind.css";

import React from "react";
import { QuizProvider } from "@/contexts/QuizContext";
import Footer from "@/components/Footer";
import logo from "../assets/guagrLogo.png";
import { event } from "@/utils/analytics";
import { usePageContext } from "vike-react/usePageContext";

export const handleVisitRepository = () => {
  event({
    action: "visit_github_repo",
    category: "Github",
    label: `${window.location.pathname}`,
  });
};

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const { urlPathname } = usePageContext();
  const isQuizPage = urlPathname === "/quiz";

  const Logo = () => (
    <div className="w-36 h-12">
      {isQuizPage ? (
        <img src={logo} alt="Logo" className="w-full h-full" />
      ) : (
        <a href="/" className="block w-full h-full">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </a>
      )}
    </div>
  );

  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-cyan-950 to-slate-900 flex flex-col">
        <div className="flex items-center justify-between px-16 pt-4 max-sm:p-4 animate-fade-in">
          <Logo />
          <div>
            <a
              href="https://github.com/d-beloved/aiskillgaugr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm normal-case gap-2 text-white/80 hover:text-white transition-colors"
              onClick={handleVisitRepository}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden min-[425px]:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
        <main className="container mx-auto sm:px-4 py-8 flex-grow">
          <Content>{children}</Content>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-content" className="w-full transition-opacity duration-300">
      {children}
    </div>
  );
}
