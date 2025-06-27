import React from 'react'
import Fazar from '../Prayers/Fazar'
import Duhar from '../Prayers/Duhar'
import Ashar from '../Prayers/Ashar'
import Magrib from '../Prayers/Magrib'
import Esha from '../Prayers/Esha'

function Prayer() {
  return (
    <div className='w-full h-auto py-8'>
      <h1 className='text-center text-4xl sm:text-5xl font-bold mb-12 text-gray-800'>🕌 Prayer Tracker</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8'>
        <Fazar/>
        <Duhar/>
        <Ashar/>
        <Magrib/>
        <Esha/>
      </div>
    </div>
  )
}

export default Prayer