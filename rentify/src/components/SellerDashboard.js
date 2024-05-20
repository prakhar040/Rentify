import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellerDashboard() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setProperties(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/properties', formData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setProperties([...properties, response.data]);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="place" placeholder="Place" onChange={handleChange} />
        <input type="text" name="area" placeholder="Area" onChange={handleChange} />
        <input type="text" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
        <input type="text" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />
        <input type="text" name="nearbyHospitals" placeholder="Nearby Hospitals" onChange={handleChange} />
        <input type="text" name="nearbyColleges" placeholder="Nearby Colleges" onChange={handleChange} />
        <button type="submit">Post Property</button>
      </form>
      <div>
        <h2>My Properties</h2>
        <ul>
          {properties.map(property => (
            <li key={property._id}>
              {property.place}, {property.area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SellerDashboard;