import axios from "axios";
import { API } from "./authService";
const SERVICE_URL = `${API}/service/`   


//create service
const createService = async (formData) => { 
    const response = await axios.post(SERVICE_URL, formData,{ withCredentials: true })
    return response.data
}

// get All blogs
const getAllService = async () => { 
    const response = await axios.get(SERVICE_URL)
    return response.data
}

//get blog by slug

const getServiceBySlug = async (slug) => {
    const response = await axios.get( SERVICE_URL + slug)
    return response.data
}
//get by id

const getServiceById = async (id) => { 
    const response = await axios.get(SERVICE_URL + id)
    return response.data
}

// update Blog

const updateService = async (id, formData) => { 
    const response = await axios.patch(SERVICE_URL + id, formData,{ withCredentials: true })
    return response.data
}

// delete blog

const deleteService = async (id) => { 
    const response = await axios.delete(SERVICE_URL + id, { withCredentials: true })
    return response.data
}

const services= {
    createService,
    getAllService,
    getServiceBySlug,
    getServiceById,
    updateService,
    deleteService
}

export default services