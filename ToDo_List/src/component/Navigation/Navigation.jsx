import React from 'react'
import CategoryProps from '../Categories/CategoryProps'

function Navigation() {
  return (
    <div className='grid grid-cols-2 gap-8'>
        <CategoryProps name="Namaz" color="bg-orange-800"/>
        <CategoryProps name="Our Story" color="bg-sky-400"/>
    </div>
  )
}

export default Navigation