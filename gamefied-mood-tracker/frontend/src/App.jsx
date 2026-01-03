
import AppRoutes from './routes/AppRoutes.jsx';
import { UserProvider } from './context/UserContext.jsx';
import './styles/global.css';
import { useEffect } from 'react';
import testBackendConnection from './utils/testConnection'; 

function App() {
  useEffect(() => {
     testBackendConnection();
   }, []);
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
