import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminOrder.css";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] =
  useState("Newest");

  const pendingCount = orders.filter(
  (order) => order.status === "Pending"
).length;

const processingCount = orders.filter(
  (order) => order.status === "Processing"
).length;

const shippedCount = orders.filter(
  (order) => order.status === "Shipped"
).length;

const deliveredCount = orders.filter(
  (order) => order.status === "Delivered"
).length;

const totalOrders = orders.length;

const filteredOrders = orders.filter((order) => {

  const matchesStatus =
    filterStatus === "All" ||
    order.status === filterStatus;

  const matchesSearch =
    order.customerName
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  return (
    matchesStatus &&
    matchesSearch
  );

});

const sortedOrders = [...filteredOrders]
.sort((a, b) => {

  if (sortOrder === "Newest") {

    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );

  }

  return (
    new Date(a.createdAt) -
    new Date(b.createdAt)
  );

});

  const updateStatus = async (id, status) => {

  try {

    await axios.put(

      `https://little-tree-toys-ecommerce.onrender.com/admin/orders/${id}`,

      {
        status
      }

    );

    alert("Order status updated");

  } catch (error) {

    console.log(error);

    alert("Failed to update status");

  }

};

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const response = await axios.get(
          "https://little-tree-toys-ecommerce.onrender.com/admin/orders"
        );

        setOrders(response.data.orders);

      } catch (error) {

        console.log(error);

      }

    };

    fetchOrders();

  }, []);

  console.log("Orders:", orders);
console.log("Pending Count:", pendingCount);
console.log("Processing Count:", processingCount);
console.log("Shipped Count:", shippedCount);
console.log("Delivered Count:", deliveredCount);

  return (

    <section className="orders-section">

      <div className="orders-container">

        <h1>Admin Orders</h1>

<h2 className="dashboard-title">
  Order Overview
</h2>

<div className="status-summary">

    <div className="summary-card">
  <span className="summary-title">
    Total Orders
  </span>

  <div className="summary-count">
    {totalOrders}
  </div>
</div>

  <div className="summary-card">
  <span className="summary-title">
    Pending Orders
  </span>

  <div className="summary-count">
    {pendingCount}
  </div>
</div>



 <div className="summary-card">
  <span className="summary-title">
    Processing Orders
  </span>

  <div className="summary-count">
    {processingCount}
  </div>
</div>


  <div className="summary-card">
  <span className="summary-title">
    Shipped Orders
  </span>

  <div className="summary-count">
    {shippedCount}
  </div>
</div>


  <div className="summary-card">
  <span className="summary-title">
    Delivered Orders
  </span>

  <div className="summary-count">
    {deliveredCount}
  </div>
</div>
</div>


        <p>View all customer orders.</p>
<div>

  <h3 className="filter-title">
    Filter Orders
  </h3>
</div>

<div className="admin-controls">

<input
  type="text"
  className="search-input"
  placeholder="Search Customer..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

<select
  className="filter-dropdown"
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value)
  }
>

  <option value="Newest">
    Newest First
  </option>

  <option value="Oldest">
    Oldest First
  </option>

</select>

 <select
  className="filter-dropdown"
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
>


  <option value="All">
    All Orders
  </option>

  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>

</select>
</div>

<h2 className="dashboard-title">
  Customer Orders
</h2>

        <div className="orders-list">

          {filteredOrders.length === 0 ? (

  <p className="no-orders">
    No orders match the selected filter.
  </p>

) : (
  sortedOrders.map((order) => (
            <div
              key={order._id}
              className="order-card"
            >

              <h3>
                Order ID: {order._id}
              </h3>

              <p>
                Customer: {order.customerName}
              </p>

              <p>
                Phone: {order.customerPhone}
              </p>

              <p>
                Address: {order.customerAddress}
              </p>

           <p className={`status ${order.status.toLowerCase()}`}>
  {order.status}
</p>

<div className="status-controls">


<select
  value={order.status}
  onChange={(e) => {

    const updatedOrders = orders.map((o) =>

      o._id === order._id

        ? {
            ...o,
            status: e.target.value
          }

        : o

    );

    setOrders(updatedOrders);

  }}
>

  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>

</select>

<button
  onClick={() =>
    updateStatus(
      order._id,
      order.status
    )
  }
>
  Update Status
</button>


</div>



<p>
  Order Date:{" "}
  {new Date(order.createdAt).toLocaleDateString()}
</p>
              <p>
                Total: ₹{order.totalAmount}
              </p>

            </div>

                   ))

)}
        </div>

      </div>

    </section>

  );

}

export default AdminOrders;