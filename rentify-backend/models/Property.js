const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  place: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  nearbyHospitals: String,
  nearbyColleges: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Property', propertySchema);