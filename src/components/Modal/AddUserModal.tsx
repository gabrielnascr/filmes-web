import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input from '../Input';

import { useModal } from '../../context/ModalContex';
import { useUsers } from '../../context/UsersContext';

export default function AddUserModal() {
  const { register, handleSubmit } = useForm();

  const { addUser } = useUsers();
  const { handleCloseModal } = useModal();

  const onSubmit = async (data: any) => {
    await addUser(data);
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
            Add a user{' '}
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
              id="name"
              name="name"
              type="text"
              label="user name"
              placeholder=" "
              register={register}
            />

            <Input
              id="email"
              name="email"
              type="text"
              label="user email"
              placeholder=" "
              register={register}
            />

            <Input
              id="password"
              name="password"
              type="text"
              label="user password"
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
