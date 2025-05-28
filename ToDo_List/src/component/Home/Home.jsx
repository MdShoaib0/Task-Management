import React from 'react'
import InputField from '../InputField/InputField'
import Footer from '../Footer/Footer'

function Home() {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Task Management</h1>
      <InputField />
      <Footer />
    </div>
  )
}

export default Home