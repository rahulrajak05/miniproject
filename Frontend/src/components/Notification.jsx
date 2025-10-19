import React from 'react';

const Notification = ({ notifications }) => {
  return (
    <div className="notification-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications.</p>
      ) : (
        <ul className="notification-list space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item p-2 bg-gray-100 rounded-md">
              {notification.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;