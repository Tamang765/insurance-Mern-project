import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Socialmedia = ({color}) => {
  return (
    <div>
      <div className="social-media grid gap-[10px] ">
        <Link href="https:/facebook.com">
          <FaFacebook color={color} className="text-2xl" />
        </Link>
        <Link href="https:/twitter.com">
          <FaTwitter color={color} className="text-2xl" />
        </Link>
        <Link href="https:/linkedin.com">
          <FaLinkedin color={color} className="text-2xl" />
        </Link>
        <Link href="https:/instagram.com">
          <FaInstagram color={color} className="text-2xl mb-3" />
        </Link>
      </div>
    </div>
  );
};

export default Socialmedia;
