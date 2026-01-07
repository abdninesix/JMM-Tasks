import React from 'react'

const Form = () => {
    return (
        <form action="/submit" method="post" encType="multipart/form-data" autoComplete>

            {/* BASIC INFORMATION */}
            <fieldset>
                <legend>Basic Information</legend>

                <label htmlFor="fullName">Full Name:</label><br />
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                />
                <br /><br />

                <label htmlFor="username">Username:</label><br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    minLength={4}
                    maxLength={20}
                />
                <br /><br />

                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" required />
                <br /><br />

                <label htmlFor="password">Password:</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    minLength={8}
                />
                <br /><br />

                <label htmlFor="phone">Phone:</label><br />
                <input type="tel" id="phone" name="phone" />
            </fieldset>

            <br />

            {/* PERSONAL DETAILS */}
            <fieldset>
                <legend>Personal Details</legend>

                <label htmlFor="age">Age:</label><br />
                <input type="number" id="age" name="age" min={0} max={120} />
                <br /><br />

                <label htmlFor="dob">Date of Birth:</label><br />
                <input type="date" id="dob" name="dob" />
                <br /><br />

                <label htmlFor="time">Preferred Time:</label><br />
                <input type="time" id="time" name="appointmentTime" />
                <br /><br />

                <label htmlFor="availability">Available From:</label><br />
                <input
                    type="datetime-local"
                    id="availability"
                    name="availability"
                />
                <br /><br />

                <label htmlFor="month">Joining Month:</label><br />
                <input type="month" id="month" name="joiningMonth" />
                <br /><br />

                <label htmlFor="week">Week Number:</label><br />
                <input type="week" id="week" name="weekNumber" />
            </fieldset>

            <br />

            {/* PREFERENCES */}
            <fieldset>
                <legend>Preferences</legend>

                <p>Gender:</p>
                <label>
                    <input type="radio" name="gender" value="male" /> Male
                </label>
                <br />
                <label>
                    <input type="radio" name="gender" value="female" /> Female
                </label>
                <br />
                <label>
                    <input type="radio" name="gender" value="other" /> Other
                </label>

                <br /><br />

                <p>Interests:</p>
                <label>
                    <input type="checkbox" name="interests" value="sports" /> Sports
                </label>
                <br />
                <label>
                    <input type="checkbox" name="interests" value="music" /> Music
                </label>
                <br />
                <label>
                    <input type="checkbox" name="interests" value="tech" /> Technology
                </label>

                <br /><br />

                <label htmlFor="country">Country:</label><br />
                <select id="country" name="country">
                    <option value="">Select Country</option>
                    <option value="pk">Pakistan</option>
                    <option value="ca">Canada</option>
                    <option value="us">United States</option>
                </select>

                <br /><br />

                <label htmlFor="languages">Languages Known:</label><br />
                <select id="languages" name="languages" multiple>
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                </select>
            </fieldset>

            <br />

            {/* FILE UPLOADS */}
            <fieldset>
                <legend>Uploads</legend>

                <label htmlFor="profileImage">Profile Picture:</label><br />
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                />
                <br /><br />

                <label htmlFor="resume">Resume (PDF):</label><br />
                <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                />
            </fieldset>

            <br />

            {/* CUSTOMIZATION */}
            <fieldset>
                <legend>Customization</legend>

                <label htmlFor="satisfaction">Satisfaction Level:</label><br />
                <input
                    type="range"
                    id="satisfaction"
                    name="satisfaction"
                    min={0}
                    max={10}
                />
                <br /><br />

                <label htmlFor="color">Favorite Color:</label><br />
                <input type="color" id="color" name="favoriteColor" />
            </fieldset>

            <br />

            {/* ADDITIONAL INFO */}
            <fieldset>
                <legend>Additional Information</legend>

                <label htmlFor="about">About Yourself:</label><br />
                <textarea
                    id="about"
                    name="about"
                    rows={5}
                    cols={40}
                />
            </fieldset>

            <br />

            {/* HIDDEN FIELD */}
            <input type="hidden" name="formVersion" value="v1.0" />

            {/* TERMS */}
            <label>
                <input type="checkbox" name="terms" required /> I agree to the terms and conditions
            </label>

            <br /><br />

            {/* ACTION BUTTONS */}
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>

        </form>
    )
}

export default Form