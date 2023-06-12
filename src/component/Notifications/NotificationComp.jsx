import { useSelector } from 'react-redux';
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import '../../styles/notification.css'
import {getNotificationAllData} from "../../services/notification";
import {setNotificationCount} from "../../reduxToolkit/Notification/notificationSlice";
import {useEffect, useState} from "react";

function NotificationComp() {
  //const {notificationCount} = useSelector(state => state.notification);
  // console.log("notificationCount", notificationCount)
  const navigate = useNavigate();
  const [notificationData, setNotificationData] = useState(0)
    const ideaEmail = localStorage.getItem('email');
    const fetchData = async () => {
        try {
            const res = await getNotificationAllData(localStorage.getItem('email'), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            //setNotificationData(res || []);
            setNotificationData(res.filter((item) => item.email === ideaEmail).length);
        } catch (error) {
            console.error('Error fetching notification data:', error);
           // setNotificationData([]);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

  return (
    <>
      <Badge
        className='NotificationBell'
        onClick={() => navigate("/resumemakerui/notification")}
        badgeContent={notificationData}
        color="error"
      >
      </Badge>
      <NotificationsIcon
          onClick={() => navigate("/resumemakerui/notification")}
          sx={{ fontSize: 35, cursor:"pointer" }} />
    </>
  );
}

export default NotificationComp;
