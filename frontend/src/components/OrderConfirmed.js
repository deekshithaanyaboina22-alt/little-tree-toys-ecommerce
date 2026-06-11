import { Link } from 'react-router-dom';
import '../styles/OrderConfirmed.css';

function OrderConfirmed() {

  return (

    <section className="order-confirmed">

      <div className="order-confirmed-card">

        <h1>
          Order Confirmed 
        </h1>

        <p>
          Thank you for choosing Little Tree Toys.
        </p>

        <p>
          We're excited to be part of your child's playtime journey.
        </p>

        <p className="order-id">
          Order ID: #LTT1024
        </p>

        <Link to="/shop">

          <button>
            Continue Shopping
          </button>

        </Link>

      </div>

    </section>

  );

}

export default OrderConfirmed;