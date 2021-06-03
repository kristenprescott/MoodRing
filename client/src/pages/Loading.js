import "../App.css";

export default function Loading() {
  //
  return (
    <div className="Loading">
      <div className="loading-title">
        Loading
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <div className="loader"></div>
      </div>
    </div>
  );
}
