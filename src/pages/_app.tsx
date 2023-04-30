import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";
import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";

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

  const [showScroll, setShowScroll] = useState(false);

  // get windows scroll position

  typeof window !== "undefined" &&
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      if (scrolled >= 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });

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
      {/* if window scrolled to 100 */}

      {showScroll ? (
        <div className="fixed bottom-0 right-0 mb-5 mr-5">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full bg-gradient-to-r from-indigo-300 to-indigo-600 p-3 text-white shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md "
          >
            <FaArrowUp />
          </button>
        </div>
      ) : null}
    </>
  );
}

export default MyApp;
