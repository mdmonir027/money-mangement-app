import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const { isAuthenticated } = props.auth;

  const logout = (event) => {
    event.preventDefault();
    props.logout();
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Money Manage
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <>
                <Link to='/' style={{ color: 'white' }}>
                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    color='inherit'
                  >
                    <HomeIcon />
                  </IconButton>
                </Link>

                <Link to='/add-new' style={{ color: 'white' }}>
                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    color='inherit'
                  >
                    <AddIcon />
                  </IconButton>
                </Link>
                <Link to='/' style={{ color: 'white' }} onClick={logout}>
                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    color='inherit'
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Link>
              </>
            ) : (
              <>
                <Link to='/login' style={{ color: 'white' }}>
                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(PrimarySearchAppBar);
