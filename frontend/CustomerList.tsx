import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/customers/')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/customers/${id}`)
      .then(() => setCustomers(customers.filter(c => c.id !== id)))
      .catch(err => alert("Failed to delete"));
  };

    const handleUpdate = (id: number) => {
    // You can open a modal or navigate to an update form with the customer's data
    alert(`Update logic for customer ${id} goes here`);
  };

  return (
    <div style={{ backgroundColor: 'orange', padding: '20px' }}>
      <h2>Customer List</h2>
      {customers.map((c, idx) => (
        <div key={idx}>
          <p><strong>Name:</strong> {c.firstName} {c.surname}</p>
          <p><strong>DOB:</strong> {c.dob}</p>
          <p><strong>Address:</strong> {c.address}</p>
          <button onClick={() => handleUpdate(c.id)}>Update</button>
          <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px' }}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
