import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotificationCount } from '../../reduxToolkit/Notification/notificationSlice';
import {
  getNotificationAllData,
  updateMarkAsReadAll,
  updateNotificationStatus,
} from '../../services/notification';
import '../../styles/notification.css';
import { Box, List, ListItemText, ListItemAvatar, CssBaseline, Paper, Card } from '@mui/material';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

function Notification() {
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const ideaEmail = localStorage.getItem('email');

  const fetchData = async () => {
    try {
      const res = await getNotificationAllData(localStorage.getItem('email'), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setNotificationData(res || []);
      dispatch(setNotificationCount(res.filter((item) => item.email === ideaEmail).length));
    } catch (error) {
      console.error('Error fetching notification data:', error);
      setNotificationData([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  const filteredData = notificationData.filter((item) => item.email === ideaEmail);
  const notificationCount = filteredData.length;

  const handleNotificationView = (item) => {
    updateNotification(item.notificationId, item.formId);
  };

  const handleReadAll = async () => {
    await updateMarkAsReadAll(localStorage.getItem('email'), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    fetchData();
  };

  const updateNotification = async (notificationId, formId) => {
    let status = true;
    const res = await updateNotificationStatus(notificationId, status, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (res?.status === 200) {
      navigate(`/resumemakerui/feedback/${formId}`);
      fetchData();
    }
  };

  const handleNotificationCardHover = (item) => {
    setHoveredItem(item);
  };

  const handleNotificationCardLeave = () => {
    setHoveredItem(null);
  };

  return (
      <>
        <Paper className="NotificationMain">
          <Box>
            <CssBaseline />

            {filteredData.length === 0 ? (
                <div>No notifications available</div>
            ) : (
                <List>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Notifications ({notificationCount})</h2>
                    <button
                       onClick={handleReadAll}
                        style={{
                          backgroundColor: 'rgb(33, 80, 162)',
                          color: '#fff',
                          height: '30px',
                          marginTop: '25px',
                          padding: '8px 16px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgb(37,93,217)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgb(33, 80, 162)';
                        }}
                    >
                      Mark All Read
                    </button>
                  </div>

                  {filteredData.map((item) => (
                      <Card
                          className={`NotificationCard ${
                              hoveredItem === item ? 'hovered' : ''
                          }`}
                          style={{ border: '1px solid grey' }}
                          key={item.notificationId}
                          onClick={() => {
                            handleNotificationView(item);
                          }}
                          onMouseEnter={() => {
                            handleNotificationCardHover(item);
                          }}
                          onMouseLeave={handleNotificationCardLeave}
                      >
                        <ListItemAvatar className="InitialsAvatar">
                          <InitialsAvatar
                              className="InitialsAvatarinner"
                              name={
                                item.interviewerName === null
                                    ? 'Humancloud Technologies'
                                    : item.interviewerName
                              }
                          />
                        </ListItemAvatar>

                        <ListItemText className="NotificationText">
                          <h4>Feedback Submitted..!</h4>
                          {item.message}
                        </ListItemText>
                      </Card>
                  ))}
                </List>
            )}
          </Box>
        </Paper>
      </>
  );
}

export default Notification;
