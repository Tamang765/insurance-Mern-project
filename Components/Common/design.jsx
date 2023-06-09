import Link from "next/link";

export const Grid = ({ children, col, gap }) => {
  return <div className={` grid grid-cols-${col} gap-${gap}`}>{children}</div>;
};

export const CardPart = ({ children }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-shadow2">{children}</div>
  );
};
export const Heading = ({ children }) => {
  return <h2 className="text-md font-semibold capitalize my-4">{children}</h2>;
};
export const TitleSection = ({ children }) => {
  return (
    <h1 className="text-md font-semibold capitalize mt-4 text-center">
      {children}
    </h1>
  );
};
export const ButtonDesign = ({children}) => {
  return (
    <div>
     <button type="submit"
        className="w-fit p-2 mt-3 flex justify-center items-center rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-yellow-500 ..."
      >
        {children}
      </button>
    </div>
  );
};
