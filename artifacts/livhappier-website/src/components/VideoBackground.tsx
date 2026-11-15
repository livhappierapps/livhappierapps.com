export function VideoBackground() {
  return (
    <div className="video-background" aria-hidden="true">
      <img
        src="/bg-static.jpeg"
        alt=""
        className="video-background__video"
      />
      <div className="video-background__overlay" />
    </div>
  );
}
