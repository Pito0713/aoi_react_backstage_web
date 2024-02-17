import * as React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import { useAppPages } from "../hooks/useAppPage";
import { useMainPages } from "../hooks/useMainPage";
// import MainPage from '../page';

export const RootRouter: React.FC<any> = ({ auth }) => {
  const AuthedPage = () => {
    return (
      <HashRouter>
        <Routes>
          {auth.map((el) => (
            <Route path={el.path} element={el.element} key={el.path} />
          ))}
        </Routes>
      </HashRouter>
    );
  };


  return <AuthedPage />
};

export default RootRouter;