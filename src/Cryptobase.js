import BackgroundVideo from "./assets/Cryptohub.mp4";
import "./styles.css";

export default function Home() {
  return (
    <div styl>
      <h1 className="front-text">Welcome to Crpytohub</h1>

      <video className="Video-player" loop autoPlay muted={true}>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
}
