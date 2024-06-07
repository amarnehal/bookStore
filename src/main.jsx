import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./appComponents/Layout/Layout.jsx";
import Home from "./appComponents/Home/Home.jsx";
import Login from "./appComponents/Login.jsx";
import UserBooks from "./appComponents/UserBooks.jsx";
import Register from "./appComponents/Register.jsx";
import ProtectedRoute from "./appComponents/ProtectedRoute.jsx";
import UpdateBook from "./appComponents/UpdateBook.jsx";
import BookInfo from "./appComponents/BookInfo.jsx";
import UserProfile from "./appComponents/User/UserProfile.jsx";
import AboutUs from "./appComponents/About/AboutUs";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/books",
          element: (
            <ProtectedRoute authentication={true}>
              <UserBooks />
            </ProtectedRoute>
          ),
        },
        {
          path: "/books/:bookId",
          element: (
            <ProtectedRoute authentication={true}>
              <UpdateBook />
            </ProtectedRoute>
          ),
        },
        {
          path: "/bookInfo/:bookId",
          element: <BookInfo />,
        },
        {
          path: "/profile/:userId",
          element: (
            <ProtectedRoute authentication={true}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]
  // createRoutesFromElements(
  //   <Route path="/" element={<Layout />}>
  //     <Route path="" element={<Home />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/register" element={<Register />} />
  //     <Route element={<ProtectedRoute authentication={true} />}>
  //       <Route path="/books" element={<UserBooks />} />
  //     </Route>
  //   </Route>
  // )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
