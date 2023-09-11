import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/authenication";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right" // You can adjust the position as needed
        autoClose={5000} // Adjust the autoClose time (in milliseconds) as needed
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
