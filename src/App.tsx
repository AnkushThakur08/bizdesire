import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserForm from "./components/form";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <UserForm />
      </Provider>
    </>
  );
}

export default App;
