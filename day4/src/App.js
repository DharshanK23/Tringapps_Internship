import './components/regform.jsx'
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Registration from './components/regform.jsx';
import Home from './components/home.jsx';
function App() {
  return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element ={<Registration/>}/>
    <Route path='/home' element ={<Home/>}/>
   </Routes>
  </BrowserRouter>
  
  );
}

export default App;