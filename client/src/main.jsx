import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="143174095749-8b8vjadb5jmf9fq8opjqa0310uhue9as.apps.googleusercontent.com">
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
        icon={false}
        emoji={false}
      />
    </GoogleOAuthProvider>
  </StrictMode>
);