
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Checkout.css';

function Checkout({

  cart,

  setCart

}) {
 
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const placeOrder = async () => {

  try {

    const token = localStorage.getItem("token");

    const products = cart.map(item => ({

      productId: item.id,

      quantity: 1

    }));

    await axios.post(

      "http://localhost:5000/orders",

      {

        products,

        totalAmount: totalPrice

      },

      {

        headers: {
        Authorization: `Bearer ${token}`
      }

      }

    );

     setCart([]);

     localStorage.removeItem("cart");


    navigate('/order-confirmed');

  } catch (error) {

    console.log(error);

    alert("Failed to place order");

  }

};

  const totalPrice = cart.reduce(

    (total, item) => total + item.price,

    0

  );

  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (savedUser) {

    const user = JSON.parse(savedUser);

    setFullName(user.name || '');

    setPhone(user.phone || '');

    setAddress(user.address || "");


  }

}, []);

  return (

    <section className="checkout-section">

      <div className="checkout-container">

        <h1>
          Thoughtfully Chosen, Ready to Ship
        </h1>

        <p className="checkout-subtitle">
          Review your order before we begin preparing your handcrafted toys.
        </p>

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>{item.name}</span>

              <span>₹{item.price}</span>

            </div>

          ))}

          <h3>
            Total Amount: ₹{totalPrice}
          </h3>

        </div>

        <form className="checkout-form">

          <div className="shipping-card">

            <h2>Shipping Information</h2>

           <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
             setFullName(e.target.value)
             }
          />

            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
               setPhone(e.target.value)
                }
              />

           <textarea
                placeholder="Delivery Address"
                rows="4"
                value={address}
                onChange={(e) =>
                setAddress(e.target.value)
                }
             />

          </div>

          <div className="payment-card">

            <h2>Payment Method</h2>

            <div className="payment-method">

              <label>

                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                Cash on Delivery

              </label>


            </div>

        </div>

          <button
            type="button"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </form>

      </div>

    </section>

  );

}

export default Checkout;