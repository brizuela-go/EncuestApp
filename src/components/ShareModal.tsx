import { BsShareFill } from "react-icons/bs";
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import Link from "next/link";

type ShareModalProps = {
  surveyId: string;
  copy: boolean;
  setCopy: (copy: boolean) => void;
};

const ShareModal: React.FC<ShareModalProps> = ({ surveyId, copy, setCopy }) => {
  return (
    <>
      <input
        type="checkbox"
        id={`share-modal-${surveyId}`}
        className="modal-toggle "
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor={`share-modal-${surveyId}`}
            onClick={() => {
              setCopy(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="flex flex-wrap place-items-center gap-5 text-lg font-bold">
            <BsShareFill /> Compartir Encuesta
          </h3>

          <div className="flex flex-col place-items-center justify-center space-y-8 py-6">
            {/* share to whatsapp */}
            <div className="space-x-5">
              <Link
                href={`https://wa.me/?text=https://encuest-app.vercel.app/encuestas/${surveyId}`}
                target="_blank"
                rel="noreferrer"
                className="small-devices btn-success btn-circle btn-lg btn border-none  text-3xl shadow-xl transition duration-150 ease-in-out hover:-translate-y-1"
              >
                <FaWhatsapp className="text-white" />
              </Link>
              {/* share to facebook */}
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=https://encuest-app.vercel.app/encuestas/${surveyId}`}
                target="_blank"
                rel="noreferrer"
                className="small-devices btn-circle btn-lg btn border-none bg-gradient-to-tr from-[#2086d4] to-[#0867af] text-3xl shadow-xl transition duration-150 ease-in-out hover:-translate-y-1"
              >
                <FaFacebook className="text-white" />
              </Link>
              {/* share to twitter  */}
              <Link
                href={`https://twitter.com/intent/tweet?text=https://encuest-app.vercel.app/encuestas/${surveyId}`}
                target="_blank"
                rel="noreferrer"
                className="small-devices btn-circle btn-lg btn border-none bg-gradient-to-tr from-[#31a6ff] to-[#0881de] text-3xl shadow-xl transition duration-150 ease-in-out hover:-translate-y-1"
              >
                <FaTwitter className="text-white" />
              </Link>
              {/* share to mail */}
              <Link
                href={`mailto:?subject=Encuesta&body=https://encuest-app.vercel.app/encuestas/${surveyId}`}
                target="_blank"
                rel="noreferrer"
                className="small-devices btn-circle btn-lg btn border-none bg-gradient-to-tr from-[#aaa] to-[#ccc] text-3xl shadow-xl transition duration-150 ease-in-out hover:-translate-y-1"
              >
                <FaEnvelope className="text-white" />
              </Link>
            </div>

            <div className="input-group-lg input-group justify-center">
              <input
                type="text"
                placeholder="url"
                className="input input-sm bg-slate-200 dark:bg-black md:w-96"
                value={"https://encuest-app.vercel.app/encuestas/" + surveyId}
                readOnly
              />
              <button
                className=" btn-primary btn-sm btn-square btn border-none bg-gradient-to-r"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://encuest-app.vercel.app/encuestas/${surveyId}`
                  );
                  setCopy(true);
                }}
              >
                {copy ? (
                  <FaCheck className=" text-white" />
                ) : (
                  <FaCopy className=" text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
