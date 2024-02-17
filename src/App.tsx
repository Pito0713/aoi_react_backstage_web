import * as React from 'react';
import RootRouter from "./router/Router";
import { AppProvider } from './redux/AppContent';
import { useAppPages } from "./hooks/useAppPage";
import { useMainPages } from "./hooks/useMainPage";

function App() {
  const token = window.localStorage.getItem('token');


  return (
    <AppProvider>
      <RootRouter auth={!token ? useAppPages() : useMainPages()} />
    </AppProvider>

  );
}

export default App