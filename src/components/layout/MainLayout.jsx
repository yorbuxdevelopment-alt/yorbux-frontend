import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Feed from '../../pages/Feed';
import RightBar from './RightBar';
import FriendsList from '../widgets/FriendsList';

function MainLayout() {
  return (
    <div className="bg-bg-page min-h-screen">
      {/* Fixed Navbar with Surface Background */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-bg-page">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        {/* Left Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Main Feed - 5 Columns */}
        <main className="col-span-5 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          <Feed />
        </main>

        {/* Right Widgets - 3 Columns */}
        <aside className="col-span-3 sticky top-28 h-fit space-y-6">
          <RightBar />
        </aside>

        {/* Friends List - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar bg-bg-surface rounded-2xl border border-border-ui">
          <FriendsList />
        </aside>
      </div>
    </div>
  );
}

export default MainLayout;