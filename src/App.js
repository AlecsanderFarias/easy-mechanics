import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./routes";

import GlobalStyle from "./styles/global";
import bucket from "./store/index";

function App() {
  return (
    <Provider store={bucket.store}>
      <PersistGate persistor={bucket.persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
