import { createBrowserRouter } from "react-router-dom";

import { ProtectedRouter } from "./components/ui/ProtectedRouter";
import { URLS } from "./constants/urls";
import { DashboardPage } from "./pages/Dashboard";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import { LoginPage } from "./pages/Login";
import { MyCoursesPage } from "./pages/MyProducts";

const router = createBrowserRouter([
  // Auth routes
  {
    path: URLS.login,
    element: <LoginPage />,
  },
  {
    path: URLS.dashboard,
    errorElement: <GeneralError />,
    element: <ProtectedRouter />,
    children: [
      {
        path: URLS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: URLS.my_courses,
        element: <MyCoursesPage />,
      },
    ],
  },
  { path: "*", Component: NotFoundError },
]);

export default router;
