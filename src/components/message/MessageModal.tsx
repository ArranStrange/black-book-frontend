import React from "react";
import "./message-modal.css";

interface MessageModalProps {
  message: string;
  title: string;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  title,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
