import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import AuthProvider from "./providers/AuthProvider.jsx";
import LogOffRoute from "./routes/LogOffRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import StudentRoute from "./routes/StudentRoute.jsx";
import InstructorRoute from "./routes/InstructorRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import Root from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Instructor from "./pages/Instructor.jsx";
import Course from "./pages/Course.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardRoot from "./components/DashboardRoot.jsx";
import BookedCourse from "./pages/student/BookedCourse.jsx";
import EnrolledCourse from "./pages/student/EnrolledCourse.jsx";
import PaymentHistory from "./pages/student/PaymentHistory.jsx";
import NewCourse from "./pages/instructor/NewCourse.jsx";
import MyCourse from "./pages/instructor/MyCourse.jsx";
import ManageCourse from "./pages/admin/ManageCourse.jsx";
import ManageUser from "./pages/admin/ManageUser.jsx";

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "instructor",
          element: <Instructor />,
        },
        {
          path: "course",
          element: <Course />,
        },
        {
          path: "login",
          element: (
            <LogOffRoute>
              <Login />
            </LogOffRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/dashboard",
              element: <DashboardRoot />,
            },
            {
              path: "booked-course",
              element: (
                <StudentRoute>
                  <BookedCourse />
                </StudentRoute>
              ),
            },
            {
              path: "enrolled-course",
              element: (
                <StudentRoute>
                  <EnrolledCourse />
                </StudentRoute>
              ),
            },
            {
              path: "payment-history",
              element: (
                <StudentRoute>
                  <PaymentHistory />
                </StudentRoute>
              ),
            },
            {
              path: "new-course",
              element: (
                <InstructorRoute>
                  <NewCourse />
                </InstructorRoute>
              ),
            },
            {
              path: "my-course",
              element: (
                <InstructorRoute>
                  <MyCourse />
                </InstructorRoute>
              ),
            },
            {
              path: "manage-course",
              element: (
                <AdminRoute>
                  <ManageCourse />
                </AdminRoute>
              ),
            },
            {
              path: "manage-user",
              element: (
                <AdminRoute>
                  <ManageUser />
                </AdminRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StripeElements stripe={stripePromise}>
            <RouterProvider router={router} />
          </StripeElements>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
