import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, Card } from 'react-bootstrap';
import { getNotificationsByPersonId } from '../../services/notificationService';
import { toast } from "react-toastify";

const NotificationNav = ({ personId }) => {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotificationsByPersonId(personId);
        setNotifications(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchNotifications();
  }, [personId]);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Notifications
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.length === 0 ? (
            <p>Aucune notification</p>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.notification_Id} className="mb-3">
                <Card.Body>
                  <Card.Title>{notification.notification_Name}</Card.Title>
                  <Card.Text>{notification.notification_Text}</Card.Text>
                  <Card.Footer>
                    <small className="text-muted">
                      {new Date(notification.notification_DatePost).toLocaleString()}
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NotificationNav;
