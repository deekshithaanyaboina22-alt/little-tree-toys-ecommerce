import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyOrders.css';

function MyOrders() {

  const [orders, setOrders] = useState([]);
  useEffect(() => {

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/orders",

        {

         headers: {

        Authorization: `Bearer ${token}`

        }

        }

      );

      setOrders(response.data.orders);

    } catch (error) {

      console.log(error);

    }

  };

  fetchOrders();

}, []);

  return (

    <section className="orders-section">

      <div className="orders-container">

        <h1>
          My Orders
        </h1>

        <p>
          Track and review your Little Tree Toys purchases.
        </p>

        <div className="orders-list">

  {orders.map((order, index) => (

    <div
      className="order-card"
      key={order._id}
    >

      <h3>
        Order #{index + 1}
      </h3>

      <p>
        Status: {order.status}
      </p>

      <p>
        Total: ₹{order.totalAmount}
      </p>

      <p>
        Items: {order.products.length}
      </p>

    </div>

  ))}

</div>

      </div>

    </section>

  );

}

export default MyOrders;