import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { addProjectApi } from '../Services/allAPI';
import { AddProjectResponseContext } from '../Context/ContextShare';




function Addproject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("")
    // import state create insisde context api
    // usecontext() hook is used to access context api
    const {addProjectResponse , setaddProjectResponse}= useContext(AddProjectResponseContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Addproject = async() => {
        console.log("projectDetails");
        console.log(projectDetails);
        const { title, language, githublink, websitelink, overView, projectImage } = projectDetails
        if (!title || !language || !githublink || !websitelink || !overView || !projectImage) {
            toast.warning("Please fill the form completely")
        }
        else {
            //send data to backend
            // here we have to send a file , so instad of sending as object , we are passing data as formdata
            const reqBody = new FormData();
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("githublink",githublink)
            reqBody.append("websitelink",websitelink)
            reqBody.append("overView",overView)
            reqBody.append("projectImage",projectImage)

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                 "Authorization":`Bearer ${token}` 
            }
            const result = await addProjectApi(reqBody, reqHeader)
            if (result.status === 201){
                setaddProjectResponse (result.data)
                toast.success(result.data)
                handleClose()
                handleClear()
            }
            else if (result.status === 406){
                toast.warning(`${title} already exist , please add a new project`)
            }
            else {
                toast.error("Something happened")
            }
        }

    }

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        githublink: "",
        websitelink: "",
        overView: "",
        projectImage: ""
    })

    const [preview, setperview] = useState("")
    useEffect(() => {
        if (projectDetails.projectImage) {
            setperview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    })

    const handleClear = () => {
        setProjectDetails({
            title: "",
            language: "",
            githublink: "",
            websitelink: "",
            overView: "",
            projectImage: ""
        })
        setperview("")
    }


    return (
        <>
            <button onClick={handleShow} className='btn btn-success'>ADD PROJECT</button>
            <Modal show={show} onHide={handleClose} size='lg' >
                <Modal.Header closeButton className='bg-info'>
                    <Modal.Title>Add new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-md-6 p-3">
                            <label htmlFor="projectimg">
                                <input type="file" id='projectimg' style={{ display: 'none' }}
                                    
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkZPGJo5IybZq0_FVEX0L0mY4mJHVhJiL81mab4VjQReEXe5qg4gU6dSRmjrFUw0AIag&usqp=CAU"} alt="" />
                                {/* <img style={{ borderRadius: '20px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkZPGJo5IybZq0_FVEX0L0mY4mJHVhJiL81mab4VjQReEXe5qg4gU6dSRmjrFUw0AIag&usqp=CAU" alt="" /> */}
                            </label>

                        </div>

                        <div className="col-md-6">
                            <div className='mt-3'>
                                <input type="text" placeholder='project Title' className='form-control'
                                    value={projectDetails.title}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className='mt-3'>
                                <input type="text" placeholder='Technologise Used' className='form-control'
                                    value={projectDetails.language}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className='mt-3'>
                                <input type="text" placeholder='Github link' className='form-control'
                                    value={projectDetails.githublink}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, githublink: e.target.value })} />
                            </div>
                            <div className='mt-3'>
                                <input type="text" placeholder='Website link' className='form-control'
                                    value={projectDetails.websitelink}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, websitelink: e.target.value })} />
                            </div>
                            <div className='mt-3'>
                                <input type="text" placeholder='Project overview' rows={6} className='form-control'
                                    value={projectDetails.overView}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overView: e.target.value })} />
                            </div>
                            <div className="">

                            </div>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-info'>
                    <Button variant="secondary" onClick={handleClear}>
                        CLEAR
                    </Button>
                    <Button variant="primary" onClick={Addproject}>
                        ADD PROJECT
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default Addproject