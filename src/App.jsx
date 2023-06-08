import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.jsx";
import LogOffRoute from "./routes/LogOffRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Root from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const queryClient = new QueryClient();

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
          path: "/login",
          element: (
            <LogOffRoute>
              <Login />
            </LogOffRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
