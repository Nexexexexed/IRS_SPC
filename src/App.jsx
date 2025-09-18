import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import AppRouter from "./routes/Router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
