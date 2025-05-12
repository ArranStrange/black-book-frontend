import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteModalProps {
  drinkName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  drinkName,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open
      onClose={onCancel}
      PaperProps={{
        sx: {
          zIndex: 1000,
        },
      }}
    >
      <DialogTitle>
        Confirm Deletion of <br />
        <Typography variant="h3" component="span" color="error">
          {drinkName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{drinkName}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirm
        </Button>
        <Button onClick={onCancel} color="inherit" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
