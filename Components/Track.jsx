import Image from "next/image";
import Link from "next/link";
import { VscFolderActive } from "react-icons/vsc";

const Track = () => {
  return (
    <div className="track-claim container-fluid my-5 p-0">
      <div className="container p-0">
        <div className="flex track-card w-10/12 m-auto justify-between bg-blue-500 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="left-section absolute left-[-38px]">
            <Image
              src="/media/choose/topangle.jpg"
              alt=""
              width={100}
              height={400}
            />
          </div>
          <div className="left-section-bottom absolute left-[-165px]">
            <Image
              src="/media/choose/topangle2.jpg"
              alt=""
              width={300}
              height={400}
            />
          </div>
          <div className="first-section w-full h-full flex justify-between z-20 items-center">
            <div className="flex items-center gap-3">
              <VscFolderActive className="text-8xl" />
              <div className="flex flex-col">
                <span>Lorem ipsum dolor sit amet.</span>
                <h3>Start tracking your claims</h3>
              </div>
            </div>
            <div className="btn-section flex justify-between gap-6 mt-10">
              <Link
                href="/contact"
                className="w-fit rounded-md p-3 flex justify-center items-center text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-yellow-500 ..."
              >
                Connect to Secure Money
              </Link>
            </div>
          </div>
          <div className="right-section absolute right-[66px] top-[50px]">
            <Image
              src="/media/choose/topangle.jpg"
              alt=""
              width={200}
              height={400}
            />
          </div>
          <div className="right-section-bottom absolute right-[-128px]">
            <Image
              src="/media/choose/topangle2.jpg"
              alt=""
              width={300}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
