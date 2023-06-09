import axios from "axios";
import { API } from "./authService";
const BLOG_URL = `${API}/blog/`   


//create blog
const createBlog = async (formData) => { 
    const response = await axios.post(BLOG_URL, formData,{ withCredentials: true })
    return response.data
}

// get All blogs
const getAllBlogs = async () => { 
    const response = await axios.get(BLOG_URL)
    return response.data
}

//get blog by slug

const getBlogBySlug = async (slug) => {
    const response = await axios.get( BLOG_URL + slug)
    return response.data
}

//get by id

const getBlogById = async (id) => { 
    const response = await axios.get(`${BLOG_URL}/byId/` + id)
    return response.data
}

// update Blog

const updateBlog = async (id, formData) => { 
    const response = await axios.patch(BLOG_URL + id, formData,{ withCredentials: true })
    return response.data
}

// delete blog

const deleteBlog = async (id) => { 
    const response = await axios.delete(BLOG_URL + id, { withCredentials: true })
    return response.data
}

const blogServices= {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog
}

export default blogServices