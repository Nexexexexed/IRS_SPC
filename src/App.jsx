import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import AppRouter from "./routes/Router";
import Header from "./components/Header/Header";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
