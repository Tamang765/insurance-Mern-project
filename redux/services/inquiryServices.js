import axios from "axios"
import { API } from "./authService";
const INQUIRY_URL = `${API}/inquiry/`   


const createInquiry = async (data) => {
  const response = await axios.post(INQUIRY_URL, data)
  return response.data
}
const getAllInquiry = async () => {
  const response = await axios.get(INQUIRY_URL)
  return response.data
}

const deleteInquiry = async (id) => { 
  const response = await axios.delete(INQUIRY_URL + id, { withCredentials: true })
  return response.data
}
const inquiryServices = {
  createInquiry,
  getAllInquiry,
  deleteInquiry
}

export default inquiryServices
