import React, { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  firstName: string;
  surname: string;
  middleName: string;
  dob: string;
  address: string;
  registrationDate: string;
  developerFlag: boolean;
}

interface Order {
  id: number;
  customer_id: number;
  item: string;
  quantity: number;
  order_date: string;
}

const CustomerForm: React.FC = () => {
  const [formData, setFormData] = useState<Customer>({
    firstName: "",
    surname: "",
    middleName: "",
    dob: "",
    address: "",
    registrationDate: "",
    developerFlag: false,
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/submit-customer", formData);
      console.log(res.data);
      alert("Customer submitted!");
    } catch (err) {
      console.error(err);
      alert("Error submitting customer");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ backgroundColor: "orange", padding: "20px", borderRadius: "10px", margin: "20px auto", width: "600px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <h2 style={{ textAlign: "center" }}>Register Customer</h2>


        
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" required />
        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <span>Date of birth</span>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <span>Registration date</span>
        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required />
        
        <label>
          <input type="checkbox" name="developerFlag" checked={formData.developerFlag} onChange={handleChange} />
          Developer?
        </label>

        <button type="submit" style={{ padding: "10px", background: "white", color: "black", border: "none" }}>
          Submit Customer
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center" }}>Submitted Orders</h3>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>No orders submitted yet.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {orders.map((order) => (
              <li
                key={order.id}
                style={{
                  background: "white",
                  color: "black",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                <strong>Order #{order.id}</strong> — Customer ID: {order.customer_id}, Item: {order.item}, Quantity: {order.quantity}, Date: {order.order_date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
