import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/yazarpanel/giris' />;
  }

  return children;
};

export default ProtectedRoute;
