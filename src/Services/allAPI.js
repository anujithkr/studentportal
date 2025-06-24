import { base_url } from "./Base_url"
import { CommonApi } from "./CommonApi"

// Register the user
export const registerAPI = async (userdata) => {
    return await CommonApi("POST", `${base_url}/user/register`, userdata, "")
}

// Login user 
export const LoginUser = async (data) => {
    return await CommonApi("POST", `${base_url}/user/login`, data)
}


//add project
export const addProjectApi = async (data, reqHeader) => {
    return await CommonApi('POST', `${base_url}/project/add`, data, reqHeader)
}

//get home project 
export const getHomeProjectAPI = async () => {
    return await CommonApi('Get', `${base_url}/project/homeproject`, "", "")
}

//get all project 
export const getallProjectAPI = async (searchKey, reqHeader) => {
    return await CommonApi('Get', `${base_url}/project/allProject?search=${searchKey} `, "", reqHeader)
}

// Get userProject 
export const getUserProjectAPI = async (reqHeader) => {
    return await CommonApi('GET', `${base_url}/project/userProject/`, "", reqHeader);
};


// Update project 
export const updateProjectApi = async (projectId, reqBody, reqHeader) => {
    return await CommonApi('PUT', `${base_url}/project/edit/${projectId}`, reqBody, reqHeader)
}

// delete project 
export const deleteProjectAPI = async (project_id, reqHeader) => {
    return await CommonApi('DELETE', `${base_url}/project/delete/${project_id}`, {}, reqHeader)
}
