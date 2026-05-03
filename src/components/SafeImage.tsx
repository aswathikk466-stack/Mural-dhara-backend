import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ComponentProps<'img'> {
  fallbackText?: string;
}

export const SafeImage = ({ src, alt, className, fallbackText, width, height, ...props }: SafeImageProps) => {
  const [error, setError] = useState(false);

  // Calculate aspect ratio style if width/height are provided
  const aspectRatioStyle = width && height ? { aspectRatio: `${width} / ${height}` } : {};

  if (error || !src) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-brand-cream/50 text-brand-dark/20 gap-3 p-8 ${className}`}
        style={aspectRatioStyle}
      >
        <ImageOff size={48} strokeWidth={1} className="opacity-50" />
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Artwork Unavailable</p>
          <p className="text-[8px] mt-1 opacity-60 italic">Refreshing our gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={aspectRatioStyle}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
