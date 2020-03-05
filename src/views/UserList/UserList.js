import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { useUser } from './../../modules/users';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const {users, requestUsers} = useUser();
  useEffect(() => {
    if(users.length === 0) {
      requestUsers();
    }
  }, [])
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
