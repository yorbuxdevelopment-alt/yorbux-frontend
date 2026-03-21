import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const ImagePreviewModal = ({ images, startIndex, onClose }) => {
  if (!images || images.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setZoom(1); // Reset zoom on image change
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setZoom(1); // Reset zoom on image change
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Controls Header */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 text-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={handleZoomIn} className="p-2 rounded-full hover:bg-white/20"><ZoomIn size={24} /></button>
          <button onClick={handleZoomOut} className="p-2 rounded-full hover:bg-white/20"><ZoomOut size={24} /></button>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20"><X size={28} /></button>
      </div>

      {/* Main Image & Navigation */}
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Prev Button */}
        <button 
          onClick={goToPrevious} 
          className="absolute left-4 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Image */}
        <div className="w-full h-full flex items-center justify-center p-16">
            <img 
                src={images[currentIndex]} 
                alt={`Preview ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
            />
        </div>

        {/* Next Button */}
        <button 
          onClick={goToNext} 
          className="absolute right-4 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-all"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;