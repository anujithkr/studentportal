import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { getallProjectAPI } from '../Services/allAPI'
import { Link } from 'react-router-dom';


function Project() {
  const [allProject, setallProject] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [isToken, setIsToken] = useState(false)

  const getAllproject = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const header = {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getallProjectAPI(searchKey, header);
      console.log(result);
      setallProject(result.data);
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  })

  useEffect(() => {
    getAllproject()
  }, [searchKey])

  return (
    <>

    {
      isToken?
      <div>

        <div className="container-fluid">
          <h3 className='text-center mt-5 text-warning'>EXPLORE PROJECT</h3>
        </div>

        <div className="row my-5">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex">
            <input
              type="text"
              className='form-control'
              placeholder='Search by Technologies'
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass" style={{ marginTop: '12px', marginLeft: '-30px' }}></i>
          </div>
          <div className="col-md-4"></div>
        </div>

        <div className="row my-5 p-5">
          {
            allProject.length > 0 ? (
              allProject.map(item => (
                <div className="col-md-4 p-3" >
                  <ProjectCard projectData={item} />
                </div>
              ))
            ) : (
              <p>No project found</p>
            )
          }
        </div>

      </div>
      :
      <div style={{ textAlign: 'center' , marginTop:'50px'}}>
        <p>Nothing to display</p>
        <img src="https://cdn-icons-png.flaticon.com/512/16894/16894205.png" alt="" height={'360px'} />

        <p className=''>
          <Link to={'/login'} style={{textDecoration:'none' , color:'blue'}} >
          Login
          </Link>  TO VIEW MORE PROJECT
        </p> 
      </div>
    }
    

      
    </>
  )
}

export default Project;
