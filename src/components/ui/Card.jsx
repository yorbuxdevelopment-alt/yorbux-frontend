export default function Card() {
  return (
    <div className="bg-main-card p-5 rounded-2xl shadow-sm border border-border-color">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-400" />
        <div className="flex-1">
          <h3 className="font-bold text-main-text">Sepural Gallery</h3>
          <p className="text-sm text-sec-text">15h. Public</p>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="mt-4 bg-gray-100 dark:bg-[#3a3b3c] h-64 rounded-xl overflow-hidden">
        {/* Image placeholder */}
        <div className="w-full h-full flex items-center justify-center text-sec-text">
           Image Area
        </div>
      </div>
    </div>
  );
}