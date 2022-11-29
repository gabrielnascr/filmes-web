import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContex';
import { useMovie } from '../../context/MovieContext';
import { useUsers } from '../../context/UsersContext';
import Button from '../Button';

interface IRemoveUserModal {
  userId: number;
}

export default function RemoveUserModal({ userId }: IRemoveUserModal) {
  const { handleCloseModal } = useModal();
  const { removeUser } = useUsers();
  const { user, logout } = useAuth();

  const isLoggedProfile = userId === user.id;

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
            Delete a user
          </h1>

          <p
            style={{
              fontFamily: 'Poppins',
              fontWeight: 500,
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            Are you sure you want to delete this user?
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
            onClick={async () => {
              if (isLoggedProfile) {
                logout();
              }

              removeUser(userId);
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
