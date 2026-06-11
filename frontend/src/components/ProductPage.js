import { useParams, Link } from 'react-router-dom';

import { products } from '../data/products';

import '../styles/ProductPage.css';

function ProductPage({

  wishlist,

  toggleWishlist,

  cart,

  addToCart

}) {

  const { id } = useParams();

  const product = products.find(

    (item) => item.id === Number(id)

  );


  const currentIndex = products.findIndex(
  (item) => item.id === Number(id)
);

const previousProduct =
  currentIndex > 0
    ? products[currentIndex - 1]
    : null;

const nextProduct =
  currentIndex < products.length - 1
    ? products[currentIndex + 1]
    : null;


  if (!product) {

    return (

      <div className="product-not-found">

        Product not found

      </div>

    );

  }

  return (

  <section className="product-page">

    {previousProduct && (
      <Link
        to={`/product/${previousProduct.id}`}
        className="fixed-arrow left-arrow"
      >
        ‹
      </Link>
    )}

    {nextProduct && (
      <Link
        to={`/product/${nextProduct.id}`}
        className="fixed-arrow right-arrow"
      >
        ›
      </Link>
    )}

    <div className="product-container">

      <div className="product-page-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-page-info">

        <h1>
          {product.name}
        </h1>

        <p className="product-page-price">
          ₹{product.price}
        </p>

        <p className="product-page-age">
          Ages {product.age}
        </p>

        <div className="product-details">

          <h3>Material</h3>

          <p>
            {product.material}
          </p>

          <h3>Dimensions</h3>

          <p>
            {product.dimensions}
          </p>

        </div>

        <div className="product-description">

          <h3>Description</h3>

          <p>
            {product.description.split('Included in the set:')[0]}
          </p>

          <h3>Included in the Set</h3>

          <p>
            {product.description.split('Included in the set:')[1]}
          </p>

        </div>

        <div className="product-page-actions">

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
      (item) =>
        item.id === product.id
    )

      ? 'Added'

      : 'Add to Cart'

  }

</button>

</div>

</div>

</div>

</section>

)};

export default ProductPage;