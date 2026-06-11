import '../styles/WhyChooseUs.css';

import {
  FaLeaf,
  FaHeart,
  FaGamepad,
  FaHandsHelping
} from 'react-icons/fa';

function WhyChooseUs() {

  const features = [

    {
      title: "Child-Safe Materials",
      description:
        "Crafted from smooth natural wood and finished with non-toxic materials thoughtfully designed for safe everyday play.",
      icon: <FaHandsHelping />
    },

    {
      title: "Eco-Friendly Craftsmanship",
      description:
        "Carefully created using sustainable materials that encourage mindful play while caring for future generations.",
      icon: <FaLeaf />
    },

    {
      title: "Screen-Free Play",
      description:
        "Encouraging creativity, imagination, and meaningful hands-on experiences beyond the distractions of digital screens.",
      icon: <FaGamepad />
    },

    {
      title: "Made with Love",
      description:
        "Every piece is thoughtfully designed to create joyful memories, bonding moments, and timeless childhood experiences.",
      icon: <FaHeart />
    }

  ];

  return (

    <section className="why-section">

      <h2>Why Parents Love Us</h2>

      <div className="why-grid">

        {features.map((item, index) => (

          <div className="why-card" key={index}>

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;