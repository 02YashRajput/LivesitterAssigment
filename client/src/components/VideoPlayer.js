import React, { useEffect, useRef } from 'react'; // Importing React and hooks
import './VideoPlayer.css'; // Importing styles for the VideoPlayer component
import Overlay from './Overlay'; // Importing the Overlay component
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// VideoPlayer functional component
const VideoPlayer = ({ streamUrl, overlays, onClose, setOverlays }) => {
    const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Check if videoRef is defined
    if (videoRef.current) {
      // Initialize Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        responsive: true,
        fluid: true,
      });

      // Cleanup function to dispose the player on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src({ type: 'application/x-mpegURL', src: streamUrl });
    }
  }, [streamUrl]);


    return (
        <div className="video-player" style={{ position: 'relative', width: '640px', height: '480px' }}>
            {/* Video element for playing the video stream */}
            <div data-vjs-player>

            <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        controls
        preload="auto"
        width="640"
        height="480"
      />
            </div>

            
            {/* Map through the overlays array and render an Overlay component for each overlay */}
            {overlays.map((overlay, index) => (
                <Overlay
                    key={overlay.id} // Unique key for each overlay, using overlay's id
                    overlay={overlay} // Passing the overlay data to the Overlay component
                    onClose={onClose} // Passing the onClose function to handle overlay removal
                    index={index} // Passing the index of the overlay for reference
                    setOverlays={setOverlays} // Passing the function to update overlays state
                />
            ))}
        </div>
    );
};

export default VideoPlayer; // Exporting the VideoPlayer component for use in other parts of the application
