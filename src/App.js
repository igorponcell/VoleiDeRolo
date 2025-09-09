import './App.css';
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


// Importing components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Importing pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

// Main App component 

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
        <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;