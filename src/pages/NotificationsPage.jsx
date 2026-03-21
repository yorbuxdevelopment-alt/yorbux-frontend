import React from 'react';
import { Settings, MessageSquare, UserPlus, Heart, Share2, Image as ImageIcon } from 'lucide-react';

const notifications = [
  { id: 1, type: 'comment', user: 'Yazdan Khan', action: 'Commented on your photo.', time: '4 minutes ago', unread: true },
  { id: 2, type: 'follow', user: 'Hammadou Ibrahima', action: 'Followed you', time: '2 hours ago', status: 'Followed' },
  { id: 3, type: 'like', user: 'Pratap Vania', action: 'Like your post "Need a logo.."', time: '3 hours ago' },
  { id: 4, type: 'share', user: 'Yazdan Khan', action: 'Share your post', time: '4 hours ago', unread: true },
  { id: 5, type: 'follow', user: 'Alexander James Code', action: 'Followed you', time: '1 day ago', status: 'Follow Back' },
];

const NotificationItem = ({ item }) => {
  const getIcon = () => {
    switch(item.type) {
      case 'comment': return <div className="bg-notif-comment-bg text-notif-comment-fg p-1.5 rounded-lg"><MessageSquare size={14} fill="currentColor" /></div>;
      case 'follow': return <div className="bg-notif-follow-bg text-notif-follow-fg p-1.5 rounded-lg"><UserPlus size={14} fill="currentColor" /></div>;
      case 'like': return <div className="bg-notif-like-bg text-notif-like-fg p-1.5 rounded-lg"><Heart size={14} fill="currentColor" /></div>;
      case 'share': return <div className="bg-notif-share-bg text-notif-share-fg p-1.5 rounded-lg"><Share2 size={14} fill="currentColor" /></div>;
      default: return <div className="bg-bg-page text-text-sec p-1.5 rounded-lg"><ImageIcon size={14} /></div>;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border-ui hover:bg-bg-page transition-colors last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-8 flex justify-center">{getIcon()}</div>
        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
          <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-[14px] font-semibold text-text-main">
            {item.user} <span className="font-medium text-text-sec ml-1">{item.action}</span>
          </h4>
          <p className="text-[12px] text-text-sec mt-0.5">{item.time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {item.status === 'Followed' && (
          <button className="px-5 py-2 border border-border-ui text-text-sec text-[13px] font-semibold rounded-xl cursor-default">
            Followed
          </button>
        )}
        {item.status === 'Follow Back' && (
          <button className="px-5 py-2 bg-action-blue text-white text-[13px] font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm">
            Follow Back
          </button>
        )}
        {item.unread && (
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 shadow-sm"></div>
        )}
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div className="bg-bg-surface rounded-2xl shadow-sm border border-border-ui overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-center p-5 border-b border-border-ui">
        <h3 className="text-[17px] font-bold text-text-main">Notification</h3>
        <Settings size={20} className="text-text-sec cursor-pointer hover:text-text-main" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {notifications.map(item => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;