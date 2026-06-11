import { Link } from 'react-router-dom';
import '../styles/Cart.css';

function Cart({

  cart,

  removeFromCart

}) {

  const totalPrice = cart.reduce(

    (total, item) => total + item.price,

    0

  );


  return (

    <section className="cart-section">

      <div className="cart-header">

        <h2>
           Your Cart 🛒
        </h2>

        <p>
          Review your selected toys before checkout.
        </p>

      </div>


      {cart.length === 0 ? (

        <div className="empty-cart">

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add your favorite toys to continue shopping.
          </p>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Ages {item.age}
                  </p>

                </div>

                  <div className="cart-actions">

                    <div className="cart-price">

                       ₹{item.price}

                </div>


               <button

                  className="remove-btn"

                   onClick={() =>
                    removeFromCart(item.id)
                }

             >

             Remove

            </button>

            </div>
                

              </div>

            ))}

          </div>


          <div className="cart-summary">

            <h3>
              Total: ₹{totalPrice}
            </h3>

            <Link to="/checkout">

              <button>
                  Proceed to Checkout
              </button>

            </Link>

          </div>

        </>

      )}

    </section>

  );
}

export default Cart;