import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ largeImageURL, closeImage, closeOnEscape }) => {
 
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') closeOnEscape();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.overlay} onClick={e => closeImage(e)}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeImage: PropTypes.func.isRequired,
  closeOnEscape: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
