import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SplashScreen from './layout/Loader';
import KitapDetay from './pages/KitapDetay';
import Login from './pages/admin/Login';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kitap/:id' element={<KitapDetay />} />
        <Route path='/yazarpanel/giris' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
