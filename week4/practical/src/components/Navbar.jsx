import React from 'react'

const Navbar = () => {
    return (
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
                <a href='#'>Rehabilitation Programs</a>
                <a href='#'>Assistive Devices</a>
            </ul>
            <button>Book Appointment</button>
        </nav>
    )
}

export default Navbar