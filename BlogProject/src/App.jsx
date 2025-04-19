import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";
import { logout, login } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return !Loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
