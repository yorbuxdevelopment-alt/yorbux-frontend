import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import FriendsList from '../components/widgets/FriendsList';

const notifications = [
  { id: 1, user: "Yazdan Khan", action: "Commented on your photo.", time: "4 minutes ago", avatar: "https://i.pravatar.cc/150?u=1", type: "comment", unread: true },
  { id: 2, user: "Hammadou Ibrahima", action: "Followed you", time: "2 hours ago", avatar: "https://i.pravatar.cc/150?u=2", type: "follow", hasButton: true, buttonText: "Follow Back" },
  { id: 3, user: "Pratap Vania", action: "Like your post \"Need a logo..\"", time: "3 hours ago", avatar: "https://i.pravatar.cc/150?u=3", type: "like", unread: false },
  { id: 4, user: "Hammadou Ibrahima", action: "Followed you", time: "3 hours ago", avatar: "https://i.pravatar.cc/150?u=4", type: "follow", hasButton: true, buttonText: "Followed", isFollowed: true },
];

const NotificationsPage = () => {
  return (
    <div className="bg-main-bg min-h-screen">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-main-bg">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6">
        {/* Left Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Notification List - 7 Columns */}
        <main className="col-span-7 bg-card-bg rounded-2xl shadow-sm border border-border-color overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
          <div className="p-6 border-b border-border-color flex justify-between items-center">
            <h2 className="text-h1 font-bold text-main-text">Notification</h2>
            <button className="text-sec-text hover:text-action-blue transition-colors">⚙️</button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border-color/30">
            {notifications.map((notif) => (
              <div key={notif.id} className={`flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${notif.unread ? 'bg-action-blue/5' : ''}`}>
                
                {/* User Avatar & Status Icon */}
                <div className="relative">
                  <img 
                    src={notif.avatar} 
                    alt="user" 
                    className="w-12 h-12 rounded-full border border-border-color/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card-bg bg-action-blue text-white flex items-center justify-center text-[10px] shadow-sm">
                    {notif.type === 'comment' ? '💬' : notif.type === 'follow' ? '👤' : '❤️'}
                  </div>
                </div>

                {/* Notification Content */}
                <div className="flex-1">
                  <p className="text-sm text-main-text">
                    <span className="font-bold">{notif.user}</span> {notif.action}
                  </p>
                  <p className="text-xs text-sec-text mt-1">{notif.time}</p>
                </div>

                {/* Right Side - Buttons or Unread Dot */}
                <div className="flex items-center gap-4">
                  {notif.hasButton && (
                    <button className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${notif.isFollowed ? 'bg-main-bg text-sec-text' : 'bg-action-blue text-white shadow-lg shadow-action-blue/20'}`}>
                      {notif.buttonText}
                    </button>
                  )}
                  {notif.unread && (
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-sm shadow-orange-500/50"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar (Friends List) - 3 Columns */}
        <aside className="col-span-3 sticky top-28 h-[calc(100vh-8rem)]">
          <FriendsList />
        </aside>

      </div>
    </div>
  );
};

export default NotificationsPage;