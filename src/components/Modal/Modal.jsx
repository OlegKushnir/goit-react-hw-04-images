import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ largeImageURL, closeImage, closeOnEscape }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') closeOnEscape();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
