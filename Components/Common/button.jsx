import Link from "next/link";

const CustomButton = ({ title, link }) => {
  return (
    <div>
      <Link
        href={`/${link}`}
        className="w-fit p-3 flex justify-center items-center rounded-2xl text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-yellow-500 ..."
      >
        {title}
      </Link>
    </div>
  );
};

export default CustomButton;
