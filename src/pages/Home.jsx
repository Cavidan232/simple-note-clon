import React from 'react'
import Navbar from "../components/Home/Navbar"
import Banner from "../components/Home/Banner"
import Footer from "../components/Home/Footer"
import Simple from "../components/Home/Simple"
function Home() {
  return (
    <div className='bg-custom-dark'>
      <Navbar/>
      <Banner/>
      <Simple/>
    </div>
  )
}

export default Home
