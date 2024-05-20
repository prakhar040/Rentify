import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(response => {
        setProperty(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{property.place}</h2>
      <p>Area: {property.area}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Nearby Hospitals: {property.nearbyHospitals}</p>
      <p>Nearby Colleges: {property.nearbyColleges}</p>
    </div>
  );
}

export default PropertyDetail;