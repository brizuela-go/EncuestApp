import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { questionTypes } from "../utils/questionTypes";

export type QuestionType = (typeof questionTypes)[0];

export type QuestionTypeValue = QuestionType["value"];

type QuestionTypeDropdownProps = {
  selectedQuestionType: QuestionType;
  setSelectedQuestionType: React.Dispatch<React.SetStateAction<QuestionType>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionTypeDropdown: React.FC<QuestionTypeDropdownProps> = ({
  selectedQuestionType,
  setSelectedQuestionType,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="dropdown dropdown-top md:dropdown-top md:dropdown-right md:dropdown-end">
      <label
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        className="btn-sm btn gap-2 px-6 capitalize text-slate-300 hover:text-white "
      >
        {selectedQuestionType["icon"]} {selectedQuestionType["label"]}{" "}
        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
      </label>
      <ul
        tabIndex={0}
        className="group dropdown-content menu rounded-box w-56 bg-slate-100 p-2  shadow dark:bg-slate-900"
      >
        {questionTypes.map((qType, index) => (
          <li
            key={qType.value + index}
            className={`
          ${
            selectedQuestionType.value === qType.value &&
            " rounded-lg bg-slate-300 dark:bg-slate-800"
          }`}
          >
            <button
              type="button"
              className={`tooltip flex flex-wrap text-sm md:tooltip-right 
              ${qType.disabled && "disabled cursor-not-allowed opacity-50"}
              ${!isOpen && "group-focus-within:hidden"}
              
              `}
              disabled={qType.disabled}
              onClick={() => {
                setSelectedQuestionType(qType);
                setIsOpen(false);
              }}
              data-tip={`🛈  ${qType.info} ${
                qType.disabled && " (No disponible por el momento)"
              }`}
            >
              {qType.icon} {qType.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTypeDropdown;
