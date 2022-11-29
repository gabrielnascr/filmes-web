import React, { createContext, useContext, useState } from 'react';

interface IHandleOpenModal {
  container: JSX.Element;
  dataId?: number;
}

interface IModalContext {
  handleOpenModal: ({ container }: IHandleOpenModal) => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  modalContainer?: JSX.Element;
  dataId?: number;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

interface IModalProvider {
  children: React.ReactNode;
}

function ModalProvider({ children }: IModalProvider) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContainer, setModalContainer] = useState<JSX.Element>();
  const [dataId, setDataId] = useState<number>();

  function handleOpenModal({ container, dataId }: IHandleOpenModal) {
    setIsModalOpen(true);
    setModalContainer(container);
    setDataId(dataId);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setModalContainer(undefined);
    setDataId(undefined);
  }

  return (
    <ModalContext.Provider
      value={{
        dataId,
        handleOpenModal,
        handleCloseModal,
        isModalOpen,
        modalContainer,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

const useModal = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModal };
