import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

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
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle role="heading" id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageModal;
