import React, { PropsWithChildren } from "react";
import Script from "next/script";
import { MiroSDKInit } from "../components/SDKInit";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/preline@1.0.0/dist/preline.min.css" rel="stylesheet" />
      </head>
      <body>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/preline@1.0.0/dist/preline.min.js"
          strategy="afterInteractive"
        />
        <MiroSDKInit />
        <div id="root">
          <div className="grid">
            <div className="cs1 ce12">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
