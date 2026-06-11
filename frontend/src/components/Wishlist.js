import { products } from '../data/products';

import ProductCard from './ProductCard';

import '../styles/Wishlist.css';

function Wishlist({

  wishlist,

  toggleWishlist,

  cart,

  addToCart

}) {

  const wishlistProducts = products.filter(

    (product) =>

      wishlist.includes(product.id)

  );


  return (

    <section className="wishlist-section">

      <div className="wishlist-header">

        <h2>
          Your Wishlist ♡
        </h2>

        <p>
          Save your favorite toys for later.
        </p>

      </div>


      {wishlistProducts.length === 0 ? (

        <div className="empty-wishlist">

          <h3>
            Your wishlist is empty
          </h3>

          <p>
            Start adding toys you love ♡
          </p>

        </div>

      ) : (

        <div className="products-grid">

          {wishlistProducts.map((product) => (

            <ProductCard

              key={product.id}

              product={product}

              wishlist={wishlist}

              toggleWishlist={toggleWishlist}

              cart={cart}

              addToCart={addToCart}


            />

          ))}

        </div>

      )}

    </section>

  );
}

export default Wishlist;