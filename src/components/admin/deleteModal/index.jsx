import React from "react";
import styles from "./deleteModal.module.scss";

export const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.modal} data-testid="delete-modal">
      <div className={styles["modal-content"]} data-testid="modal-content">
        <button className={styles.close} onClick={onCancel} data-testid="close-modal">
          X
        </button>
        <h5>Are you sure you want to delete this?</h5>
        <div className={styles["modal-actions"]}>
          <button
            className={styles["btn-confirm"]}
            onClick={onConfirm}
            data-testid="confirm-delete"
          >
            Confirm
          </button>
          <button className={styles["btn-cancel"]} onClick={onCancel} data-testid="cancel-delete">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
