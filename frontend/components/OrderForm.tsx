import React, { useState, useEffect } from "react";
import axios from "axios";

interface Order {
  id: number;
  customer_id: number;
  item: string;
  quantity: number;
  order_date: string;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customer_id: 0,
    item: "",
    quantity: 0,
    order_date: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "customer_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingOrderId !== null) {
        await axios.put(`http://localhost:8000/orders/${editingOrderId}`, formData);
        alert("Order updated!");
        setEditingOrderId(null);
      } else {
        await axios.post("http://localhost:8000/orders/", formData);
        alert("Order submitted!");
      }
      setFormData({ customer_id: 0, item: "", quantity: 0, order_date: "" });
      fetchOrders();
    } catch (err) {
      console.error("Order submit error:", err);
      alert("Error submitting order");
    }
  };

  const handleEdit = (order: Order) => {
    setFormData({
      customer_id: order.customer_id,
      item: order.item,
      quantity: order.quantity,
      order_date: order.order_date,
    });
    setEditingOrderId(order.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${id}`);
      alert("Order deleted!");
      fetchOrders();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting order");
    }
  };

  return (
    <div style={{ backgroundColor: "orange", padding: "20px", borderRadius: "10px", margin: "20px auto", width: "90%", maxWidth: "600px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 style={{ textAlign: "center" }}>{editingOrderId !== null ? "Edit Order" : "Place an Order"}</h2>

        <input type="number" name="customer_id" value={formData.customer_id} onChange={handleChange} placeholder="Customer ID" required />
        <input type="text" name="item" value={formData.item} onChange={handleChange} placeholder="Item Name" required />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input type="date" name="order_date" value={formData.order_date} onChange={handleChange} required />

        <button type="submit" style={{ padding: "10px", background: "white", color: "black", border: "none" }}>
          {editingOrderId !== null ? "Update Order" : "Submit Order"}
        </button>
      </form>

      <hr />

      <h3 style={{ textAlign: "center" }}>Submitted Orders</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} style={{ backgroundColor: "#fff", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
            <p>
              <strong>Item:</strong> {order.item}<br />
              <strong>Quantity:</strong> {order.quantity}<br />
              <strong>Date:</strong> {order.order_date}
            </p>
            <button onClick={() => handleEdit(order)} style={{ marginRight: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderForm;
