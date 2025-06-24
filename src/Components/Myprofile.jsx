import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Myprofile() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className="shadow p-4">
      <div className="d-flex mt-3">
        <h5>MY PROFILE</h5>
        <div className="ms-auto">
          <button style={{ backgroundColor: 'transparent', border: 'none' }} 
          onClick={() => setOpen(!open)}
          ><i class="fa-solid fa-angles-up fa-1x"></i></button>
        </div>
      </div>
      {/* collapse */}
      <Collapse in={open}>
        <div className="">
          <div className="d-flex justify-content-center align-items-center">

           <label htmlFor='profileimg'>
            <input type="file" id='profileimg' style={{display:'none'}} />
            <img
            height={'180px'}
            width={'180px'}
            style={{ borderRadius: '50%' }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPaCz5Iy9aMYF---8YCbw1va9JUMrQl4dGbm9gVeJEM_1o9bDvh4VB4UgaCDgjR--R90&usqp=CAU" alt="" />
            </label>

          </div>
          <div className="mt-3">
            <input type="text" placeholder='GITHUP LINK' className='form-control' />
          </div>
          <div className="mt-3">
            <input type="text" placeholder='LINKEDIN LINK' className='form-control'/>
          </div>
          <div className="">
            <button className='btn btn-info w-100 mt-3'>UPDATE PROFILE</button>
          </div>
        </div>
      </Collapse>
    </div>
    </>
  )
}

export default Myprofile