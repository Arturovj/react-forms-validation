import logo from './logo.svg';
import { Routes, Route } from 'react-router';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
