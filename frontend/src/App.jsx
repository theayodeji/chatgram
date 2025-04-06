import { useEffect, useState } from "react";
import "./global.css";
import Navbar from "./components/Navbar";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme} className="lg:h-screen flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />}/>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"}/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to={"/login"} />}/>
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />}/>
        {/* route for 404 page */}
        <Route path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-7xl font-bold mb-4">404 Not Found</h1>
              <Link to={"/"}>
                <button className="btn btn-secondary">Go Home</button>
              </Link>
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
