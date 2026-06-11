import { useNavigate } from 'react-router-dom';
import '../styles/Featured.css';

import playGym from '../assets/featured-playgym.jpg';
import kitchen from '../assets/featured-kitchen.jpg';
import tangram from '../assets/featured-tangram.jpg';
import ludo from '../assets/featured-ludo.jpg';

function Featured() {

 const navigate = useNavigate();

  const featuredProducts = [

    {
       id: 5,
      title: "Wooden Play Gym",
      image: playGym,
      description: "A soothing activity gym designed for sensory discovery and early movement."
    },

    {
      id: 15,
      title: "Tangram Puzzle",
      image: tangram,
      description: "A creative puzzle that builds logical thinking and problem-solving skills."
    },

    {
       
      id: 8,
      title: "Kitchen Set",
      image: kitchen,
      description: "Encourages imaginative role play through beautifully crafted wooden pieces."
    },

    {
       id: 21, 
    title: "Wooden Ludo",
    image: ludo,
    description: "A playful family favorite crafted for joyful moments and timeless fun."  
    }, 

  ];

  return (

    <section className="featured-section" id="products">

      <h2>Featured Favorites</h2>

      <div className="featured-grid">

        {featuredProducts.map((item, index) => (
            <div className={`featured-card featured-${index}`} key={index}> 

            <img src={item.image} alt={item.title} />

            <div className="featured-content">

              <h3>{item.title}</h3>

              <p>{item.description}</p>
               
               <button
                onClick={() => navigate(`/product/${item.id}`)}
                  >
             Explore More
            </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Featured;