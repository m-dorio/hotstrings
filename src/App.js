
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Products from './pages/Products';
import Register from './pages/Register';
import Error from './pages/Error';
import Login from './pages/Login';
import Logout from './pages/Logout';
import './App.css';

function App() {
  return (
  // React Fragments <></>
    <Router>
      <Container fluid>
        <AppNavbar/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>

      </Container>
    </Router> 
  );
}

export default App;
