import React from 'react';

const NotificationToast = ({ notification}) => {
    return <div>
        <h5 style={{marginBottom: 0}}>{notification.title}</h5>
        <p>{notification.body}</p>
    </div>
}

export default NotificationToast;