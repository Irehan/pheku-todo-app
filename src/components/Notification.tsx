
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onHide }) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start hiding animation after 2 seconds
      const hideTimer = setTimeout(() => {
        setIsHiding(true);
      }, 2000);

      // Actually remove notification after animation completes
      const removeTimer = setTimeout(() => {
        onHide();
        setIsHiding(false);
      }, 2300); // 2000ms delay + 300ms for animation

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${isHiding ? 'notification-hide' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
