import { ConfirmAlert } from '@/components/alerts/ConfirmAlert';
import { useState } from 'react';

const useConfirmAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [cancelText, setCancelText] = useState();
  const [confirmText, setConfirmText] = useState();
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});
  const [onCancelCallback, setOnCancelCallback] = useState(() => () => {});

  const showConfirmAlert = (msg, onConfirm, onCancel, confirmText, cancelText, onClose) => {
    setMessage(msg);
    setCancelText(cancelText);
    setConfirmText(confirmText);
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
        onClose={hideConfirmAlert}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    ),
    showConfirmAlert,
    hideConfirmAlert,
  };
};

export default useConfirmAlert;
