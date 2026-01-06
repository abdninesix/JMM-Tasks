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

      <section></section>
      
      <footer></footer>
    </div>
  )
}

export default App