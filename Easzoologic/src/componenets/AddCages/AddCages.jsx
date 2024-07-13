
import React, { useState } from 'react';

function AddCages() {
  const [cages, setCages] = useState([]);
  const [animalKind, setAnimalKind] = useState('');
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCage = { animalKind, headline, content };
    setCages([...cages, newCage]);
    setAnimalKind('');
    setHeadline('');
    setContent('');
  };

  return (
    <div>
      <h2>Add a New Cage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Animal Kind:</label>
          <input 
            type="text" 
            value={animalKind} 
            onChange={(e) => setAnimalKind(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Headline:</label>
          <input 
            type="text" 
            value={headline} 
            onChange={(e) => setHeadline(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Cage</button>
      </form>
      <h2>List of Cages</h2>
      <ul>
        {cages.map((cage, index) => (
          <li key={index}>
            <h3>{cage.animalKind}</h3>
            <h4>{cage.headline}</h4>
            <p>{cage.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddCages;
