import ProductCard from './ProductCard';

import '../styles/CategorySection.css';

function CategorySection({ title, products }) {

  return (

    <section className="category-section">

      <div className="category-header">

        <h2>{title}</h2>

      </div>

      <div className="category-products">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            age={product.age}
          />

        ))}

      </div>

    </section>

  );
}

export default CategorySection;