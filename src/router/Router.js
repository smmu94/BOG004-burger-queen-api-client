import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logincontainer from "../container/Logincontainer";
import Ordercontainer from '../container/Ordercontainer';
import Kitchencontainer from '../container/Kitchencontainer';


const Routercomponent = () => {

    return (
      
            <Router>
              <Routes>
                <Route path="/" element={<Logincontainer />} />
                <Route path="/order" element={<Ordercontainer />} /> 
                <Route path="/kitchen" element={<Kitchencontainer />} /> 

              </Routes>
            </Router>
    
    );
  }
  
  export default Routercomponent;