
import { useState, useEffect } from "react";

interface VideoWithFallbackProps {
  youtubeId: string;
  fallbackImage: string;
  className?: string;
}

const VideoWithFallback = ({ youtubeId, fallbackImage, className = "" }: VideoWithFallbackProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldUseImage, setShouldUseImage] = useState(true);

  useEffect(() => {
    // Check connection speed to determine if we should load video
    if (navigator.connection) {
      const connection = navigator.connection as any;
      if (connection.downlink >= 1.5) { // If download speed is >= 1.5 Mbps
        setShouldUseImage(false);
      }
    } else {
      // If we can't detect connection info, default to video after a brief delay
      setTimeout(() => {
        setShouldUseImage(false);
      }, 1000);
    }
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {shouldUseImage ? (
        // Fallback image
        <img 
          src={fallbackImage} 
          alt="Zoo Connect Globe" 
          className="w-full max-w-[600px] mx-auto"
        />
      ) : (
        // YouTube iframe with optimizations
        <>
          <div className={`w-full ${!isLoaded ? 'block' : 'hidden'}`}>
            <img 
              src={fallbackImage} 
              alt="Zoo Connect Globe" 
              className="w-full max-w-[600px] mx-auto"
            />
          </div>
          <iframe 
            className={`w-full max-w-[600px] mx-auto aspect-square ${isLoaded ? 'block' : 'hidden'}`}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0`}
            title="Zoo Connect Globe Animation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </>
      )}
    </div>
  );
};

export default VideoWithFallback;
