import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logincontainer from "../container/Logincontainer";
import Ordercontainer from '../container/Ordercontainer';
import Kitchencontainer from '../container/Kitchencontainer';
import Readyorders from "../container/Readyorders";
import Admincontainer from "../container/Admincontainer";


const Routercomponent = () => {

    return (
      
            <Router>
              <Routes>
                <Route path="/" element={<Logincontainer />} />
                <Route path="/order" element={<Ordercontainer />} /> 
                <Route path="/kitchen" element={<Kitchencontainer />} /> 
                <Route path="/readyorder" element={<Readyorders />} /> 
                <Route path="/admin" element={<Admincontainer />} /> 
              </Routes>
            </Router>
    
    );
  }
  
  export default Routercomponent;