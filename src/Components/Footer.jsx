import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center bg-info mt-5' style={{ height: '300px', width: '100%' }}>
        <div className='d-flex justify-content-center align-items-evanly bg-info'>

          <div style={{ width: "400px" }}>
            <div className='d-flex align-items-center'>
              <Link to={'/'} style={{ color: '#fff', textDecoration: 'none' }}>
                <h3>  <i class="fa-brands fa-stack-overflow me-3 text-warning"></i>Project Fair</h3>
              </Link>
            </div>
            <p style={{ textAlign: 'justify' }} className='text-light'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint vel laudantium, exercitationem excepturi natus illo eos, earum aliquam culpa ea, iure eligendi temporibus explicabo facere repellat. Aut nobis accusantium aliquam.</p>
          </div>

          <div className='ms-4 text-light'>
            <h3>Links</h3>
            <Link to={'/'} style={{ textDecoration: 'none' }} className='text-light'><h5>Home</h5></Link>
            <Link to={'/cart'} style={{ textDecoration: 'none' }} className='text-light'><h5>Cart</h5></Link>
            <Link to={'/wishlist'} style={{ textDecoration: 'none' }} className='text-light'><h5>Wish List</h5></Link>
          </div>

          <div className='text-light ms-4'>
            <h3>Guides</h3>
            <h5>React</h5>
            <h5>React BootStrap</h5>
            <h5>FontAwsome</h5>
          </div>

          <div className='ms-4 text-light'>
            <h3>Contact Us</h3>
            <div className='d-flex'>
              <input type="text" className='form-control bg-light' /> <button className='btn btn-warning ms-3'>Subcribe</button>
            </div>
            <div className='d-flex justify-content-between mt-5'>
              <i className="fa-brands fa-whatsapp fa-2xl"></i>
              <i className="fa-brands fa-instagram fa-2xl"></i>
              <i className="fa-brands fa-facebook fa-2xl"></i>
              <i className="fa-brands fa-x-twitter fa-2xl"></i>
            </div>
          </div>

        </div>
      </div>


        </>

    )
}

export default Footer