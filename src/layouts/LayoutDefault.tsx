import "./style.css";

import "./tailwind.css";

import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";
import { QuizProvider } from "@/contexts/QuizContext";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <div className={"flex max-w-full m-auto"}>
        {/* <Sidebar> */}
        {/* <Logo /> */}
        {/* <Link href="/">Welcome</Link>
      <Link href="/todo">Todo</Link>
      <Link href="/star-wars">Data Fetching</Link> */}
        {""}
        {/* </Sidebar> */}
        <Content>{children}</Content>
      </div>
    </QuizProvider>
  );
}

// function Sidebar({ children }: { children: React.ReactNode }) {
//   return (
//     <div id="sidebar" className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}>
//       {children}
//     </div>
//   );
// }

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-content" className={"flex w-full min-h-screen"}>
      {children}
    </div>
  );
}

// function Logo() {
//   return (
//     <div className={"p-5 mb-2"}>
//       <a href="/">
//         <img src={logoUrl} height={64} width={64} alt="logo" />
//       </a>
//     </div>
//   );
// }
