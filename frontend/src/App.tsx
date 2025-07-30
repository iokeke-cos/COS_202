import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import OrderForm from '../components/OrderForm';
import CustomerList from '../CustomerList';
import OrderList from '../OrderList';

const App = () => {
  const [tab, setTab] = useState<'customerForm' | 'orderForm' | 'customerList' | 'orderList'>('customerForm');

  return (
    <div style={{ backgroundColor: 'orange', minHeight: '100vh', padding: '20px' }}>
      <h1>Tasty Bites Web App</h1>

      {/* Buttons to switch views */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setTab('customerForm')}>Customer Form</button>
        <button onClick={() => setTab('orderForm')}>Order Form</button>
        <button onClick={() => setTab('customerList')}>View Customers</button>
        <button onClick={() => setTab('orderList')}>View Orders</button>
      </div>

      {/* Render based on tab */}
      {tab === 'customerForm' && <CustomerForm />}
      {tab === 'orderForm' && <OrderForm />}
      {tab === 'customerList' && <CustomerList />}
      {tab === 'orderList' && <OrderList />}
    </div>
  );
};

export default App;
