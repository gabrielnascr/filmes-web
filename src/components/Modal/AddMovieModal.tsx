import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input from '../Input';

import { useModal } from '../../context/ModalContex';
import { useMovie } from '../../context/MovieContext';

export default function AddMovieModal() {
  const { register, handleSubmit } = useForm();

  const { addMovie } = useMovie();
  const { handleCloseModal } = useModal();

  const onSubmit = async (data: any) => {
    await addMovie(data);
    handleCloseModal();
  };

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
            Add a movie{' '}
          </h1>
        </div>
        <form>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              justifyContent: 'center',
            }}
          >
            <Input
              id="title"
              name="title"
              type="text"
              label="movie title"
              placeholder=" "
              register={register}
            />

            <Input
              id="description"
              name="description"
              type="text"
              label="movie description"
              placeholder=" "
              register={register}
            />

            <Input
              id="genre"
              name="genre"
              type="text"
              label="movie genre"
              placeholder=" "
              register={register}
            />
          </div>
        </form>
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
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
