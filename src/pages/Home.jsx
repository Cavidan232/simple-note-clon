import React from 'react'
import Navbar from "../components/Home/Navbar"
import Banner from "../components/Home/Banner"
import Footer from "../components/Home/Footer"
import Simple from "../components/Home/Simple"
import Saying from "../components/Home/Saying"
import Download from "../components/Home/Download"
function Home() {
  return (
    <div className='bg-custom-dark'>
      <Navbar/>
      <Banner/>
      <Simple/>
      <Saying/>
      <Download/>
      <Footer/>
    </div>
  )
}

export default Home
