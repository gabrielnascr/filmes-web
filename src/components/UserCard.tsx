import React from "react";
import styles from "../styles/components/UserCard.module.scss";

import { format } from "date-fns";
import { useModal } from "../context/ModalContex";
import RemoveUserModal from "./Modal/RemoveUserModal";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

interface IUserCard {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  lastLoginDate?: string;
}

export default function UserCard({
  id,
  name,
  email,
  createdAt,
  lastLoginDate,
}: IUserCard) {
  const { handleOpenModal } = useModal();

  const { user } = useAuth();

  return (
    <div className={styles.userCardContainer}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p className={styles.userNameText}>{name}</p>
          <span className={styles.emailText}>{email}</span>
        </div>
        {user.id !== id && (
          <button
            className={styles.deleteButton}
            onClick={() => {
              handleOpenModal({ container: <RemoveUserModal userId={id} /> });
            }}
          >
            <AiFillDelete color="#ce3226" size={32} />
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        {createdAt && (
          <p className={styles.createdAtText}>
            Created date: {format(new Date(createdAt), "dd/MM/yyyy")}
          </p>
        )}
        {lastLoginDate && (
          <p className={styles.lastLoginText}>
            Last login: {format(new Date(lastLoginDate), "dd/MM/yyyy")} -
          </p>
        )}
      </div>
    </div>
  );
}
