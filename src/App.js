import './App.css';
// import Login from "./componentes/login.jsx";
// import logoburger from "./images/LogoSample_ByTailorBrands__2_-removebg-preview.png"
import { BrowserRouter as Router,
  Routes,
  Route, } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
   
   <Routes>
         <Route path="/" element={ <div>
     hola
     
   </div>} />
        
           </Routes>
   </Router>
    </div>
  );
}

export default App;
