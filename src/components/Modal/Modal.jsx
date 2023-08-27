import  { useEffect } from 'react';
import cl from './Modal.module.css';
import 'basiclightbox/dist/basicLightbox.min.css';

const Modal = (props)=> {
  const {onClose, imageUrl}= props
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
    
  }, [onClose]);

    return (
      <div className={cl.modal}>
        <div className={cl.modal_backdrop} onClick={handleBackdropClick}>
          <img src={imageUrl} alt="Large"  />
        </div>
      </div>
    );
}
export default Modal;


