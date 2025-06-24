import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { Link } from 'react-router-dom'
import EditProject from './EditProject'
import { toast, ToastContainer } from 'react-toastify';
import { deleteProjectAPI, getUserProjectAPI } from '../Services/allAPI';
import { AddProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare';




function Myproject() {
    const [userProject, setUserProject] = useState([])
    const { addProjectResponse, setaddProjectResponse } = useContext(AddProjectResponseContext)
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    const getUserProject = async () => {
        const token = sessionStorage.getItem("token")
        const requestHeader = {
            "content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserProjectAPI(requestHeader)
        console.log("user Project");
        console.log(result.data);
        setUserProject(result.data)
    }


    useEffect(() => {
        getUserProject()
    }, [addProjectResponse, editProjectResponse])

    const handleDelete = async (projectId) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content_Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteProjectAPI(projectId, reqHeader)
        if (result.status === 200) {
            console.log("Delete status");
            console.log(result);
            
            toast.success(`${result.data.title} delete successfully`)
            getUserProject()

        } else {
            toast.warning("something happened")
        }


    }
    return (
        <>
            <div className="shadow p-5 mb-5">
                <div className="d-flex justify-content-between mt-3">
                    <h5 className='text-info-emphasis me-auto'>MY PROJECTS</h5>
                    <Addproject />
                </div>
                {
                    userProject?.length > 0 ?
                        userProject.map(item => (
                            <div className="p-3 mt-3 rounded d-flex shadow" style={{ backgroundColor: 'lightgrey' }}>
                                <h6>{item.title}</h6>

                                <div className="d-flex  ms-auto alighn-items-center">
                                    <Link to={item.github} target='_blank' >
                                        <i class="fa-brands fa-github" ></i>
                                    </Link>

                                    <Link to={item.website} target='_blank'>
                                        <i class="fa-solid fa-link ms-3"></i>
                                    </Link>

                                    <i class="fa-solid fa-trash ms-3" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item._id)}></i>
                                    <EditProject project={item} />
                                </div>
                            </div>

                        )) :
                        <p>No project Uploaded Yet</p>
                }

            </div>
            <ToastContainer />
        </>
    )
}

export default Myproject