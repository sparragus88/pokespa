import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/pages/Home";
import Pokemon from "./components/pages/Pokemon";
import MyPokemon from "./components/pages/MyPokemon";
import PokemonList from "./components/pages/PokemonList";

import AuthApi from "./AuthApi";
import Cookies from "js-cookie";

function App() {
  const [auth, setAuth] = useState(false);
  const [fullName, setFullName] = useState("");

  const getUser = () => {
    const user = Cookies.get("PokeSPA-user");
    if (user) {
      setAuth(true);
      setFullName(user);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <NavBar auth={auth} />
          {auth && (
            <div>
              <div className="user-info-width">
                <div className="info-label">Name</div>
                <div className="info-divider">:</div>
                <div className="info-content">{fullName}</div>
              </div>
            </div>
          )}
          <Switch>
            <ProtectedHome auth={auth} path="/" exact component={Home} />
            <ProtectedRoute
              auth={auth}
              path="/pokemon-list"
              component={PokemonList}
            />
            <ProtectedRoute
              auth={auth}
              path="/pokemon/:name"
              component={Pokemon}
            />
            <ProtectedRoute
              auth={auth}
              path="/my-pokemon"
              component={MyPokemon}
            />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </>
  );
}

const ProtectedHome = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/pokemon-list" />)}
    />
  );
};

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default App;
