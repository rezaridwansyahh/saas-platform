

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ThemeProvider } from "./context/ThemeContext";
// import { AuthProvider } from "./context/AuthContext"; // ⬅️ import AuthProvider

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ Router must wrap everything */}
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
