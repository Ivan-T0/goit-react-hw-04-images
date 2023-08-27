import React, { useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

const App = ()=>{
  const [query, setQuery] = useState('');
 

  const handleSubmit = (query) => {
    setQuery(query);
  };

 
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} value={query} />
        <ImageGallery query={query}  />
      </div>
    );
  
}
export default App;