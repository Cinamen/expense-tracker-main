import React from "react";
import AllRoutes from "./AllRoutes";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { ToastContainer } from "react-toastify";
import Desktop_view from "./pages/LoginPage";

const App = () => {
  return (
    <div className="font-primery_font min-h-screen">
      
      <AllRoutes />
      
      <ToastContainer
        className={"toast_custom_design"}
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
