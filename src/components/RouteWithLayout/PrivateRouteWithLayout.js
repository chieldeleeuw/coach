import React, { useContext, history} from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router';
import {AuthContext} from '../../modules/Auth.js';
import {UserContextProvider} from '../../modules/users'

const PrivateRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const {currentUser} = useContext(AuthContext);
  return (
    <UserContextProvider>
        <Route
        {...rest}
        render={matchProps => 
            !!currentUser ? (          
            <Layout>
            {console.log('found a user')}
            <Component {...matchProps} />
            </Layout>
        ) : (
            <div>
                {console.log('user not found -> redirecting to login')}
                <Redirect to={"/sign-in"} />
            </div>
            
        )
        }
        />
    </UserContextProvider>
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default PrivateRouteWithLayout;
