import React, {useEffect, useContext} from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, PrivateRouteWithLayout } from './components';
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
  NotFound as NotFoundView,
  CreateTeam as CreateTeamView,
  YourProfile as YourProfileView
} from './views';
//import firebase, {UserContext} from './modules/firebase'
//import {useFirebaseUser, FirebaseUserContextProvider } from './modules/AuthStateListener/isLoggedIn';
import { AuthContext } from './modules/Auth.js'



const Routes = (props) => {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser)

    return (
    
      <Switch>
          <Redirect
            exact
            from="/"
            to="/dashboard"
          />
          <PrivateRouteWithLayout
            component={DashboardView}
            exact
            layout={MainLayout}
            path="/dashboard"
          />
          <PrivateRouteWithLayout
            component={UserListView}
            exact
            layout={MainLayout}
            path="/users"
          />
          <PrivateRouteWithLayout
            component={ProductListView}
            exact
            layout={MainLayout}
            path="/products"
          />
          <PrivateRouteWithLayout
            component={TypographyView}
            exact
            layout={MainLayout}
            path="/typography"
          />
          <PrivateRouteWithLayout
            component={IconsView}
            exact
            layout={MainLayout}
            path="/icons"
          />
          <PrivateRouteWithLayout
            component={AccountView}
            exact
            layout={MainLayout}
            path="/account"
          />
          <PrivateRouteWithLayout
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
          <PrivateRouteWithLayout
            component={CreateTeamView}
            exact
            layout={MinimalLayout}
            path="/create-team"
          />
          <PrivateRouteWithLayout
            component={YourProfileView}
            exact
            layout={MinimalLayout}
            path="/your-profile"
          />
          <Redirect to="/not-found" />
        </Switch>
    
      );
    };

export default Routes;
