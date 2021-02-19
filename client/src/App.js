import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./components/mainPage";
import ProfilePage from "./components/profilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useSocketContext from "./context/socketContext";

function App() {
  const [socket] = useSocketContext();

  useEffect(() => {
    return () => socket.close();
  });

  return (
    <>
      <Router>
        <Switch>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/:id" component={MainPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
