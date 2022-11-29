import 'normalize.css';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import { ModalProvider } from '../context/ModalContex';
import ModalContainer from '../components/Modal/ModalContainer';
import MovieProvider from '../context/MovieContext';
import { UsersProvider } from '../context/UsersContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <UsersProvider>
          <MovieProvider>
            <Component {...pageProps} />
            <ToastContainer />
            <ModalContainer />
          </MovieProvider>
        </UsersProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
