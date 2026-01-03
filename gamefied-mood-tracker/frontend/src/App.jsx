
import AppRoutes from './routes/AppRoutes.jsx';
import { UserProvider } from './context/UserContext.jsx';
import './styles/global.css';

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
