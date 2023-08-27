import  { useState } from 'react';
import cl from './Searchbar.module.css'

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');
 


  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Enter photo description');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  
    return (
      <header className={cl.searchbar}>
        <form className={cl.form} onSubmit={handleSubmit}>
          <button type="submit" className={cl.button}>
            <span className={cl.button_label}>Search</span>
          </button>

          <input
            className={cl.input}
            type="text"
            placeholder="Search images and photos"
            onChange={handleChange}
            value={query}
          />
        </form>
      </header>
    );

}
export default Searchbar