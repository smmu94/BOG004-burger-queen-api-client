import React from "react";
import Button from "@/components/button";
import styles from "./deleteModal.module.scss";

export const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.modal} data-testid="delete-modal">
      <div className={styles["modal-content"]} data-testid="modal-content">
        <div className={styles["modal-button"]}>
          <Button variant="transparent" onClick={onCancel}>
            X
          </Button>
        </div>
        <h5>Are you sure you want to delete this?</h5>
        <div className={styles["modal-actions"]}>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
