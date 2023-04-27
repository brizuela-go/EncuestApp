import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";

type DeleteModalProps = {
  surveyId: string;
  deleteSurveyToast: (id: string, name: string) => Promise<void>;
  name: string;
};

const sadEmojis = [
  "😢",
  "😭",
  "😞",
  "😟",
  "😔",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😯",
  "😲",
  "😮",
  "😧",
  "😦",
  "😨",
  "😰",
  "😱",
  "😓",
  "😩",
  "😫",
  "😤",
];

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteSurveyToast,
  surveyId,
  name,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        id={`delete-modal-${surveyId}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`delete-modal-${surveyId}`}
        className="modal modal-bottom  sm:modal-middle"
      >
        <div className="modal-box overflow-hidden sm:p-8">
          <label
            htmlFor={`delete-modal-${surveyId}`}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            ¿Estás seguro de que quieres eliminar la encuesta {`"${name}"?   `}
            <div
              className={`tooltip
            ${isHovered ? "tooltip-open" : ""}
            `}
              data-tip="¡NOOO!"
            >
              <span>
                {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}
              </span>
            </div>
          </h3>
          <div className="modal-action">
            <label
              id="delete-modal-btn"
              htmlFor={`delete-modal-${surveyId}`}
              className="
              btn-error btn-sm
              btn transform gap-x-2
              py-2 px-4 transition duration-150
              ease-in-out
              hover:-translate-y-1
              hover:scale-105 hover:shadow-xl 
              "
              onClick={() => {
                deleteSurveyToast(surveyId, name);
              }}
              onMouseOver={() => {
                setTimeout(() => {
                  setIsHovered(true);
                }, 100);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHovered(false);
                }, 100);
              }}
            >
              <RiDeleteBin7Line /> borrar
            </label>
          </div>
        </div>
      </label>
    </>
  );
};

export default DeleteModal;
