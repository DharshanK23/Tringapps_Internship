import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,AppBar,Toolbar,List,ListItem,ListItemText,Typography,TextField,Button,IconButton,Badge,Box,} from '@material-ui/core';
import { PersonAdd as AddUserIcon, Notifications as NotificationsIcon } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: '10px',
    display: 'flex', 
    flexWrap: 'wrap',
  },
  notificationBadge: {
    marginLeft: 'auto',
  },
  squareBox: {
    width: '230px', 
    height: '150px',
    marginBottom:'50px',
    backgroundColor: "white", 
  },
  userCard: {
    width: 'auto',
    backgroundColor: 'grey',
    borderRadius: '20px',
    padding: '10px',
    marginRight :"10px",
    marginTop:"80px"
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleAddUser = () => {
    const newUser = { name, email };
    setNotifications([...notifications, newUser]);
    setOpen(false);
    toast.success('User added successfully!');
  };

  return (
    <div className={classes.root}>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="notifications"
            onClick={() => setOpen(true)}
            className={classes.notificationBadge}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => setOpen(true)}>
              <AddUserIcon />
              <ListItemText primary="Add User" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {notifications.map((user, index) => (
          <Box key={index} className={classes.squareBox}>
            <Box className={classes.userCard}>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="subtitle2">{user.email}</Typography>
            </Box>
          </Box>
        ))}
      </main>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add
        </Button>
      </Drawer>
    </div>
  );
}

export default Dashboard;
