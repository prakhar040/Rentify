import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Login from './components/Login';
import SellerDashboard from './components/SellerDashboard';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import './App.css';

function App() {
  return (
    <div className="App">
 
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    
    </div>
  );
}

export default App;
