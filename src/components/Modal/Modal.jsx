import { useEffect } from 'react';
import { ModalBackdrop, ModalWindow } from './Modal.styled';

const Modal = ({ largeImg, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return (
    <ModalBackdrop onClick={closeModal} data-id="backdrop">
      <ModalWindow>
        <img src={largeImg} alt="#" />
      </ModalWindow>
    </ModalBackdrop>
  );
};

export default Modal;
