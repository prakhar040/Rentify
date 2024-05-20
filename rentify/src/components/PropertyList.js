import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            {property.place}, {property.area}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;