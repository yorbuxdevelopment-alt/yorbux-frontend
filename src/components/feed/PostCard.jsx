export default function PostCard() {
  return (
    <div className="bg-main-card rounded-xl p-4 shadow-sm mb-4 border border-border-color">
      {/* User Header */}
      <div className="flex items-center gap-3 mb-3">
        <img src="user-avatar.jpg" className="w-10 h-10 rounded-full" alt="user" />
        <div>
          <h4 className="font-bold text-main-text">Theresa Webb</h4>
          <p className="text-xs text-sec-text">5 mins ago</p>
        </div>
      </div>

      {/* Post Text */}
      <p className="text-main-text mb-4 text-sm">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint...
      </p>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-border-color pt-3">
        <button className="flex items-center gap-2 text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
          <span>👍 Like</span>
        </button>
        <button className="flex items-center gap-2 text-sec-text hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
          <span>💬 Comment</span>
        </button>
      </div>
    </div>
  );
}