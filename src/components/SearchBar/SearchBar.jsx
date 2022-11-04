
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { useState } from 'react';

export const SearchBar = ({getQuery}) => {
  const [value, setValue] = useState('')

 const handleSubmit = e => {
    e.preventDefault();
   if(value === '') return;
    getQuery(value);
    setValue('');
  };
  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormBtn}>
          <span className={css.searchFormBtnLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  getQuery: PropTypes.func.isRequired,
};
