import { BrowserRouter,  Route,  Routes } from "react-router-dom";


import React from 'react'
import Dashboard from "./DashboardLayout";
import Sample from "../Pages/Sample";
import Analytics from "../Pages/Analytics";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Image from "../Pages/Image";
import Contact from "../Pages/Contact";
import Service from "../Pages/Service";
import { menuItem } from "./MenuItem";
import WebsiteLayout from "./WebsiteLayout";
import { useSelector } from "react-redux";
import { SelectAuth } from "../reducers/authReducer";
import Branch from "../Pages/Branch";
import Customer from "../Admin Panel Pages/Customer";




// const ProtectedRoute = ({ children }) => {
//   console.log("children",children);
//   const isAuthenticated = true
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };
 
// const AppRoutes = () => {
//   const myRoutes = createBrowserRouter([
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Home />
//         </ProtectedRoute>
//       ),
//       children: menuItem,
//     },
//   ]);
 
//   return <RouterProvider router={myRoutes} />;
// };



function Index() {
  const auth = useSelector(SelectAuth);
  console.log("auth",auth);
  return (
    <>
      <BrowserRouter>
        {auth ? (
          <>
            <Routes>
            <Route path="/" element={<Dashboard  menuItem={menuItem}/>}>
              {/* Nested Routes */}
              <Route path="sample" element={<Sample />} />
              <Route path="analytics" element={<Analytics/>} />
              <Route path="dashboard" element={<Analytics/>} />
              <Route path="customer" element={<Customer/>} />
            </Route>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/image" element={<Image />} />
            <Route path="/branch" element={<Branch/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
          </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
 
}

export default Index;