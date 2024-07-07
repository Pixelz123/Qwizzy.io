import React from 'react'
import CreateForm from '@/components/CreateForm'
import Navbar from '@/components/Navbar'

function page() {
  return (<>
    <Navbar />
    <div className="container">
      <CreateForm />
    </div>
  </>
  )
}

export default page