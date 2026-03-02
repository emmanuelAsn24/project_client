import { Routes, Route, Navigate } from 'react-router-dom';
import { SecuritySpace } from './pages/security_space';
import Home from './pages/home';
import PrivateRoute from './pages/privateRoute';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    // ✅ On retire overflow-hidden qui bloquait le scroll de Home
    // ✅ Le div racine laisse chaque page gérer son propre scroll
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex" }}>
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/security" element={<SecuritySpace />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;