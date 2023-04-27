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
