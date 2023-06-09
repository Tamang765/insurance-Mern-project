import Image from "next/image";

const Title = ({ title}) => {
  return (
    <div className="title py-3 w-fit">
      <span className="flex gap-3">
        <Image src="/media/about/arrowright.jpg" width={50} height={50}  className="object-scale-down"/>
              <strong className="uppercase">{title}</strong>
        <Image src="/media/about/arrowleft.jpg" width={50} height={50} className="object-scale-down"/>
      </span>
    </div>
  );
};

export default Title;
