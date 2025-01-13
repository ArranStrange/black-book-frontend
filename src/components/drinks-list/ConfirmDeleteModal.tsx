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
    <div className="confirm-delete-modal">
      <h2>
        Confirm Deletion of <br />
        <span
          style={{
            fontStyle: "italic",
            fontSize: "2rem",
            color: "rgb(1500, 40, 80)",
          }}
        >
          {drinkName}
        </span>
      </h2>
      <p>Are you sure you want to delete {drinkName}?</p>

      <button className="confirm-btn" onClick={onConfirm}>
        Confirm
      </button>
      <button className="cancel-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ConfirmDeleteModal;
