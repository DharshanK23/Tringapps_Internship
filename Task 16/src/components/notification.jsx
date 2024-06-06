import React from 'react';
import { Card, IconButton, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const styles = {
  box: {
    position: 'fixed',
    top: '68px',
    right: '30px',
  },
  Content: {
    backgroundColor: '#3f50b5',
    borderRadius: '15px',
    overflowY: 'auto',
    maxHeight: '400px',
    width: '300px',
    padding: '15px',
  },
  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: '15px',
    marginBottom: '15px',
  },
  card: {
    backgroundColor: 'white',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
  },
};

const Notification = ({ notifications, open, onCancel }) => {
  return (
    <div style={styles.box}>
      {open && (
        <div style={styles.Content}>
          <Typography style={{ marginBottom: '20px', color: 'white', fontWeight: 'bold' }}>
            Notification
          </Typography>
          {notifications.length === 0 ? (
            <Typography style={styles.card}>No notifications available</Typography>
          ) : (
            notifications.map((notification, index) => (
              <Card key={index} style={styles.card}>
                <div style={styles.notificationItem}>
                  <div>
                    <Typography>{notification.name} added successfully</Typography>
                  </div>
                  <IconButton color="inherit" size="small" onClick={() => onCancel(index)}>
                    <CloseIcon style={{ fontSize: 'small' }} />
                  </IconButton>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
