import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, Send } from 'lucide-react';

const CreatePostFeed = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!text.trim() && !imagePreview) return;
    
    // Optimistic UI update: Turant UI clear karein aur processing shuru karein
    setIsPosting(true);
    const postData = { text, image: imagePreview };
    
    setTimeout(() => {
      console.log("Post created:", postData);
      setText('');
      setImagePreview(null);
      setIsPosting(false);
      // Yahan aap Redux dispatch call kar sakte hain: dispatch(createPost(postData))
    }, 500);
  };

  return (
    <div className="bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-ui mb-6">
      <div className="flex gap-4">
        <img src="https://i.pravatar.cc/150?u=saleh" alt="User" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-bg-page border border-border-ui rounded-xl p-4 outline-none focus:border-action-blue resize-none text-text-main"
            rows="3"
          />

          {/* Image Preview Section */}
          {imagePreview && (
            <div className="relative inline-block mt-2">
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded-xl border border-border-ui object-cover" />
              <button 
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 text-action-blue hover:bg-action-blue/10 px-4 py-2 rounded-lg transition-all font-semibold text-sm"
              >
                <ImageIcon size={20} />
                Choose file
              </button>
            </div>
            
            <button 
              onClick={handlePost} disabled={isPosting || (!text.trim() && !imagePreview)}
              className="flex items-center gap-2 bg-action-blue text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isPosting ? 'Posting...' : <><Send size={18} /> Post</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostFeed;