
import { useState, useEffect } from "react";

interface VideoWithFallbackProps {
  youtubeId: string;
  fallbackImage: string;
  className?: string;
}

// Interface for Navigator with connection property
interface NavigatorWithConnection extends Navigator {
  connection?: {
    downlink: number;
  };
}

const VideoWithFallback = ({ youtubeId, fallbackImage, className = "" }: VideoWithFallbackProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldUseImage, setShouldUseImage] = useState(true);

  useEffect(() => {
    // Check connection speed to determine if we should load video
    const navigator = window.navigator as NavigatorWithConnection;
    if (navigator.connection) {
      if (navigator.connection.downlink >= 1.5) { // If download speed is >= 1.5 Mbps
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
    <div className={`w-full ${className}`}>
      {shouldUseImage ? (
        // Fallback image
        <img 
          src={fallbackImage} 
          alt="Zoo Connect Globe" 
          className="w-full object-cover"
        />
      ) : (
        // YouTube iframe with optimizations
        <>
          <div className={`w-full ${!isLoaded ? 'block' : 'hidden'}`}>
            <img 
              src={fallbackImage} 
              alt="Zoo Connect Globe" 
              className="w-full object-cover"
            />
          </div>
          <iframe 
            className={`w-full aspect-square object-cover ${isLoaded ? 'block' : 'hidden'}`}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0&color=white&iv_load_policy=3`}
            title="Zoo Connect Globe Animation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoaded(true)}
            style={{ backgroundColor: 'transparent' }}
          ></iframe>
        </>
      )}
    </div>
  );
};

export default VideoWithFallback;
