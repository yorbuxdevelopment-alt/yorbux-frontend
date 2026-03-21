import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, Info, Send, Paperclip, Smile } from 'lucide-react';
import ChatInfoDrawer from '../components/chat/ChatInfoDrawer';

// --- Enhanced Dummy Data with More Users ---
const initialChatData = [
  { id: 1, name: "Jagrit Pratap Bill", avatar: "https://i.pravatar.cc/150?u=1", online: true, messages: [{ sender: "them", text: "Hey, how's it going?" }], unread: 2 },
  { id: 2, name: "Anjali Sharma", avatar: "https://i.pravatar.cc/150?u=2", online: false, messages: [{ sender: "them", text: "Can you send me the file?" }], unread: 0 },
  { id: 3, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?u=3", online: true, messages: [{ sender: "them", text: "Let's meet at 5 PM." }], unread: 5 },
  { id: 4, name: "Priya Singh", avatar: "https://i.pravatar.cc/150?u=4", online: false, messages: [{ sender: "them", text: "Okay, sounds good." }], unread: 0 },
  { id: 5, name: "John Doe", avatar: "https://i.pravatar.cc/150?u=5", online: true, messages: [{ sender: "them", text: "Let's catch up later." }], unread: 1 },
  { id: 6, name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=6", online: false, messages: [{ sender: "them", text: "See you at the meeting." }], unread: 0 },
  { id: 7, name: "Harvey Specter", avatar: "https://i.pravatar.cc/150?u=7", online: true, messages: [{ sender: "them", text: "Get it done." }], unread: 3 },
];

const MessagesPage = () => {
  const [chatData, setChatData] = useState(initialChatData);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const selectedChat = chatData.find(c => c.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const messageObj = { sender: "me", text: newMessage };
    const updatedChatData = chatData.map(chat => chat.id === selectedChatId ? { ...chat, messages: [...chat.messages, messageObj] } : chat);
    setChatData(updatedChatData);
    setNewMessage("");

    setTimeout(() => {
      const replyObj = { sender: "them", text: "Awesome! Thanks for the update." };
      const repliedChatData = updatedChatData.map(chat => chat.id === selectedChatId ? { ...chat, messages: [...chat.messages, replyObj] } : chat);
      setChatData(repliedChatData);
    }, 1500);
  };

  return (
    <div className="flex gap-4 h-full">
      <section className="w-96 flex flex-col bg-bg-surface rounded-2xl shadow-sm overflow-hidden border border-border-ui">
        <div className="p-4 border-b border-border-ui">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={20} />
              <input type="text" placeholder="Search Messages" className="w-full bg-bg-page p-3 pl-10 rounded-xl outline-none text-text-main"/>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chatData.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChatId(chat.id)} className={`flex items-start gap-3 p-4 cursor-pointer border-b border-border-ui/50 transition-colors ${selectedChatId === chat.id ? 'bg-[color:var(--chat-active-bg)]' : 'hover:bg-bg-page'}`}>
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-surface"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold truncate text-text-main">{chat.name}</h4>
                <p className="text-sm text-text-sec truncate">{chat.messages[chat.messages.length - 1].text}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-text-sec">11:26 am</span>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-lg flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="flex-1 flex flex-col bg-bg-surface rounded-2xl shadow-sm overflow-hidden border border-border-ui">
        {selectedChat ? (
          <>
            <header className="p-4 border-b border-border-ui flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full" />
                 <div>
                    <h4 className="font-bold text-sm text-text-main">{selectedChat.name}</h4>
                    <p className={`text-[10px] flex items-center gap-1 font-medium ${selectedChat.online ? 'text-green-500' : 'text-text-sec'}`}>
                      {selectedChat.online && <span className="w-2 h-2 bg-green-500 rounded-full" />} 
                      {selectedChat.online ? 'Active now' : 'Offline'}
                    </p>
                 </div>
              </div>
              <div className="flex gap-4 text-text-sec">
                <button className="hover:text-action-blue transition-colors"><Phone size={20} /></button> 
                <button className="hover:text-action-blue transition-colors"><Video size={20} /></button> 
                <button onClick={() => setIsDrawerOpen(true)} className="hover:text-action-blue transition-colors"><Info size={20} /></button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-page/50 no-scrollbar">
              {selectedChat.messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <img src={msg.sender === 'me' ? 'https://i.pravatar.cc/40?u=saleh' : selectedChat.avatar} alt="avatar" className="w-8 h-8 rounded-full shrink-0" />
                  <div className={`p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-bg-card text-text-main border border-border-ui rounded-tr-none' : 'bg-action-blue text-white rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <footer className="p-4 border-t border-border-ui">
              <div className="bg-bg-page rounded-xl p-2 flex items-center gap-3">
                 <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} type="text" placeholder="Type something here..." className="flex-1 bg-transparent px-4 py-2 outline-none text-text-main"/>
                 <button className="p-2 text-text-sec hover:text-action-blue"><Paperclip size={20} /></button>
                 <button className="p-2 text-text-sec hover:text-action-blue"><Smile size={20} /></button>
                 <button onClick={handleSendMessage} className="bg-action-blue text-white p-3 rounded-xl hover:opacity-90"><Send size={16} /></button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-text-sec"><p>Select a chat to start messaging</p></div>
        )}
      </main>
      
      <ChatInfoDrawer user={selectedChat} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default MessagesPage;