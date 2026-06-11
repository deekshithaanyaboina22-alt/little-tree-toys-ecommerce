import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-text">

        <h1>
          Timeless Toys Crafted for Little Hands
        </h1>

  <p className="hero-para">

  <span className="mobile-line">
  Discover handcrafted wooden toys
</span>

<span className="mobile-line">
  designed to inspire creativity,
</span>

<span className="mobile-line">
  imagination, and joyful play
</span>

<span className="mobile-line">
  through timeless designs.
</span>

  <span className="desktop-text">
    Discover handcrafted wooden toys designed to inspire creativity,
    imagination, and joyful play through beautifully crafted timeless designs.
  </span>

</p>
        <button className="hero-btn">
          Shop by Play Style
        </button>

      </div>

    </section>
  );
}

export default Hero;