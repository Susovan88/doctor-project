import React from 'react'
import {assets} from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <>
    <div className="md:mx-10">
  <div className="flex flex-col gap-14 my-10 mt-40 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr]">
    {/* Left Side */}
    <div>
      <img className="mb-5 w-40" src={assets.logo} alt="" />
      <p className="w-full text-gray-600 leading-6">
      OxyTrack is your trusted platform for respiratory health monitoring and care. Stay ahead with real-time insights, expert guidance, and seamless online consultations for better well-being.
      </p>
    </div>

    {/* Mid Side */}
    <div>
      <p className="text-xl font-medium mb-5">COMPANY</p>
      <ul className="flex flex-col gap-2 text-gray-600">
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
      </ul>
    </div>

    {/* Right Side */}
    <div>
      <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
      <ul className="flex flex-col gap-2 text-gray-600">
        <li>+91 8910760697</li>
        <li>oxytrack.111@gmail.com</li>
      </ul>
    </div>
  </div>

  {/* Footer */}
  <div>
    <hr />
    <p className=' py-5 text-sm text-center'>Copyright 2025 @ OxyTrack - All Right Reserved.</p>
  </div>
  </div>
    </>
  )
}

export default Footer