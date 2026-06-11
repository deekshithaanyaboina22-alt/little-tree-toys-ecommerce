import '../styles/Testimonials.css';

import { FaStar } from 'react-icons/fa';

function Testimonials() {

  const reviews = [

    {
      name: "Ananya Rao",
      review:
        "The quality of the wooden toys is absolutely beautiful. My son spends hours playing with the tangram puzzle and stacking games every day."
    },

    {
      name: "Meera Sharma",
      review:
        "I was searching for meaningful screen-free toys and these were perfect. The craftsmanship feels premium and thoughtfully made."
    },

    {
  name: "Priya Nair",
  review:
    "The wooden kitchen set instantly became my daughter’s favorite. Delivery took a little longer than expected, but the quality and finish were absolutely worth the wait."
    }

  ];

  return (

    <section className="testimonial-section" id="reviews">

      <h2>Little Moments, Big Smiles</h2>

      <div className="testimonial-grid">

        {reviews.map((item, index) => (

          <div className="testimonial-card" key={index}>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="review-text">
              “{item.review}”
            </p>

            <h4>{item.name}</h4>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;