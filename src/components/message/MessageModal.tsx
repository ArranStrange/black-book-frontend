import React from "react";
import "./message-modal.css";

//typescript defining props
interface MessageModalProps {
  message: string;
  title: string;
  onClose: () => void;
}
//
//
const MessageModal: React.FC<MessageModalProps> = ({
  // props
  message,
  title,
  onClose,
  // as this is a reusable component the props are passed from which ever parent component it is being declared in
}) => {
  // Method for the modal to close itself, will need to edit each component to impliment
  // const [isVisible, setIsVisible] = useState(true);
  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* directly renders the title prop */}
        <h3>{title}</h3>
        {/* directly renders the message prop */}
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
        {/* <button onClick={() => setIsVisible(false)}>Close</button> */}
      </div>
    </div>
  );
};

export default MessageModal;
