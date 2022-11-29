import React from 'react';
import { useModal } from '../../context/ModalContex';
import { useMovie } from '../../context/MovieContext';
import Button from '../Button';

interface IRemoveMovieModal {
  movieId: number;
}

export default function RemoveMovieModal({ movieId }: IRemoveMovieModal) {
  const { handleCloseModal } = useModal();
  const { removeMovie } = useMovie();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <div>
          <h1
            style={{
              fontFamily: 'Poppins',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Delete a movie{' '}
          </h1>

          <p
            style={{
              fontFamily: 'Poppins',
              fontWeight: 500,
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            Are you sure you want to delete this movie?
          </p>
        </div>
        <div
          style={{
            width: 500,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}
        >
          <Button
            style={{ backgroundColor: '#ce3226' }}
            onClick={() => {
              handleCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: '#2e8b57' }}
            type="submit"
            onClick={() => {
              removeMovie(movieId);
              handleCloseModal();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
