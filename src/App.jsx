import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SplashScreen from './layout/Loader';
import KitapDetay from './pages/KitapDetay';
import Login from './pages/admin/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from '@components/ProtectedRoute';
import Panel from './pages/admin/Panel';

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
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/kitap/:id' element={<KitapDetay />} />
            <Route path='/yazarpanel/giris' element={<Login />} />
            <Route
              path='/yazarpanel'
              element={
                <ProtectedRoute>
                  <Panel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
