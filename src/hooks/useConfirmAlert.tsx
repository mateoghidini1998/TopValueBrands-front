import { ConfirmAlert } from '@/components/alerts/ConfirmAlert';
import { useState } from 'react';

const useConfirmAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});
  const [onCancelCallback, setOnCancelCallback] = useState(() => () => {});

  const showConfirmAlert = (msg, onConfirm, onCancel) => {
    setMessage(msg);
    setOnConfirmCallback(() => onConfirm);
    setOnCancelCallback(() => onCancel);
    setIsVisible(true);
  };

  const hideConfirmAlert = () => {
    setMessage('');
    setIsVisible(false);
  };

  const handleConfirm = () => {
    onConfirmCallback();
    hideConfirmAlert();
  };

  const handleCancel = () => {
    onCancelCallback();
    hideConfirmAlert();
  };

  return {
    ConfirmAlert: isVisible && (
      <ConfirmAlert
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
    showConfirmAlert,
    hideConfirmAlert,
  };
};

export default useConfirmAlert;
