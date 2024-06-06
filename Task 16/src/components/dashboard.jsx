import React, { useState, useEffect } from 'react';
import { Drawer, AppBar, Toolbar, List, ListItem, Typography, IconButton, Badge, Box } from '@material-ui/core';
import { PersonAdd as AddUserIcon, Notifications as NotificationsIcon } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './notification';

const styles = {
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 1500,
  },
  drawer: {
    width: 70,
  },
  content: {
    padding: '30px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  notificationBadge: {
    marginLeft: 'auto',
  },
  squareBox: {
    width: '120px',
    maxHeight: '30px',
    marginBottom: '30px',
  },
  userCard: {
    width: 'auto',
    backgroundColor: 'transparent',
    borderRadius: '20px',
    padding: '10px',
    marginRight: '30px',
    marginTop: '80px',
    boxShadow: '0px 50px 50px rgba(0, 0, 0, 0), 0 10px 5px rgba(0, 0, 0, 0.08)',
  },
};

function Dashboard() {
  const [userCount, setUserCount] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
    const count = localStorage.getItem('userCount');
    if (count) {
      setUserCount(parseInt(count, 10));
    }
  }, []);

  const handleAddUser = () => {
    const newUser = { name: `User ${userCount}` };
    const updatedNotifications = [...notifications, newUser];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    const newUserCount = userCount + 1;
    setUserCount(newUserCount);
    localStorage.setItem('userCount', newUserCount);
    toast.success(`User ${userCount} created...`);
  };

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  const handleCloseNotification = () => {     
    setOpenNotification(false);
  };

  const handleCancelNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return (
    <div style={styles.root}>
      <ToastContainer position="bottom-right" border="5px solid black" hideProgressBar={true} autoClose={3000} />
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="notifications"
            onClick={handleOpenNotification}
            style={styles.notificationBadge}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer style={styles.drawer} variant="permanent">
        <Toolbar />
        <div>
          <List>
            <ListItem button onClick={handleAddUser}>
              <AddUserIcon />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main style={styles.content} onClick={handleCloseNotification}>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} onClick={handleCloseNotification}></div>
        {notifications.map((user, index) => (
          <Box key={index} style={styles.squareBox}>
            <Box style={styles.userCard}>
              <Typography>{user.name}</Typography>
            </Box>
          </Box>
        ))}
      </main>
      <Notification
        notifications={notifications}
        open={openNotification}
        onCancel={handleCancelNotification}
      />
    </div>
  );
}
export default Dashboard;
