import "./confirm-delete-modal.css";

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
    <>
      <div className="confirm-delete-overlay"></div>
      <div className="confirm-delete-modal">
        <h3>
          Confirm Deletion of <br />
          <span>{drinkName}</span>
        </h3>
        <p>Are you sure you want to delete {drinkName}?</p>

        <button className="confirm-btn" onClick={onConfirm}>
          Confirm
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
