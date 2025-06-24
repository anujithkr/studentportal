import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_url } from '../Services/Base_url';
import { toast, ToastContainer } from 'react-toastify';
import { updateProjectApi } from '../Services/allAPI';
import { editProjectResponseContext } from '../Context/ContextShare';

function EditProject({ project }) {
    const [show, setShow] = useState(false);
    const [preview, setperview] = useState()
    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
    const handleClose = () =>{
        setShow(false);
        resetForm()
    } 
    const handleShow = () => setShow(true);
    console.log("Edit project details");
    console.log(project);

    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        githublink: project.github,
        websitelink: project.website,
        overView: project.overview,
        projectImage: ""

    })
    useEffect(() => {
        if (projectDetails.projectImage) {
            setperview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    const resetForm = () => {
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            githublink: project.github,
            websitelink: project.website,
            overView: project.overview,
            projectImage: ""

        })
        setperview("")
    }

   

    const handleUpdate = async () => {
        console.log("update project details");
        console.log(projectDetails);
        const { id, title, language, githublink, websitelink, overView, projectImage } = projectDetails
        if (!title || !language || !githublink || !websitelink || !overView) {
            toast.warning("please fill the form completely")
        } else {
            //send data to backend
            // here we hace to send a file so insetad od sending as object we are passing data as formdata
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("githublink", githublink)
            reqBody.append("websitelink", websitelink)
            reqBody.append("overView", overView)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(id, reqBody, reqHeader)
                if (result.status === 200) {
                    setEditProjectResponse(result.data)
                    toast.success(`${title} Updated successfully`)
                    setShow(false)
                } else {
                    toast.error("Something happend")
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(id, reqBody, reqHeader)
                if (result.status === 200) {
                    setEditProjectResponse(result.data);
                    toast.success(`${title} Updated successfully`)
                    setShow(false)
                } else {
                    toast.error("Something happend")
                }
            }


        }
    }



    return (
        <>
            <i onClick={handleShow} style={{cursor:'pointer'}} class="fa-solid fa-pen-to-square ms-3 mt-"></i>
            <Modal show={show} onHide={handleClose} size='lg' >
                <Modal.Header closeButton className='bg-info'>
                    <Modal.Title>Edit project</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-md-6 p-3">
                            <label htmlFor="projectimg">
                                <input type="file" id='projectimg' style={{ display: 'none' }}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img style={{ borderRadius: '20px' }} src={preview ? preview : `${base_url}/image/${project.projectImage}`} alt="" />
                            </label>

                        </div>

                        <div className="col-md-6">
                            <div className='mt-3'>
                                <input type="text"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                                    value={projectDetails.title} placeholder='project Title' className='form-control' />
                            </div>
                            <div className='mt-3'>
                                <input type="text"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                                    value={projectDetails.language} placeholder='Technologise Used' className='form-control' />
                            </div>
                            <div className='mt-3'>
                                <input type="text"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, githublink: e.target.value })}
                                    value={projectDetails.githublink} placeholder='Github link' className='form-control' />
                            </div>
                            <div className='mt-3'>
                                <input type="text"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, websitelink: e.target.value })}
                                    value={projectDetails.websitelink} placeholder='Website link' className='form-control' />
                            </div>
                            <div className='mt-3'>
                                <input type="text"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overView: e.target.value })}
                                    value={projectDetails.overView} placeholder='Project overview' rows={6} className='form-control' />
                            </div>
                            <div className="">

                            </div>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-info'>
                    <Button variant="secondary" onClick={resetForm}>
                       Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        UPDATE PROJECT
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>

    )
}

export default EditProject