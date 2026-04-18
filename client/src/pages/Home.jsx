import React from 'react'
import Banner from '../components/home/Banner'
import Navbar from '../components/home/Navbar'
import Hero from '../components/sections/Hero'
import How_it_works from '../components/sections/How_it_works'
import Our_testimonials from '../components/sections/Our_testimonials'
import Faq_section from '../components/sections/Faq_section'
import Pricing_section from '../components/sections/Pricing_section'
import Lenis_scroll from '../components/home/Lenis_scroll'
import Footer from '../components/home/Footer'


const Home = () => {
  return (
    <div id='top'>
      <Lenis_scroll/>
      <Banner />
      <Navbar />
      <main className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Hero />
        <How_it_works />
        <Our_testimonials />
        <Pricing_section/>
        <Faq_section/>
      </main>
      
      <Footer/>

    </div>
  )
}

export default Home
