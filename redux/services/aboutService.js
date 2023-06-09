import axios from "axios";
import { API } from "./authService";
const ABOUT_URL = `${API}/about/`   


//create About
const createAbout = async (formData) => { 
    const response = await axios.post(ABOUT_URL, formData,{ withCredentials: true })
    return response.data
}

// get All Abouts
const getAllAbouts = async () => { 
    const response = await axios.get(ABOUT_URL)
    return response.data
}

//get About by slug

const getAboutBySlug = async (slug) => {
    const response = await axios.get( ABOUT_URL + slug)
    return response.data
}

//get by id

const getAboutById = async (id) => { 
    const response = await axios.get(ABOUT_URL + id)
    console.log(response.data)
}

// update About

const updateAbout = async (id, formData) => { 
    const response = await axios.patch(ABOUT_URL + id, formData,{ withCredentials: true })
    return response.data
}

// delete About

const deleteAbout = async (id) => { 
    const response = await axios.delete(ABOUT_URL + id, { withCredentials: true })
    return response.data
}

const AboutServices= {
    createAbout,
    getAllAbouts,
    getAboutBySlug,
    getAboutById,
    updateAbout,
    deleteAbout
}

export default AboutServices