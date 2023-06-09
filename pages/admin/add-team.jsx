import AddTeam from "@/Components/admin/AddTeam";
import { useRedirect } from "@/Components/redirector/useRedirect";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";

const Addteam = () => {
  useRedirect("/login")
  return (
    <div>
      {" "}
      <AddTeam />
    </div>
  );
};

export default Addteam;
