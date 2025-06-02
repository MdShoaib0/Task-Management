import React from 'react'
import InputField from '../InputField/InputField'
import Footer from '../Footer/Footer'

function Home() {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold text-slate-800'>Task Manager</h1>
      <InputField />
      <Footer />
    </div>
  )
}

export default Home