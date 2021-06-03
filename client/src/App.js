import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import PlaylistGenerator from "./pages/PlaylistGenerator";

function App() {
  // Hooks:
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);
    });
  }, []);

  // Auth:
  if (auth === null) {
    return <Loading />;
  }
  if (auth) {
    return <PlaylistGenerator auth={auth} />;
  }

  return (
    <div className="App">
      <Home />
      {/* <Loading /> */}
    </div>
  );
}

export default App;
