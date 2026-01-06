import React from 'react'

const App = () => {
  return (
    <div>
      <header>
        <span><b>Email Us: </b>info@physio101.ca</span>
        <ul>
          <a>Home</a>
          <a>About</a>
          <a>Locations</a>
          <a>Contacy</a>
          <a>Download Referral Form</a>
        </ul>
      </header>

      <nav>
        <img src="\101physio-logo.png" alt="logo" />
        <ul>
          <select>
            <option>Treatments</option>
            <option>Physiotherapy</option>
            <option>Massage Therapy</option>
            <option>Chiropractic</option>
            <option>Acupuncture</option>
            <option>Psychotherapy</option>
            <option>Sports Injury Rehabioptiontation</option>
            <option>Chronic Pain Treatment</option>
            <option>Concussion Treatment</option>
            <option>Occupational Therapy</option>
            <option>Spinal Decompression</option>
            <option>Motor Vehicle Accident Rehab</option>
          </select>
          <a>Rehabilitation Programs</a>
          <a>Assistive Devices</a>
        </ul>
        <button>Book Appointment</button>
      </nav>

      <section>
        <div>
          <div>
            <span>Toronto Physiotherapy Clinic</span>
            <h1>Focused on Your Recovery</h1>
            <p>
              We know how frustrating injuries and chronic pain can be.
              At 101 Physio, we'll help you feel stronger, move freely, and restore your quality of life.
            </p>
          </div>
          <div>
            <button>Book Appointment</button>
            <button>Our Services</button>
          </div>
        </div>
        <img src="/hero.png" alt="hero" />
      </section>

      <footer>
        <h2>Three Convenient Locations in the GTA</h2>
        <ul>
          <span>Vaughan</span>
          <a href="tel:905-597-1667">1520 Steeles Ave West, Unit 105, Vaughan, ON L4K 3B9</a>
        </ul>
        <ul>
          <span>Brampton</span>
          <a href="tel:905-457-2111">2 County Court Blvd, suite 230, Brampton, ON L6W 3W8</a>
        </ul>
        <ul>
          <span>Scarborough</span>
          <a href="tel:647-352-0211">8130 Sheppard Ave East, Unit 106, Scarborough, ON M1B 3W3</a>
        </ul>
      </footer>
    </div>
  )
}

export default App