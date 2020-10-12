import React from "react";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="body">
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/404">
            <PageNotFound />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
