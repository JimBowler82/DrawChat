import "./App.css";
import MainPage from "./components/mainPage";
import ProfilePage from "./components/profilePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
