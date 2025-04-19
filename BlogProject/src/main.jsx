import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Protected as AuthLayout } from "./components/AuthLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPosts from "./pages/EditPosts.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/allposts",
        element: (
          <AuthLayout authentication>
            {""}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/addposts",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/editPost/:slug",
        element: (
          <AuthLayout authentication>
            <EditPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
