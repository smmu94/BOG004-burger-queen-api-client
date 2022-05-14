import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logincontainer from "../container/Login-container";
import Ordercontainer from '../container/Order-container';


function Routercomponent() {
    return (
      
            <Router>
              <Routes>
                <Route path="/" element={<Logincontainer />} />
                <Route path="/order" element={<Ordercontainer />} /> 
              </Routes>
            </Router>
    
    );
  }
  
  export default Routercomponent;