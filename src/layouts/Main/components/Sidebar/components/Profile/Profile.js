import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { useUser } from './../../../../../../modules/users';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const {users, requestUsers} = useUser();
  useEffect(() => {
    if(users.length === 0) {
      requestUsers();
    }
  }, [])
  const classes = useStyles();
  
  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={users.length > 0 ? users[0].avatarUrl : user.avatar}
        //to="/settings"
        to="your-profile"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {users.length > 0 ? users[0].firstName : "Jhon Doe"}
      </Typography>
      <Typography variant="body2">{users.length > 0 ? users[0].teamName : "Klasbak united"}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
