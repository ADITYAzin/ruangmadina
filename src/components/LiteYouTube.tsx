import { useState } from "react";
import { trackMetaEvent } from "../utils/metaPixel";

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  playLabel: string;
}

export default function LiteYouTube({ videoId, title, playLabel }: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  const handlePlay = () => {
    setIsLoaded(true);
    trackMetaEvent("ViewContent", {
      content_name: "testimonial_video",
      video_id: videoId,
    });
  };

  if (isLoaded) {
    return (
      <div className="yt-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="yt-facade"
      onClick={handlePlay}
      aria-label={`${playLabel}: ${title}`}
    >
      <img
        src={thumbSrc}
        alt={title}
        loading="lazy"
        onError={() => {
          if (!thumbSrc.includes("hqdefault.jpg")) {
            setThumbSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
          }
        }}
      />
      <span className="yt-shade" aria-hidden="true" />
      <span className="yt-play" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
        </svg>
      </span>
    </button>
  );
}

