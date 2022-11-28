import React from "react";
import { useModal } from "../../context/ModalContex";

import styles from "../../styles/components/Modal.module.scss";

export default function ModalContainer() {
  const { modalContainer, isModalOpen } = useModal();

  return isModalOpen ? (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContainer}
      >
        {modalContainer}
      </div>
    </div>
  ) : (
    <></>
  );
}
