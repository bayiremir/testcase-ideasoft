import React, {ReactNode, createContext, useContext, useState} from 'react';
import CustomModal, {ButtonProps} from './CustomModal';

interface ShowModalProps {
  type: 'success' | 'warning' | 'error' | 'info';
  description?: string;
  buttons: ButtonProps[];
}

interface ModalContextType {
  showModal: (props: ShowModalProps) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useCustomModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useCustomModal must be used within a CustomModalProvider');
  }
  return context;
};

export const CustomModalProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState<ShowModalProps | null>(null);

  const showModal = (props: ShowModalProps) => {
    setModalProps(props);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      {modalVisible && modalProps && (
        <CustomModal
          visible={modalVisible}
          type={modalProps.type}
          description={modalProps.description}
          buttons={modalProps.buttons}
        />
      )}
    </ModalContext.Provider>
  );
};
