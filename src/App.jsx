import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import AuthContextProvider, { AuthContext } from "./Contexts/AuthContext";

import { ToastContainer, toast } from "react-toastify";

import { Offline, Online } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./routes/Routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes/>
          <ToastContainer newestOnTop={true} />
          <Offline>
            <div className="bg-yellow-400 fixed bottom-4 start-4 rounded-md p-2">
              Only shown offline (surprise!)
            </div>
          </Offline>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
