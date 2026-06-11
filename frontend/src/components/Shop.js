import { useLocation } from 'react-router-dom';

import { useState } from 'react';

import { products } from '../data/products';

import ProductCard from './ProductCard';

import '../styles/Shop.css';

function Shop({

  wishlist,

  toggleWishlist,

  cart,

  addToCart

}) {

  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

   const categoryFromUrl =
  queryParams.get('category') || 'All';

   const [selectedCategory, setSelectedCategory] =
  useState(categoryFromUrl);
  const categories = [

    'All',

    'First Discoveries',

    'Little Makers',

    'Tiny Thinkers',

    'Playtime Classics'

  ];

   const filteredProducts = products.filter((product) => {

   const matchesCategory =

    selectedCategory === 'All' ||

    product.category === selectedCategory;


    const matchesSearch =

      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());


  return matchesCategory && matchesSearch;

});


  return (

    <section className="shop-section">


      {/* HEADER */}

      <div className="shop-header">

        <h2>
          Shop Our Collection
        </h2>

        <p>
          Thoughtfully crafted wooden toys for meaningful childhood play.
        </p>

      </div>



      {/* CATEGORY FILTERS */}

      <div className="category-filters">

        {categories.map((category) => (

          <button

            key={category}

            className={
              selectedCategory === category

                ? 'active-filter'

                : ''
            }

            onClick={() =>
              setSelectedCategory(category)
            }

          >

            {category}

          </button>

        ))}
     </div>

     <div className="search-bar">

  <input

    type="text"

    placeholder="Search toys..."

    value={searchTerm}

    onChange={(e) =>
      setSearchTerm(e.target.value)
    }

  />

</div>



      {/* PRODUCTS */}

      <div className="products-grid">

        {filteredProducts.map((product) => (

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

    </section>

  );
}

export default Shop;