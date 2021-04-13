//UI уровень
import React from "react";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/Login"
import Navbar from "./components/Navbar/Navbar"
import UsersContainer from "./components/Users/UsersContainer"
import Preloader from './components/common/Preloader/Preloader'
import { connect } from "react-redux"
import { Route, withRouter, Switch, Redirect } from "react-router-dom"
import { initializeApp } from './redux/app-reducer'
import { compose } from "redux"
import { withSuspense } from './hoc/withSuspense'
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Redirect exact from="/" to="/profile" />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

  /* Вариант роутинга - но не передать props
  <Route exact path='/profile' component={Profile} /> */