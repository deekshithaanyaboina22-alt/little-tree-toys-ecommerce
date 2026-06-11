import '../styles/Collections.css';
import { useNavigate } from 'react-router-dom';
import firstDiscoveries from '../assets/first-discoveries.jpeg';
import littleMakers from '../assets/little-makers.jpg';
import tinyThinkers from '../assets/tiny-thinkers.jpg';
import playtimeClassics from '../assets/playtime-classics.jpg';

function Collections() {

  const navigate = useNavigate();

  const collections = [

    {
      title: "First Discoveries",
      image: firstDiscoveries,
      category: "First Discoveries"
    },

    {
      title: "Little Makers",
      image: littleMakers,
      category: "Little Makers"
    },

    {
      title: "Tiny Thinkers",
      image: tinyThinkers,
      category: "Tiny Thinkers"
    },

    {
      title: "Playtime Classics",
      image: playtimeClassics,
      category: "Playtime Classics"
    }

  ];

  return (

    <section className="collections-section">

      

      <div className="collections-grid">

        {collections.map((item, index) => (

           <div
              className={`collection-card card-${index}`}
              key={index}
             onClick={() =>
               navigate(`/shop?category=${encodeURIComponent(item.category)}`)
              }
            >

            <img src={item.image} alt={item.title} />

            <div className="collection-overlay">
              <h3>{item.title}</h3>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Collections;