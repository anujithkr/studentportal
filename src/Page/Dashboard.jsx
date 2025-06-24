import React, { useEffect, useState } from 'react'
import Myproject from '../Components/Myproject'
import Myprofile from '../Components/Myprofile'

function Dashboard() {
  const [name , setName]= useState("")
  useEffect(()=>{
    // js data type of object stored in section is string
    // to convert back to js object , we have to use json.parse()
    setName(JSON.parse(sessionStorage.getItem("existingUser")).name)

  },[])
  return (
    <>
    <div className="container-fluid">
      <h4 className='my-4 ms-4'>WELCOME <span className='text-warning'>{name}</span> </h4>
      <div className="row">
        <div className="col-md-8">
          <Myproject/>
        </div>
        <div className="col-md-4">
          <Myprofile/>
        </div>

      </div>
    </div>
    </>
  )
}

export default Dashboard