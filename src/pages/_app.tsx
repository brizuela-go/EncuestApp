import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";

type MyAppProps = {
  Component: React.ComponentType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  console.log(
    "%c ¡EncuestApp!",
    "font-weight: bold;  font-size: 80px;color: rgb(69%, 120%, 131%); text-shadow: 3px 3px 0 rgb(17%, 86%, 87%) , 6px 6px 0 rgb(29%, 78%, 89%), 9px 9px 0 rgb(50%, 63%, 93%), 12px 12px 0 rgb(57%, 57%, 93%), 15px 15px 0 rgb(64%, 53%, 96%) , 18px 18px 0 rgb(41%, 31%, 56%), 21px 21px 0 rgb(42,21,113)"
  );

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            // glass morphism
            background: isDarkMode
              ? "rgba(70, 70, 110, 0.4)"
              : "rgba(255, 255, 255, 0.6)",

            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "10px",

            color: isDarkMode ? "#fff" : "#000",
          },
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
