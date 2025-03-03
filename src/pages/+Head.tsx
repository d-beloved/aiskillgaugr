// https://vike.dev/Head

import React from "react";
import logoUrl from "../assets/guagrIcon.png";

export default function HeadDefault() {
  const gaKey = import.meta.env.PUBLIC_ENV__GOOGLE_ANALYTICS;

  return (
    <>
      <link rel="icon" href={logoUrl} />

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaKey}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaKey}');`,
        }}
      ></script>
    </>
  );
}
