import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import FootballField from './../../../../images/field.png';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  imageLogo: {
    fill: "#FFFFFF",
    maxHeight: "53px"
  },
  logoTitle: {
    paddingLeft: "10px",
    color: "white"
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            // src="/images/logos/logo--white.svg"
            src={FootballField}
            className={classes.imageLogo}
          />
        </RouterLink>
        <Typography 
            variant="h1"
            className={classes.logoTitle}
            >
                Coach
         </Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
