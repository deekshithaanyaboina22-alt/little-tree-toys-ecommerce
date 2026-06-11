import '../styles/Categories.css';

function Categories() {

  const categories = [
    {
      name: "Educational Toys",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"
    },

    {
      name: "Pretend Play",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop"
    },

    {
      name: "Girls Collection",
      image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1200&auto=format&fit=crop"
    },

    {
      name: "Boys Collection",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop"
    },

    {
      name: "Animal Toys",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop"
    },

    {
      name: "Puzzle & Stacking",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="categories" id="categories">

      <h2>Explore Our Collections</h2>

      <div className="category-grid">

        {categories.map((item, index) => (
          <div className="category-card" key={index}>

            <img src={item.image} alt={item.name} />

            <div className="overlay">
              <h3>{item.name}</h3>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;