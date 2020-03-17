import React, { useContext, history} from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router';
import {AuthContext} from '../../modules/Auth.js';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  // const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={matchProps => 
        (          
        <Layout>
          {console.log('route with layout')}
          <Component {...matchProps} />
        </Layout>
      ) 
    }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
