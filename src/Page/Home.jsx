import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import firstImage from '../assets/image1.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { getHomeProjectAPI } from '../Services/allAPI'
import { isAuthTokenContext } from '../Context/ContextShare';

function Home() {
  const [islogin, setlogin] = useState(false);
  const [HomeProject, setHomeProject] = useState([])
  const { isAuthToken, SetIsAuthToken } = useContext(isAuthTokenContext)

  const getHomeProject = async () => {
    const result = await getHomeProjectAPI()
    console.log("Home project");
    console.log(result);
    setHomeProject(result.data)
  }

  useEffect(() => {
    getHomeProject()
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setlogin(true)
    }
  }, [])

  return (
    <>
      <div className="container-fluid bg-info p-5" style={{ width: "100%", height: "100vh" }}>
        <Row>
          <Col md={6} lg={6} className='d-flex justify-content-center align-items-center flex-column'>
            <div className="">
              <h3 className='text-light'>Student Project Portal</h3>
              <h6>One stop destination for all s/w  project</h6>
              {
                !islogin ?
                  <Link style={{ textDecoration: 'none' }} to={"/login"}>
                    <button className='btn btn-outline-light mt-3'>GET STARTED</button>
                  </Link> :
                  <Link style={{ textDecoration: 'none' }} to={"/dashboard"}>
                    <button className='btn btn-outline-light mt-3'>MANAGE PROJECT</button>
                  </Link>
              }
            </div>
          </Col>
          <Col md={6} lg={6} className='d-flex justify-content-center align-items-center'>
            <img src={firstImage} alt="" width={'75%'} />
          </Col>
        </Row>
      </div>

      <div className="container-fluid">
        <h3 className='text-center my-5'>EXPLORE YOUR PROJECT</h3>
        <div className="row mb-5">
          <marquee scrollAmount='10'>
            <div className='row'>
              {
                HomeProject.length > 0 &&
                HomeProject.map(item => (
                  <div className="col-md-4 col-lg-4 d-flex justify-content-center p-4" key={item._id}>
                    <ProjectCard projectData={item} />
                  </div>
                ))
              }
            </div>
          </marquee>

          <Link style={{ textDecoration: 'none' }} to={'/project'}>
            <h5 className='text-center text-warning my-5 fw-blod'>SEE MORE PROJECT</h5>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
