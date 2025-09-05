import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <NavBar />
          
          <Routes>
            <Route path='/' element={<h2>Inicio</h2>} />
            <Route path='/about' element={<h2>Sobre nós</h2>} />
            <Route path='/login' element={<h2>Login</h2>} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
