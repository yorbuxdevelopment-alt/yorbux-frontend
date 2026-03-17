import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const MessagesPage = () => {
  return (
    <div className="bg-main-bg min-h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6 bg-main-bg">
        <Navbar />
      </div>

      <div className="max-w-full mx-auto grid grid-cols-12 gap-6 pt-28 px-6 h-screen">
        {/* Left Sidebar - 2 Columns */}
        <aside className="col-span-2 sticky top-28 h-fit">
          <Sidebar />
        </aside>

        {/* Message Content Area - 10 Columns (Replacing Feed, RightBar, and FriendsList space) */}
        <div className="col-span-10 flex gap-6 h-[calc(100vh-8rem)] mb-6">
          
          {/* Chat List (Middle Column) */}
          <section className="w-96 flex flex-col bg-card-bg rounded-2xl shadow-sm overflow-hidden border border-border-color">
            <div className="p-4 border-b border-border-color">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-gray-100 dark:bg-[#3a3b3c] p-3 pl-10 rounded-xl outline-none text-main-text"
                  />
                  <span className="absolute left-3 top-3 opacity-50">🔍</span>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b border-border-color/50">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="font-bold truncate text-main-text">Jagrit Pratap Bill</h4>
                      <span className="text-[10px] text-sec-text">11:26 am</span>
                    </div>
                    <p className="text-sm text-sec-text truncate">Thanks buddy, you too...</p>
                  </div>
                  <div className="w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">1</div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Chat Window (Right Column) */}
          <main className="flex-1 flex flex-col bg-card-bg rounded-2xl shadow-sm overflow-hidden border border-border-color">
            {/* Chat Header */}
            <header className="p-4 border-b border-border-color flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-300" />
                 <div>
                    <h4 className="font-bold text-sm text-main-text">Jagrit Pratap Bill</h4>
                    <p className="text-[10px] text-green-500 flex items-center gap-1 font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full" /> Active now
                    </p>
                 </div>
              </div>
              <div className="flex gap-4 text-sec-text">
                <button className="hover:text-blue-600 transition-colors">📞</button> 
                <button className="hover:text-blue-600 transition-colors">📹</button> 
                <button className="hover:text-blue-600 transition-colors">ℹ️</button>
              </div>
            </header>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/5 dark:bg-black/5 no-scrollbar">
               <div className="text-center text-xs text-sec-text mb-4">August 15, 2021</div>
               
               {/* Message Left */}
               <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
                  <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-none text-sm shadow-sm">
                    Welcome to UI HUT! Whether you're opening a new online store...
                  </div>
               </div>

               {/* Message Right (User) */}
               <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
                  <div className="bg-chat-bubble text-main-text p-4 rounded-2xl rounded-tr-none text-sm shadow-sm border border-border-color">
                    After you register for a free trial, follow the initial setup guide...
                  </div>
               </div>
            </div>

            {/* Message Input Bar */}
            <footer className="p-4 border-t border-border-color">
              <div className="bg-gray-100 dark:bg-[#3a3b3c] rounded-xl p-2 flex items-center gap-3">
                 <input 
                   type="text" 
                   placeholder="Type something here..." 
                   className="flex-1 bg-transparent px-4 py-2 outline-none text-main-text"
                 />
                 <button className="p-2 text-sec-text hover:text-blue-600">📎</button>
                 <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">➤</button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;