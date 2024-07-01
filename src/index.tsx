import { Fragment } from "react";
import BasePage from "./pages";
import { ToastContainer } from "./shared/toastContainer";
import { LoadingIndicator } from "./shared/loadingIndicator";

function App() {
  return (
    <Fragment>
      <LoadingIndicator />
      <BasePage />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
