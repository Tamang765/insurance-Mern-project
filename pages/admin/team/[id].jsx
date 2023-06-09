import EditTeam from "@/Components/admin/editTeam";
import axios from "axios";
import { useEffect } from "react";

const editTeam = () => {
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);
  return (
    <div>
      <EditTeam />
    </div>
  );
};

export default editTeam;
