import React from 'react';
import { BookOpen, Camera, MoreHorizontal } from 'lucide-react';

const RecentEventCard = () => {
  const events = [
    {
      title: "Graduation Ceremony",
      desc: "The graduation ceremony is also sometimes called...",
      icon: <BookOpen size={20} className="text-[#34D399]" />,
      iconBg: "bg-[#ECFDF5]",
      seenCount: "8 seen",
      avatars: [
        "https://i.pravatar.cc/150?u=1",
        "https://i.pravatar.cc/150?u=2",
        "https://i.pravatar.cc/150?u=3"
      ],
      extra: "+5"
    },
    {
      title: "Photography Ideas",
      desc: "Reflections. Reflections work because they can create...",
      icon: <Camera size={20} className="text-[#F87171]" />,
      iconBg: "bg-[#FEF2F2]",
      seenCount: "11 seen",
      avatars: [
        "https://i.pravatar.cc/150?u=4",
        "https://i.pravatar.cc/150?u=5",
        "https://i.pravatar.cc/150?u=6"
      ],
      extra: "+8"
    }
  ];

  return (
    <div className="bg-bg-surface rounded-[24px] shadow-sm border border-border-ui overflow-hidden w-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-border-ui/50">
        <h3 className="font-bold text-text-main text-lg">Recent Event</h3>
        <MoreHorizontal size={20} className="text-text-sec cursor-pointer" />
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {events.map((event, index) => (
          <div key={index} className="bg-bg-page rounded-[20px] p-4 border border-border-ui/50">
            <div className="flex gap-4">
              {/* Icon Box */}
              <div className={`${event.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                {event.icon}
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col">
                <h4 className="font-bold text-text-main text-base leading-tight">
                  {event.title}
                </h4>
                <p className="text-text-sec text-xs mt-1 leading-relaxed line-clamp-2">
                  {event.desc}
                </p>
              </div>
            </div>

            {/* Separator Line */}
            <div className="h-[1px] bg-border-ui/50 my-3 w-full" />

            {/* Footer: Seen & Avatars */}
            <div className="flex justify-between items-center px-1">
              <span className="text-text-main text-sm font-semibold">
                {event.seenCount}
              </span>
              
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {event.avatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="user"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <div className="w-7 h-7 rounded-full bg-text-main border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    {event.extra}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEventCard;