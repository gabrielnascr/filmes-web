import React from 'react';
import styles from '../styles/components/Header.module.scss';

import { MdOutlineLogout } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const route = useRouter();

  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    route.push('login');
  };

  return (
    <header className={styles.headerContainer}>
      <h2 className={styles.username}>Hello, {userName}.</h2>
      <div className={styles.logoutWrapper} onClick={handleLogout}>
        <span className={styles.logoutText}>Log Out</span>
        <MdOutlineLogout size={32} color="#CE3226" />
      </div>
    </header>
  );
}
