import "./confirm-delete-modal.css";

//type declare for props
//Props from EditDrinkModal.tsx
interface ConfirmDeleteModalProps {
  drinkName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  drinkName, // drink name to make the message unique
  onConfirm, // a callback function to handle the delete
  onCancel, // a call back function that cancels the delete process
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
