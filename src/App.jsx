import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import ResetPassword from './components/ResetPassword';
import VerifyOTP from './components/VerifyOTP';
import { logout } from './redux/authSlice';
import Products from './redux/Products';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';

function App() {
  // Redux se isAuthenticated aur role fetch kar rahe hain
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <Routes>
      <Route path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ROLE BASED ROUTING YAHAN ADD KAR SAKTE HAIN LATER */}
      {/* Example: isAuthenticated && role === 'admin' ? <AdminRoutes /> : null */}
      {isAuthenticated ? (
        <Route path="/" element={<MainLayout handleLogout={handleLogout} />}>
          <Route index element={<Feed />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="dashboard/products" element={<Products />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/signin" />} />
      )}
    </Routes>
  );
}

export default App;