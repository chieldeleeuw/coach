import React, {useEffect, useContext} from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {UserContextProvider} from './modules/users'
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';
import firebase from './modules/firebase'
import {useFirebaseUser, FirebaseUserContextProvider } from './modules/AuthStateListener/isLoggedIn';



const Routes = (props) => {

  const {currentUser, firebaseUser, requestFirebaseUser} = useFirebaseUser();
  //const {currentUser} = useContext(FirebaseUserContext);
  // useEffect(() => {
  //   if(props.loggedIn === true) {
  //     requestFirebaseUser();
  //   }
  // }, [])
  console.log(useFirebaseUser())
  if(currentUser) {
    console.log("Logged in",currentUser)
    return (
      
        <UserContextProvider>
          <Switch>
              <Redirect
                exact
                from="/"
                to="/dashboard"
              />
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
              />
              <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path="/users"
              />
              <RouteWithLayout
                component={ProductListView}
                exact
                layout={MainLayout}
                path="/products"
              />
              <RouteWithLayout
                component={TypographyView}
                exact
                layout={MainLayout}
                path="/typography"
              />
              <RouteWithLayout
                component={IconsView}
                exact
                layout={MainLayout}
                path="/icons"
              />
              <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path="/account"
              />
              <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
              />
              <RouteWithLayout
                component={SignUpView}
                exact
                layout={MinimalLayout}
                path="/sign-up"
              />
              <RouteWithLayout
                component={SignInView}
                exact
                layout={MinimalLayout}
                path="/sign-in"
              />
              <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
              />
              <Redirect to="/not-found" />
            </Switch>
          </UserContextProvider>
        
      );
    } 
    else {
      console.log("Logged out")
      return (
        <UserContextProvider>
          <Switch>
            <Redirect
              exact
              from="/"
              to="/sign-in"
            />
            <RouteWithLayout
              component={SignUpView}
              exact
              layout={MinimalLayout}
              path="/sign-up"
            />
            <RouteWithLayout
              component={SignInView}
              exact
              layout={MinimalLayout}
              path="/sign-in"
            />
            <RouteWithLayout
              component={NotFoundView}
              exact
              layout={MinimalLayout}
              path="/not-found"
            />
            <Redirect to="/not-found" />
          </Switch>
    </UserContextProvider>
      )
    }
  
};

export default Routes;
