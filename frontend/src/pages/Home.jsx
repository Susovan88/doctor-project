import React from 'react'
import Headers from '../components/Header'
import SpecialityMeanu from '../components/SpecialityMeanu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

function Home() {
  return (
    <div>
      <Headers/>
      <SpecialityMeanu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home