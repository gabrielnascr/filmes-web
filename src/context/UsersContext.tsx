import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import UserService from '../services/user';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  lastLoginDate?: string;
}

interface IUsersContext {
  users: User[];

  getAllUsers: () => Promise<User[]>;
  addUser: (data: User) => void;
  removeUser: (userId: number) => void;
}

interface IUsersProvider {
  children: React.ReactNode;
}

const UsersContext = createContext<IUsersContext>({} as IUsersContext);

function UsersProvider({ children }: IUsersProvider) {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    const result = await UserService.getAllUsers();
    setUsers(result);

    return result;
  };

  const addUser = async (data: User) => {
    try {
      const createdUser = await UserService.store(data);

      setUsers(currentState => [...currentState, createdUser]);

      toast('User created', {
        type: 'success',
      });
    } catch (error) {}
  };

  const removeUser = async (userId: number) => {
    try {
      await UserService.delete(userId);

      setUsers(currentState => currentState.filter(user => user.id !== userId));

      toast('User deleted', {
        type: 'success',
      });
    } catch (error) {}
  };

  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, getAllUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

const useUsers = () => {
  return useContext(UsersContext);
};

export { UsersProvider, useUsers };
