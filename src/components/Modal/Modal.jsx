import { useEffect } from 'react';
import { ModalBackdrop, ModalWindow } from './Modal.styled';

const Modal = ({ largeImg, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <ModalBackdrop onClick={closeModal} data-id="backdrop">
      <ModalWindow>
        <img src={largeImg} alt="#" />
      </ModalWindow>
    </ModalBackdrop>
  );
};

export default Modal;

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.props.closeModal);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.props.closeModal);
//   }

//   render() {
//     return createPortal(
//       <ModalBackdrop onClick={this.props.closeModal} data-id="backdrop">
//         <ModalWindow>
//           <img src={this.props.largeImg} alt="this.props.children.tags" />
//         </ModalWindow>
//       </ModalBackdrop>,
//       modalR
//     );
//   }
// }
