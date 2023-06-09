import { BsPerson } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { CardPart } from "../Common/design";
import { useRouter } from "next/router";

const TopLayer = () => {
  const router = useRouter();

  return (
    <div>
      <div className="top-layer ">
        <div className="account fixed right-16 p-3">

          <span className="icon flex gap-2 items-center">
            <FiSettings size={25} color="black" />
            <BsPerson size={30} color="black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopLayer;
