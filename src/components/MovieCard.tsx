import React from "react";

import styles from "../styles/components/MovieCard.module.scss";
import Button from "./Button";

import { AiFillDelete } from "react-icons/ai";
import { useModal } from "../context/ModalContex";
import RemoveMovieModal from "./Modal/RemoveMovieModal";

interface IMovieCard {
  id: number;
  title: string;
  description: string;
}

export function MovieCard({ id, title, description }: IMovieCard) {
  const { handleOpenModal } = useModal();
  return (
    <div className={styles.movieCardContainer}>
      <button
        className={styles.deleteButton}
        onClick={() => {
          handleOpenModal({ container: <RemoveMovieModal movieId={id} /> });
        }}
      >
        <AiFillDelete color="#ce3226" size={32} />
      </button>
      <div>
        <p className={styles.titleText}>{title}</p>
        <span className={styles.descriptionText}>{description}</span>
      </div>
    </div>
  );
}
