import axios from "axios"
import { API } from "./authService";

const TESTIMONIAL_API = `${API}/testimonial/`;

 const createTestimonial = async (formData) => {
    const response = await axios.post(TESTIMONIAL_API, formData);
    return response.data;
};
 const getAllTestimonialService = async () => { 
    const response = await axios.get(TESTIMONIAL_API);
    return response.data;
}
const deleteTestimonial = async (id) => { 
    const response = await axios.delete(TESTIMONIAL_API + id)
    return response.data
}
const TestimonialService = {
    createTestimonial,
    getAllTestimonialService,
    deleteTestimonial
}
export default TestimonialService;