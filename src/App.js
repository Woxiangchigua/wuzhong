import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
  useHistory,
  useLocation
} from "react-router-dom";
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// import logo from './logo.svg';
import './App.css';
// import Content from './Content'
// import GlobalHeader from './components/GlobalHeader/index';
// import PageLoading from './components/PageLoading/index';
import SingleLayout from './layouts/SingleLayout';
import MultiLayout from './layouts/MultiLayout';

import { QueryRenderer, graphql } from 'react-relay';
import Environment from './environment';
import useLocalStorage from 'react-use-localstorage';

export default function App() {
  const [token] = useLocalStorage('token', '');
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/User/Login/">
          <SingleLayout />
        </Route>

        <PrivateRoute path="/*">
          <MainLayout />
        </PrivateRoute>
      </Switch>
    </Router >
  );
}

function Home() {
  return (
    <Redirect
      to={{
        pathname: "/Home"
      }}
    />
  )
}

function PrivateRoute({ children, ...rest }) {
  const [token] = useLocalStorage('token', '');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/User/Login/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function MainLayout() {
  const [token] = useLocalStorage('token', '');
  const environment = Environment(token)

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AppAccountRelayQuery {
          viewer {
            id
            username
            user {
              ... on Employee {
                id
                name
              }
            }
          }
        }`
      }
      render={({ error, props, retry }) => {
        if (error) {
          return (
            <div>
              <h1>Error!</h1><br />{error.message}       <Link to="/User/Login">重新登陆</Link>
              <Redirect
                to={{
                  pathname: "/User/Login/"
                }}
              />
            </div>)
        } else if (props) {
          if (props.viewer) {
            // return <MultiLayout environment={environment} user={props.viewer.user} />
            return <MultiLayout environment={environment} user={props.viewer} />
          }
        }
        return <div>Loading</div>;
      }}
    />);
}
