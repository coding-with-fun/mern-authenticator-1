import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      <div className="body">
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/profile">
            {isAuthenticated ? <Profile /> : <Redirect to="/404" />}
          </Route>
          <Route path="/signin">
            {isAuthenticated ? <Redirect to="/404" /> : <SignIn />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/404" /> : <SignUp />}
          </Route>
          <Route path="/404">
            <PageNotFound />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
