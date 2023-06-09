import { API } from "./authService";
import axios from "axios";

const TEAM_API = `${API}/team/`;

const createTeam = async (formData) => {
    const response = await axios.post(TEAM_API, formData, { withCredentials: true });
    return response.data;
};

const getAllTeams = async () => { 
    const response = await axios.get(TEAM_API);
    return response.data
}
// const getAllTeams = async () => { 
//     const response = await axios.get(TEAM_API, { withCredentials: true });
//     return response.data;
//   };
  
const getTeamBySlug = async (slug) => { 
    const response = await axios.get(TEAM_API+slug)
    return response.data
}
const getTeamById = async (id) => { 
    const response = await axios.get(TEAM_API+id)
    return response.data
}
const deleteTeam = async (id) => { 
    const response = await axios.delete(TEAM_API + id)
    return response.data
}
const updateTeam = async (id, formData) => { 
    const response = await axios.patch(TEAM_API + id, formData, { withCredentials: true })
    return response.data
}

const TeamServices = {
    createTeam,
    getAllTeams,
    getTeamById,
    getTeamBySlug,
    deleteTeam,
    updateTeam
}

export default TeamServices;
