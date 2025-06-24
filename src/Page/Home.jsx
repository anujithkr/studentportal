import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import firstImage from '../assets/image1.png';
import { Link } from 'react-router-dom';
import ProjectCard from '../Components/ProjectCard';
import { getHomeProjectAPI } from '../Services/allAPI';
import { isAuthTokenContext } from '../Context/ContextShare';

function Home() {
  const [islogin, setlogin] = useState(false);
  const [HomeProject, setHomeProject] = useState([]);
  const { isAuthToken, SetIsAuthToken } = useContext(isAuthTokenContext);

  const getHomeProject = async () => {
    const result = await getHomeProjectAPI();
    setHomeProject(result.data);
  };

  useEffect(() => {
    getHomeProject();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setlogin(true);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid bg-info text-white d-flex align-items-center" style={{ height: '100vh' }}>
        <Row className="w-100 align-items-center">
          {/* Left Column: Text */}
          <Col md={6} className="text-center px-5">
            <h2 className="fw-bold mb-3">Student Project Portal</h2>
            <p className="mb-4">One stop destination for all s/w project</p>
            {!islogin ? (
              <Link to="/login">
                <button className="btn btn-outline-light">GET STARTED</button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button className="btn btn-outline-light">MANAGE PROJECT</button>
              </Link>
            )}
          </Col>

          {/* Right Column: Image */}
          <Col md={6} className="text-center">
            <img src={firstImage} alt="Hero" className="img-fluid" style={{ maxWidth: '75%' }} />
          </Col>
        </Row>
      </div>

      {/* Project Explore Section */}
      <div className="container-fluid">
        <h3 className="text-center my-5">EXPLORE YOUR PROJECT</h3>
        <div className="row mb-5">
          <marquee scrollAmount="10">
            <div className="row">
              {HomeProject.length > 0 &&
                HomeProject.map((item) => (
                  <div className="col-md-4 col-lg-4 d-flex justify-content-center p-4" key={item._id}>
                    <ProjectCard projectData={item} />
                  </div>
                ))}
            </div>
          </marquee>

          <Link to="/project" className="text-decoration-none">
            <h5 className="text-center text-warning my-5 fw-bold">SEE MORE PROJECT</h5>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
