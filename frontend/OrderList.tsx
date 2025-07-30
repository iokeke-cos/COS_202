import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/orders/')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  
  return (
    <div style={{ backgroundColor: 'orange', padding: '20px' }}>
      <h2>Order List</h2>
      {orders.map((order, idx) => (
        <div key={idx}>
          <p><strong>Customer ID:</strong> {order.customer_id}</p>
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Date:</strong> {order.order_date}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
