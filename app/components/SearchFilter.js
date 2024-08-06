"use client"; // Ensure this is a client component

import React, { useState } from 'react';

export default function SearchFilter({ items }) {
  const [query, setQuery] = useState(''); //state variable 'query'to track search input

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search items..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
