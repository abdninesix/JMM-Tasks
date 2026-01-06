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
            <option value="Treatments">Treatments</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Post Motor Vehicle Accident Rehabilitation">Post Motor Vehicle Accident Rehabilitation</option>
            <option value="Spinal Decompression Treatments">Spinal Decompression Treatments</option>
            <option value="Massage Therapy">Massage Therapy</option>
            <option value="Chiropractic">Chiropractic</option>
            <option value="Acupuncture">Acupuncture</option>
            <option value="Psychotherapy">Psychotherapy</option>
            <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
            <option value="Chronic Pain Treatments">Chronic Pain Treatments</option>
            <option value="Concussion Treatment">Concussion Treatment</option>
            <option value="Occupational Therapy">Occupational Therapy</option>
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
            <p>We know how frustrating injuries and chronic pain can be. At 101 Physio, we'll help you feel stronger, move freely, and restore your quality of life.</p>
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
          <a>1520 Steeles Ave West, Unit 105, Vaughan, ON L4K 3B9</a>
          <p>905-597-1667</p>
        </ul>
        <ul>
          <span>Brampton</span>
          <a>2 County Court Blvd, suite 230, Brampton, ON L6W 3W8</a>
          <p>905-457-2111</p>
        </ul>
        <ul>
          <span>Scarborough</span>
          <a>8130 Sheppard Ave East, Unit 106, Scarborough, ON M1B 3W3</a>
          <p>647-352-0211</p>
        </ul>
      </footer>

    </div>
  )
}

export default App