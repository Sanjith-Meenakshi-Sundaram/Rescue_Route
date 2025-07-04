import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppRoutes from "./routes/AppRoutes";

const customHistory = createBrowserHistory();

const App = () => {
  return (
    <HistoryRouter
      history={customHistory}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
    </HistoryRouter>
  );
};

export default App;
