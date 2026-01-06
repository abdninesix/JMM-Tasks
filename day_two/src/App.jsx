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
          <select>Treatments
            <option value="Hi">Something</option>
          </select>
        </ul>
        <button>Book Appointment</button>
      </nav>
      <section></section>
      <footer></footer>
    </div>
  )
}

export default App