import "../App.css";

export default function Home() {
  //
  return (
    <div className="Home">
      {/* <header className="Header"> */}
      <div className="btn-wrapper">
        <button className="btn login-btn">
          <a className="login-link" href={"/auth/login"}>
            Login to Spotify?
          </a>
        </button>
      </div>
      {/* </header> */}
    </div>
  );
}
