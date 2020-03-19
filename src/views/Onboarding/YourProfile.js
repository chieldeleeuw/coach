import React, { history } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { CreateYourProfile, CreateTeamDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const YourProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={2}
          md={3}
          xl={2}
          xs={12}
        >
        {/* <CreateTeamDetails /> */}
          
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <CreateYourProfile />
        </Grid>
      </Grid>
    </div>
  );
};

export default YourProfile;
