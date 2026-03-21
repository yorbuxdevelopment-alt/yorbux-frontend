import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Feed from './pages/Feed';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ExplorePage from './pages/ExplorePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <Routes>
      <Route path="/signin" element={!isAuthenticated ? <SignIn onLogin={handleLogin} /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {isAuthenticated ? (
        <Route path="/" element={<MainLayout handleLogout={handleLogout} />}>
          <Route index element={<Feed />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/signin" />} />
      )}
    </Routes>
  );
}

export default App;