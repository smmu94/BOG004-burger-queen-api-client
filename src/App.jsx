import "./App.scss";
import Login from "./componentes/login.jsx";
import logoburger from "./images/logo-burger.png";
import Order from "./componentes/order.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <img src={ logoburger } alt="logo-burger" />
      <div className="login">
        <div className="order">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
