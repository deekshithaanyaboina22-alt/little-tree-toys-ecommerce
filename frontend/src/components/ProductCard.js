import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({

  product,

  wishlist,

  toggleWishlist,

  cart,

  addToCart


}) {

  return (

    <div className="product-card">

      <Link
          to={`/product/${product.id}`}
          className="product-link"
      >

      <div className="product-image">

    <img
      src={product.image}
      alt={product.name}
    />

  </div>

</Link>


      <div className="product-info">

        <h3>

          <Link
            to={`/product/${product.id}`}
            className="product-link"
          >

    {product.name}

  </Link>

</h3>

        <p className="product-age">
          Ages {product.age}
        </p>


        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price}
          </span>


          <div className="product-actions">

            <button

              className={
                wishlist.includes(product.id)

                  ? 'wishlist-btn active-heart'

                  : 'wishlist-btn'
              }

              onClick={() =>
                  toggleWishlist(product.id)
              }

            >

              {wishlist.includes(product.id)

                ? '♥'

                : '♡'}

            </button>

             <button

               className="cart-btn"

               onClick={() =>
                   addToCart(product)
              }

           >

              {

               cart.some(
               (item) => item.id === product.id
                )

                    ? 'Added'

                    : 'Add to Cart'

                 }

             </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;