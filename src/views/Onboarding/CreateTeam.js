import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { CreateTeamProfile, CreateTeamDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CreateTeam = () => {
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
          {/* <CreateTeamProfile /> */}
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <CreateTeamDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTeam;
