import ProductPage from "../page/Product";
import SettingPage from "../page/Setting";
export const useMainPages = () => {
  return [
    {
      path: "/",
      element: <ProductPage />,
    },
    {
      path: "/settingPage",
      element: <SettingPage />,
    },
  ]
};