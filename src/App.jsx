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
import EditProfile from './pages/EditProfile';
import ViewProfile from './pages/ViewProfile';
import SellerListing from './pages/SellerListing';
import SellerProfile from './pages/SellerProfile';
import SellerOnboarding from './pages/SellerOnboarding';

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
      <Route path="/" element={<MainLayout handleLogout={handleLogout} />}>
        <Route index element={isAuthenticated ? <Navigate to="/marketplace" replace /> : <Navigate to="/signin" replace />} />
        <Route path="marketplace" element={isAuthenticated ? <SellerListing /> : <Navigate to="/signin" />} />
        <Route path="marketplace/sellers/:sellerId" element={isAuthenticated ? <SellerProfile /> : <Navigate to="/signin" />} />
        <Route path="feed" element={isAuthenticated ? <Feed /> : <Navigate to="/signin" />} />
        <Route path="community" element={isAuthenticated ? <CommunityPage /> : <Navigate to="/signin" />} />
        <Route path="jobs" element={isAuthenticated ? <Jobs /> : <Navigate to="/signin" />} />
        <Route path="post-job" element={isAuthenticated ? <PostJob /> : <Navigate to="/signin" />} />
        <Route path="messages" element={isAuthenticated ? <MessagesPage /> : <Navigate to="/signin" />} />
        <Route path="notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/signin" />} />
        <Route path="explore" element={isAuthenticated ? <ExplorePage /> : <Navigate to="/signin" />} />
        <Route path="seller/onboarding" element={isAuthenticated ? <SellerOnboarding /> : <Navigate to="/signin" />} />
        <Route path="profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/signin" />} />
        <Route path="dashboard/products" element={isAuthenticated ? <Products /> : <Navigate to="/signin" />} />
        <Route path="edit-profile" element={isAuthenticated ? <EditProfile/> : <Navigate to="/signin" />} />
        <Route path="view-profile" element={isAuthenticated ? <ViewProfile/> : <Navigate to="/signin" />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? '/marketplace' : '/signin'} />} />
    </Routes>
  );
}

export default App;
