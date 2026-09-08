import Navbar from "../components/navbar/Navbar";

const services = [
  [
    "01",
    "Water Tank Cleaning",
    "Professional water tank cleaning to remove dirt, sludge, algae, and buildup for cleaner water.",
    "✦",
  ],

  [
    "02",
    "Roof Cleaning",
    "Thorough roof cleaning to remove dirt, debris, moss, and buildup while keeping your roof clean.",
    "⌁",
  ],

  [
    "03",
    "Empty House / Flat Cleaning",
    "Complete cleaning for empty houses and flats, making the property fresh, clean, and ready to use.",
    "▦",
  ],

  [
    "04",
    "Roof Water / Moss / Stain Cleaning",
    "Remove roof water stains, moss, algae, and stubborn buildup to restore a cleaner roof surface.",
    "→",
  ],

  [
    "05",
    "Post-Construction Cleaning",
    "Detailed cleaning after construction or renovation to remove dust, cement marks, debris, and leftover materials.",
    "◌",
  ],

  [
    "06",
    "Pre-Rent Cleaning",
    "Get your property professionally cleaned and ready before renting it to new tenants.",
    "∿",
  ],

  [
    "07",
    "Property Inspection",
    "Regular property inspection and cleaning support to help keep your property maintained and in good condition.",
    "✧",
  ],
];

const testimonials = [
  [
    "“The kind of clean you notice the moment you walk through the door.”",
    "Maya R.",
    "Weekly home clean",
  ],
  [
    "“The team is punctual, kind, and incredibly thorough. Our office feels new.”",
    "Daniel K.",
    "Office clean",
  ],
  [
    "“Booking took two minutes and the result was better than I hoped for.”",
    "Priya S.",
    "Deep clean",
  ],
];

const faqs = [
  [
    "Do I need to be home during the clean?",
    "Not at all. You can leave us a key, use a smart lock, or share an access code securely after booking.",
  ],
  [
    "What is included in a standard clean?",
    "We take care of kitchens, bathrooms, living areas, bedrooms, floors, surfaces, and the small details that make a room feel finished.",
  ],
  [
    "Can I book a recurring clean?",
    "Yes. Choose weekly, fortnightly, or monthly visits and enjoy a preferred rate with the same trusted standard of care.",
  ],
  [
    "Do you bring your own supplies?",
    "We bring everything needed, including professional-grade, low-scent products. Have a favorite product? Just let us know.",
  ],
];

export default function Home() {
  return (
    <main id="top">
      <Navbar />

      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> A cleaner kind of care
          </p>
          <h1>
            Make room for <em>what matters.</em>
          </h1>
          <p className="hero-description">
            Thoughtful home and workspace cleaning, made simple. We bring the
            detail, the calm, and the fresh-start feeling to every room.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#booking">
              Book your clean <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="avatar-stack">
              <i />
              <i />
              <i />
            </span>
            <span>
              <strong>4.9 / 5</strong> from 240+ happy homes
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo" />
          <div className="floating-card floating-card-top">
            <span className="sparkle">✦</span>
            <span>
              <strong>Good to feel</strong>
              <small>Every clean, every time</small>
            </span>
          </div>
          <div className="floating-card floating-card-bottom">
            <strong>100%</strong>
            <span>
              happiness
              <br />
              guarantee
            </span>
          </div>
        </div>
      </section>

      <div className="trust-bar section-shell">
        <span>Serving</span>
        <strong>[YOUR SERVICE AREA]</strong>
        <span className="trust-arrow">→</span>
      </div>

      <section className="section section-shell" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Our services</p>
            <h2>
              Small details.
              <br />
              <em>Big difference.</em>
            </h2>
          </div>
          <p className="section-intro">
            From quick refreshes to full resets, our cleaners are here to make
            your space feel exactly how you want it to.
          </p>
        </div>
        <div className="services-grid">
          {services.map(([number, title, description, icon]) => (
            <article className="service-card" key={number}>
              <span className="service-number">{number}</span>
              <span className="service-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#booking" aria-label={`Book ${title}`}>
                Book this service <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section section-shell" id="why-us">
        <div className="split-photo why-photo">
          <span className="image-caption">
            The CleanCare standard <b>01</b>
          </span>
        </div>
        <div className="split-copy">
          <p className="eyebrow">02 / Why choose us</p>
          <h2>
            Care in every <em>corner.</em>
          </h2>
          <p>
            Cleaning is personal. That is why we pair considered methods with
            people who genuinely care about the spaces they enter.
          </p>
          <ul className="benefit-list">
            <li>
              <span>01</span>
              <div>
                <strong>People you can trust</strong>
                <p>Background-checked, trained, and chosen for their care.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Thoughtful products</strong>
                <p>
                  Effective, low-scent products that are kinder to your home.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>A promise kept</strong>
                <p>
                  Not quite right? Tell us within 24 hours and we will make it
                  right.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="process-section section" id="how-it-works">
        <div className="section-shell">
          <div className="section-heading heading-light">
            <div>
              <p className="eyebrow">03 / How it works</p>
              <h2>
                Clean living,
                <br />
                <em>made easy.</em>
              </h2>
            </div>
            <p className="section-intro">
              No long forms, no awkward calls, no wondering what happens next.
              Just a clean home and a little more time for you.
            </p>
          </div>
          <div className="process-grid">
            <div>
              <span>01</span>
              <h3>Tell us about your space</h3>
              <p>
                Choose a service, share your address, and tell us what your home
                needs.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Pick a time that works</h3>
              <p>
                Select a convenient date and time. We will take it from there.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>We make it shine</h3>
              <p>
                A trusted cleaner arrives and leaves your space feeling fresh.
              </p>
            </div>
            <div>
              <span>04</span>
              <h3>Enjoy the difference</h3>
              <p>
                Come home to calm. We will check in to make sure everything is
                just right.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-shell results-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / The difference</p>
            <h2>
              A little <em>before.</em>
              <br />A lot after.
            </h2>
          </div>
          <p className="section-intro">
            The best part of a clean is how it makes you feel. Here is what a
            little Anik Ghosh attention can do.
          </p>
        </div>
        <div className="results-grid">
          <div className="result-image result-before">
            <span>Before</span>
          </div>
          <div className="result-image result-after">
            <span>After</span>
          </div>
          <div className="result-note">
            <span className="big-quote">“</span>
            <p>Sometimes, a reset is exactly what a room needs.</p>
            <span className="handwritten">— CleanCare</span>
          </div>
        </div>
      </section>

      <section className="reviews-section section" id="reviews">
        <div className="section-shell">
          <div className="section-heading heading-light">
            <div>
              <p className="eyebrow">05 / Kind words</p>
              <h2>
                People love
                <br />
                <em>coming home.</em>
              </h2>
            </div>
            <div className="review-score">
              <strong>4.9</strong>
              <span>★★★★★</span>
              <small>Based on 240+ reviews</small>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(([quote, name, service]) => (
              <blockquote key={name}>
                <span className="quote-mark">“</span>
                <p>{quote}</p>
                <footer>
                  <span className="review-avatar">{name[0]}</span>
                  <span>
                    <strong>{name}</strong>
                    <small>{service}</small>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-section section-shell" id="booking">
        <div className="offer-content">
          <p className="eyebrow">A little welcome gift</p>
          <h2>
            Take <em>20% off</em>
            <br />
            your first clean.
          </h2>
          <p>
            Start with a space that feels lighter. Use code{" "}
            <strong>FRESHSTART</strong> when you book your first visit.
          </p>
          <a className="button button-light" href="#contact">
            Claim your welcome clean <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="offer-stamp">
          <span>20%</span>
          <small>
            off your
            <br />
            first clean
          </small>
        </div>
      </section>

      <section className="section section-shell faq-section" id="faq">
        <div className="section-heading">
          <div>
            <p className="eyebrow">06 / Good to know</p>
            <h2>
              Questions,
              <br />
              <em>answered.</em>
            </h2>
          </div>
          <p className="section-intro">
            Still curious? Contact us at <strong>[YOUR BUSINESS EMAIL]</strong>{" "}
            and we will be happy to help.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta section-shell">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>
            Your cleanest
            <br />
            <em>start starts here.</em>
          </h2>
        </div>
        <div className="cta-actions">
          <a className="button button-primary" href="#booking">
            Book your clean <span aria-hidden="true">↗</span>
          </a>
          <span className="call-link">
            <span>✆</span> Prefer to talk?{" "}
            <strong>[YOUR BUSINESS PHONE]</strong>
          </span>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="section-shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark">A</span>
              <span>
                <strong>CleanCare</strong>
                <small>by Anik Ghosh</small>
              </span>
            </a>
            <p>
              More room for life.
              <br />
              Less on your to-do list.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#services">Services</a>
            <a href="#why-us">Why us</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div>
            <h3>Say hello</h3>
            <span>[YOUR BUSINESS EMAIL]</span>
            <span>[YOUR BUSINESS PHONE]</span>
            <span>[YOUR SERVICE AREA]</span>
          </div>
          <div>
            <h3>Follow along</h3>
            <div className="socials">
              <a href="#top" aria-label="Instagram">
                ig
              </a>
              <a href="#top" aria-label="Facebook">
                fb
              </a>
              <a href="#top" aria-label="TikTok">
                tk
              </a>
            </div>
            <span className="footer-location">
              CleanCare cleaning service platform
              <br />
              created by Anik Ghosh.
            </span>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 CleanCare.</span>
          <span>Created by Anik Ghosh.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
