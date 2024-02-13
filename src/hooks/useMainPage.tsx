import ProductPage from "../page/Product";
import SettingPage from "../page/Setting";
export const useMainPages = () => {
  return [
    {
      path: "/mainPage",
      element: <ProductPage />,
    },
    {
      path: "/mainPage",
      element: <SettingPage />,
    },
  ]
};