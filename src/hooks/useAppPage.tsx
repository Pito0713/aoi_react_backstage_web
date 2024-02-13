import LogInPage from "../page/LogIn";

export const useAppPages = () => {
  return [
    {
      path: "/",
      element: <LogInPage />,
    },
    {
      path: "/logInPage",
      element: <LogInPage />,
    },
  ]
};