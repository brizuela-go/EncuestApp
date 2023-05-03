import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";
import Confetti from "react-confetti";
import Link from "next/link";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiErrorWarningFill,
  RiFileCopy2Line,
  RiImageAddFill,
  RiSave2Line,
} from "react-icons/ri";
import QuestionSchema from "../schemas/QuestionSchema";
import SurveySchema from "../schemas/SurveySchema";
import QuestionTypeDropdown, { QuestionType } from "./QuestionTypeDropdown";
import { questionTypes } from "../utils/questionTypes";
import { BsArrowCounterclockwise, BsTrash } from "react-icons/bs";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import Signature from "./Signature";

type Props = {};

const CreadorDeEncuestas: React.FC<Props> = () => {
  const [user] = useAuthState(firebase.auth());
  const [isCreated, setIsCreated] = useState(false);

  const [surveyId, setSurveyId] = useState<string>("");

  const [selectedQuestionType] = useState<QuestionType>(questionTypes[0]);

  // selected question type for every index

  const [isOpen, setIsOpen] = useState(false);

  // Questions
  type Question = z.infer<typeof QuestionSchema>;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionErrors, setQuestionErrors] = useState<
    Array<Record<string, string | Record<number, string>>>
  >([]);

  const stringChoicesTypes = ["dropdown", "radiogroup", "checkbox", "ranking"];

  const [isRequired] = useState(true);
  const [autoGrow] = useState(false);

  // add question to questions array, question should be empty
  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      {
        type: selectedQuestionType.value,
        name: "",
        isRequired,
        autoGrow,
        // rows: [],
        // columns: [],
      } as Question,
    ];

    setQuestions(newQuestions);
  };

  // Surveys
  type Survey = z.infer<typeof SurveySchema>;

  const [surveyJSON, setSurveyJSON] = useState<Survey>({} as Survey);
  const [surveyErrors, setSurveyErrors] = useState<Record<string, string>>({});

  async function saveSurvey(e: React.FormEvent) {
    e.preventDefault();

    // validate questions
    const newQuestionErrors = questions.map((question) => {
      let errors: Record<string, string> = {};
      let choicesErrors: Record<number, string> = {}; // Initialize choicesErrors as an object

      // validate question
      try {
        QuestionSchema.parse(question);
      } catch (error: any) {
        console.log(question);
        for (const issue of error.issues) {
          if (
            issue.path[0] === "choices" &&
            stringChoicesTypes.includes(question.type)
          ) {
            choicesErrors[issue.path[1]] = issue.message; // Store the error message with the index of the choice
          } else {
            errors = {
              ...errors,
              [issue.path[0]]: issue.message,
            };
          }
        }
      }

      console.log(errors);

      return { ...errors, choices: choicesErrors }; // Include choicesErrors in the returned errors object
    });

    setQuestionErrors(newQuestionErrors);

    // validate surveyjson
    const parsedSurvey = SurveySchema.parseAsync({
      ...surveyJSON,
      logo: "/logo.png",
      locale: "es",
      logoWidth: "60px",
      logoHeight: "60px",
      logoPosition: "right",
      belongsTo: user?.uid,
      createdAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      completedHtml: {
        es: '<h3 className="dark:bg-slate-800 dark:text-white">¡Gracias por contestar la encuesta!</h3>',
      },
      completedBeforeHtml: {
        es: '<h3 className="dark:bg-slate-800 dark:text-white">Nuestros registros muestran que ya rellenaste esta encuesta</h3>',
      },
      loadingHtml: {
        es: '<h3 className="dark:bg-slate-800 dark:text-white">Cargando encuesta...</h3>',
      },
      checkErrorsMode: "onValueChanged",
      autoGrowComment: true,
      widthMode: "responsive",
      elements: questions,
    });

    try {
      await parsedSurvey;
    } catch (error: any) {
      let newErrors = {};
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        };
      }
      return setSurveyErrors(newErrors);
    }

    setSurveyErrors({});

    const db = firebase.firestore();

    const ref = db.collection("encuestas").doc();

    try {
      await toast.promise(ref.set(await parsedSurvey), {
        loading: "Guardando encuesta...",
        success: "Encuesta guardada con éxito",
        error: "Error al guardar la encuesta",
      });
      setSurveyId(ref.id);
    } catch (error) {}

    setIsCreated(true);
  }

  const addOption = async (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].choices!.push("");

    // promise that you can only add 6 options max
    if (newQuestions[index].choices!.length <= 6) {
      await new Promise((resolve) => {
        setQuestions(newQuestions);
        resolve(true);
      });
    } else {
      toast.error("Por el momento, no puedes agregar más de 6 opciones...");
      // remove last option
      newQuestions[index].choices!.pop();
      setQuestions(newQuestions);
    }
  };

  const removeOption = async (index: number, optionIndex: number) => {
    const newQuestions = [...questions];

    // promise if there are more than 2 options
    if (newQuestions[index].choices!.length > 2) {
      await new Promise((resolve) => {
        newQuestions[index].choices!.splice(optionIndex, 1);
        setQuestions(newQuestions);
        resolve(true);
      });
    } else {
      toast.error("Debes agregar al menos 2 opciones");
    }
  };

  const addRatingOption = async (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].rateCount! += 1;
    newQuestions[index].rateMax! += 1;

    // promise that you can only add 6 options max
    if (newQuestions[index].rateCount! <= 10) {
      await new Promise((resolve) => {
        setQuestions(newQuestions);
        resolve(true);
      });
    } else {
      toast.error("Por el momento, no puedes agregar más de 10 opciones...");
      // remove last option
      newQuestions[index].rateCount! -= 1;
      newQuestions[index].rateMax! -= 1;
      setQuestions(newQuestions);
    }
  };

  const removeRatingOption = async (index: number) => {
    const newQuestions = [...questions];

    // promise if there are more than 2 options
    if (newQuestions[index].rateCount! > 3) {
      await new Promise((resolve) => {
        newQuestions[index].rateCount! -= 1;
        newQuestions[index].rateMax! -= 1;
        setQuestions(newQuestions);
        resolve(true);
      });
    } else {
      toast.error("Debes agregar al menos 3 opciones");
    }
  };

  return (
    <>
      {isCreated ? (
        <>
          <Confetti className="h-full w-full" />
          <section className="isolate p-2">
            <div className=" mt-36 flex flex-col items-center justify-center gap-y-5">
              <h1 className="text-center text-3xl font-semibold md:text-6xl">
                ¡Encuesta{" "}
                <span
                  className=" animate-pulse bg-gradient-to-r  from-[#53428e] via-fuchsia-400 to-[#319fbb] bg-clip-text font-bold text-transparent
                  transition duration-200 ease-in-out 
                "
                >
                  {`"${surveyJSON.title}"`}
                </span>{" "}
                creada con éxito!
              </h1>
              <Link
                className="text-primary-500 mt-5 text-lg text-gray-600 hover:underline dark:text-gray-400"
                href={`/encuestas/${surveyId && surveyId}`}
              >
                Puedes verla aquí
              </Link>
              <Link href="/dashboard/mis-encuestas">
                <button
                  className=" btn-md btn mt-5 animate-pulse  border-none bg-gradient-to-r from-[#53428e] to-fuchsia-400 
                  transition duration-200  ease-in-out hover:-translate-y-2 hover:from-purple-600 hover:to-purple-800 hover:shadow-lg dark:text-white"
                >
                  Ver mis encuestas
                </button>
              </Link>
              {/* crear nueva encuesta */}
              <button
                className=" btn-md btn mt-5 animate-pulse  border-none bg-gradient-to-r from-[#53428e] to-fuchsia-400
                transition duration-200  ease-in-out hover:-translate-y-2 hover:from-purple-600 hover:to-purple-800 hover:shadow-lg dark:text-white"
                onClick={() => {
                  setIsCreated(false);
                  setQuestions([]);
                  setSurveyJSON({} as Survey);
                }}
              >
                Crear nueva encuesta
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="isolate my-10 px-4">
          <h1 className="dashboard-title mt-5">Crear encuesta</h1>
          <form>
            <div className="entrance m-4 flex flex-col rounded-lg bg-gray-100 bg-opacity-10 p-6 shadow-xl backdrop-blur-xl backdrop:opacity-20 dark:bg-gray-900 dark:bg-opacity-20  dark:backdrop-blur-3xl sm:p-12 ">
              <input
                type="text"
                name="title"
                onChange={(e) => {
                  setSurveyJSON({
                    ...surveyJSON,
                    [e.target.name]: e.target.value,
                  });
                  // remove error if exists
                  if (surveyErrors.title) {
                    setSurveyErrors({
                      ...surveyErrors,
                      title: "",
                    });
                  }
                }}
                maxLength={25}
                placeholder="Título de la encuesta"
                className={`input-ghost input text-2xl font-bold transition duration-300 ease-in-out focus:bg-transparent  ${
                  surveyErrors.title
                    ? " border-red-500 hover:outline-none hover:outline"
                    : "hover:outline hover:outline-primary focus:outline-primary"
                }`}
              />
              {surveyErrors.title && (
                <div className=" mt-3 ml-3 flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm">
                  <RiErrorWarningFill />
                  <span>{surveyErrors.title}</span>
                </div>
              )}
              <div className="mb-3 flex justify-end">
                <span className="mt-2 text-sm text-gray-500">
                  {surveyJSON.title?.length || 0}/25
                </span>
              </div>

              <textarea
                name="description"
                onChange={(e) => {
                  setSurveyJSON({
                    ...surveyJSON,
                    [e.target.name]: e.target.value,
                  });
                  // remove error if exists
                  if (surveyErrors.description) {
                    setSurveyErrors({
                      ...surveyErrors,
                      description: "",
                    });
                  }
                }}
                maxLength={100}
                className={`textarea-ghost textarea max-h-16 border-t-0 border-l-0 border-r-0 border-b-4 border-primary 
               transition duration-300 ease-in-out focus:bg-transparent  ${
                 surveyErrors.description
                   ? "border-red-500 hover:outline-none hover:outline"
                   : "hover:outline hover:outline-primary focus:outline-primary"
               }
              `}
                placeholder="Descripción de la Encuesta..."
              ></textarea>

              {surveyErrors.description && (
                <div className="mt-3 ml-3 flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm ">
                  <RiErrorWarningFill />
                  <span>{surveyErrors.description}</span>
                </div>
              )}
              <div className="mb-3 flex justify-end">
                <span className="mt-2 text-sm text-gray-500">
                  {surveyJSON.description?.length || 0}/100
                </span>
              </div>
            </div>

            {/* questions */}
            {questions.map((question, index) => {
              const questionError = questionErrors[index];

              return (
                <div
                  key={index}
                  className="m-4 mt-5 flex flex-col gap-3 rounded-lg bg-gray-100 bg-opacity-10 p-6 shadow-xl backdrop-blur-xl backdrop:opacity-20 dark:bg-gray-900 dark:bg-opacity-20  dark:backdrop-blur-3xl sm:p-12 "
                  id={`question-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Pregunta {index + 1}
                    </h2>
                  </div>

                  <input
                    type="text"
                    name="name"
                    id={`name-${index}`}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].name = e.target.value;
                      setQuestions(newQuestions);
                      // check if question has errors
                      if (questionError && questionError.name) {
                        const newQuestionErrors = { ...questionErrors };
                        delete newQuestionErrors[index].name;
                        setQuestionErrors(newQuestionErrors);
                      }
                    }}
                    maxLength={20}
                    placeholder="Título de la pregunta"
                    className={`input-ghost input text-xl font-semibold transition duration-300 ease-in-out focus:bg-transparent  ${
                      questionError?.name
                        ? " border-red-500 hover:outline-none hover:outline"
                        : "hover:outline hover:outline-primary focus:outline-primary"
                    }`}
                  />
                  {questionError?.name && (
                    <div className=" mt-3 ml-3 flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm">
                      <RiErrorWarningFill />
                      <span>{questionError.name as any}</span>
                    </div>
                  )}
                  <div className="mb-3 flex justify-end">
                    <span className="mt-2 text-sm text-gray-500">
                      {question.name?.length || 0}/20
                    </span>
                  </div>

                  {question.type === "text" && (
                    <input
                      type="text"
                      placeholder="Así se vería el campo de respuesta"
                      className="disable input-bordered input mb-10 w-full shadow-sm disabled:select-ghost disabled:cursor-not-allowed  disabled:border-none disabled:bg-slate-400 disabled:bg-opacity-20 disabled:text-gray-500 disabled:placeholder-gray-500 disabled:outline-none  dark:shadow-lg dark:disabled:bg-slate-700 dark:disabled:bg-opacity-30  "
                      disabled
                    />
                  )}
                  {question.type === "comment" && (
                    <textarea
                      placeholder="Así se vería el campo de respuesta"
                      className="disable textarea-bordered textarea mb-10 w-full shadow-sm disabled:select-ghost disabled:cursor-not-allowed  disabled:border-none disabled:bg-slate-400 disabled:bg-opacity-20 disabled:text-gray-500 disabled:placeholder-gray-500 disabled:outline-none  dark:shadow-lg dark:disabled:bg-slate-700 dark:disabled:bg-opacity-30  "
                      disabled
                    />
                  )}
                  {question.type === "dropdown" && (
                    // daisy ui select
                    <select
                      className="select mb-5 w-full shadow-sm disabled:select-ghost disabled:bg-slate-400 disabled:bg-opacity-20 dark:shadow-lg dark:disabled:bg-slate-700 dark:disabled:bg-opacity-30 "
                      disabled
                    >
                      <option>Así se vería el campo de selección</option>
                    </select>
                  )}
                  {stringChoicesTypes.includes(question.type) && (
                    <div className="mt-3 mb-10 flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor={`choices-${index}`}
                          className="text-sm font-semibold"
                        >
                          Opciones
                        </label>
                        <div className="ml-1 flex flex-col gap-3">
                          {question.choices &&
                            question.choices.map(
                              (
                                choice:
                                  | string
                                  | { value: string; imageLink: string },
                                choiceIndex
                              ) => {
                                const isChoiceObject =
                                  typeof choice !== "string";
                                const choiceValue = isChoiceObject
                                  ? (
                                      choice as {
                                        value: string;
                                        imageLink: string;
                                      }
                                    ).value
                                  : (choice as string);

                                const choiceError =
                                  questionErrors.length > 0 &&
                                  questionErrors[index].choices &&
                                  questionErrors[index].choices[choiceIndex];

                                return (
                                  <div
                                    key={choiceIndex}
                                    className="flex flex-col gap-3"
                                  >
                                    <div className="flex items-center gap-6">
                                      {question.type === "radiogroup" ? (
                                        <input
                                          // type radio disabled
                                          type="radio"
                                          className="radio-primary radio radio-md cursor-not-allowed "
                                          disabled
                                          checked
                                        />
                                      ) : question.type === "checkbox" ? (
                                        <input
                                          type="checkbox"
                                          className="checkbox-primary checkbox checkbox-md cursor-not-allowed "
                                          disabled
                                          checked
                                        />
                                      ) : (
                                        <div className="text-center text-lg font-semibold opacity-50 ">
                                          {choiceIndex + 1}
                                        </div>
                                      )}

                                      <input
                                        type="text"
                                        name="choices"
                                        id={`choices-${index}`}
                                        value={choiceValue}
                                        onChange={(e) => {
                                          const newQuestions = [...questions];
                                          if (isChoiceObject) {
                                            newQuestions[index].choices![
                                              choiceIndex
                                            ] = {
                                              ...(choice as {
                                                value: string;
                                                imageLink: string;
                                              }),
                                              value: e.target.value,
                                            };
                                          } else {
                                            newQuestions[index].choices![
                                              choiceIndex
                                            ] = e.target.value;
                                          }
                                          setQuestions(newQuestions);
                                          // check if question has errors
                                          if (
                                            questionError &&
                                            questionError.choices
                                          ) {
                                            const newQuestionErrors = {
                                              ...questionErrors,
                                            };
                                            delete newQuestionErrors[index]
                                              .choices;
                                            setQuestionErrors(
                                              newQuestionErrors
                                            );
                                          }
                                        }}
                                        maxLength={20}
                                        placeholder={`Opción ${
                                          choiceIndex + 1
                                        }`}
                                        className={`input-ghost input text-xl font-semibold transition duration-300 ease-in-out focus:bg-transparent  ${
                                          choiceError
                                            ? " border-red-500 hover:outline-none hover:outline"
                                            : "hover:outline hover:outline-primary focus:outline-primary"
                                        }`}
                                      />
                                      <div className="mb-3 flex justify-end">
                                        <span className="mt-2 text-sm text-gray-500">
                                          {choiceValue.length || 0}/20
                                        </span>
                                      </div>
                                      {/* buttons to add and removve  */}
                                      <div className="flex items-center">
                                        <button
                                          type="button"
                                          data-tip="Borrar opción"
                                          className="btn-outline btn-error btn-sm btn-circle btn border-none  hover:opacity-80"
                                          onClick={() => {
                                            removeOption(index, choiceIndex);
                                          }}
                                        >
                                          <FiMinusCircle />
                                        </button>
                                        {/* if last index, add button */}
                                        {question.choices &&
                                          choiceIndex ===
                                            question.choices.length - 1 && (
                                            <button
                                              type="button"
                                              data-tip="Añadir opción"
                                              className="btn-outline btn-primary btn-sm btn-circle btn border-none  hover:opacity-80"
                                              onClick={() => {
                                                addOption(index);
                                              }}
                                            >
                                              <FiPlusCircle />
                                            </button>
                                          )}
                                      </div>
                                      {choiceError && (
                                        <div className="flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm">
                                          <RiErrorWarningFill />
                                          <span>{choiceError}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* if type of question is boolean */}
                  {question.type === "boolean" && (
                    <div className="mb-14 ml-5">
                      {/* daisyu ui switch with label changing of respective state */}
                      <div className="flex items-center ">
                        <div className="flex flex-wrap place-items-center justify-center space-x-5 ">
                          <input
                            type="text"
                            name="labelFalse"
                            value={question.labelFalse}
                            id={`labelFalse-${index}`}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].labelFalse = e.target.value;
                              setQuestions(newQuestions);
                              // check if question has errors
                              if (questionError && questionError.labelFalse) {
                                const newQuestionErrors = { ...questionErrors };
                                delete newQuestionErrors[index].labelFalse;
                                setQuestionErrors(newQuestionErrors);
                              }
                            }}
                            maxLength={15}
                            placeholder={question.labelFalse}
                            className={`input-ghost input w-40 text-end text-lg font-semibold transition duration-300 ease-in-out  hover:outline hover:outline-primary focus:bg-transparent focus:outline-primary
                            ${
                              questionError?.labelFalse
                                ? " border-red-500 hover:outline-none hover:outline"
                                : "hover:outline hover:outline-primary focus:outline-primary"
                            }
                            `}
                          />
                          <input
                            type="checkbox"
                            className="toggle toggle-lg"
                            disabled
                            checked
                          />
                          <input
                            type="text"
                            name="labelTrue"
                            value={question.labelTrue}
                            id={`labelTrue-${index}`}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].labelTrue = e.target.value;
                              setQuestions(newQuestions);
                              // check if question has errors
                              if (questionError && questionError.labelTrue) {
                                const newQuestionErrors = { ...questionErrors };
                                delete newQuestionErrors[index].labelTrue;
                                setQuestionErrors(newQuestionErrors);
                              }
                            }}
                            maxLength={15}
                            placeholder={question.labelTrue}
                            className={`input-ghost input w-40 text-start text-lg font-semibold transition duration-300 ease-in-out  hover:outline hover:outline-primary focus:bg-transparent focus:outline-primary
                            ${
                              questionError?.labelTrue
                                ? " border-red-500 hover:outline-none hover:outline"
                                : "hover:outline hover:outline-primary focus:outline-primary"
                            }
                            `}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-x-56">
                          <div className="mb-3">
                            <span className="mt-2 text-sm text-gray-500">
                              {question.labelFalse?.length || 0}/15
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="mt-2 text-sm text-gray-500">
                              {question.labelTrue?.length || 0}/15
                            </span>
                          </div>
                        </div>
                        {questionError?.labelFalse && (
                          <div className="my-3 flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm">
                            <RiErrorWarningFill />
                            <span>{questionError?.labelFalse as any}</span>
                          </div>
                        )}
                        {questionError?.labelTrue && (
                          <div className="flex flex-wrap place-items-center justify-center gap-3 text-xs text-red-500 sm:justify-start sm:text-sm">
                            <RiErrorWarningFill />
                            <span>{questionError?.labelTrue as any}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* if type of question is rating */}
                  {question.type === "rating" && (
                    <div className="mb-14 ml-5">
                      <div className="flex flex-wrap place-items-center justify-center gap-3 text-xs text-gray-500 sm:justify-start sm:text-sm">
                        {/* map circles with numbers in it depending on ratecount */}
                        {Array.from(Array(question.rateCount).keys()).map(
                          (rateCount) => (
                            <div
                              key={rateCount}
                              className="flex items-center justify-center gap-5 rounded-full"
                            >
                              <button className="btn-disabled btn-circle btn border-slate-300 bg-transparent text-slate-800 shadow-lg dark:border dark:border-slate-700 dark:bg-transparent dark:text-slate-300">
                                {rateCount + 1}
                              </button>
                              {/* if last element of the array, add button and delete button */}
                              {question.rateCount &&
                                rateCount === question.rateCount - 1 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn-outline btn-primary btn-sm btn-circle btn border-none  hover:opacity-80"
                                      onClick={() => addRatingOption(index)}
                                    >
                                      <FiPlusCircle />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-outline btn-error btn-sm btn-circle btn border-none  hover:opacity-80"
                                      onClick={() => removeRatingOption(index)}
                                    >
                                      <FiMinusCircle />
                                    </button>
                                  </>
                                )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* if type of question is signaturepad */}
                  {question.type === "signaturepad" && (
                    <div className="mb-14">
                      <div className="flex w-full flex-wrap place-items-center justify-center gap-3 text-xs text-gray-500 sm:justify-start sm:text-sm">
                        <div className="flex w-full items-center justify-center gap-5 rounded-full">
                          <div className="flex w-full justify-center rounded-md border-slate-300 bg-transparent p-10 text-slate-800 shadow-lg dark:border dark:border-slate-700 dark:bg-transparent dark:text-slate-300">
                            <Signature />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <QuestionTypeDropdown
                      isOpen={isOpen}
                      selectedQuestionType={
                        questionTypes.find(
                          (questionType) => questionType.value === question.type
                        ) || questionTypes[0]
                      }
                      setSelectedQuestionType={(questionType: any) => {
                        const newQuestions = [...questions];
                        newQuestions[index].type = questionType.value;

                        // if question type is radiogroup, add choices
                        if (stringChoicesTypes.includes(questionType.value)) {
                          newQuestions[index].choices = ["", ""];
                          newQuestions[index].showNoneItem = true;
                          newQuestions[index].showSelectAllItem = true;
                        } else if (questionType.value === "imagepicker") {
                          newQuestions[index].choices = [
                            {
                              value: "",
                              imageLink: "",
                            },
                            {
                              value: "",
                              imageLink: "",
                            },
                          ];
                        } else {
                          delete newQuestions[index].choices;
                          delete newQuestions[index].showNoneItem;
                          delete newQuestions[index].showSelectAllItem;
                        }

                        if (questionType.value === "comment") {
                          newQuestions[index].autoGrow = true;
                        } else {
                          delete newQuestions[index].autoGrow;
                        }

                        if (questionType.value === "matrix") {
                          newQuestions[index].rows = ["", ""];
                          newQuestions[index].columns = ["", ""];
                        } else {
                          delete newQuestions[index].rows;
                          delete newQuestions[index].columns;
                        }

                        if (questionType.value === "rating") {
                          newQuestions[index].rateCount = 3;
                          newQuestions[index].rateMax = 3;
                        } else {
                          delete newQuestions[index].rateCount;
                          delete newQuestions[index].rateMax;
                        }

                        if (questionType.value === "boolean") {
                          newQuestions[index].labelTrue = "Verdadero";
                          newQuestions[index].labelFalse = "Falso";
                        } else {
                          delete newQuestions[index].labelTrue;
                          delete newQuestions[index].labelFalse;
                        }

                        setQuestions(newQuestions);

                        // check if question has errors
                        if (questionError && questionError.type) {
                          const newQuestionErrors = { ...questionErrors };
                          delete newQuestionErrors[index].type;
                          setQuestionErrors(newQuestionErrors);
                        }
                      }}
                      setIsOpen={setIsOpen}
                    />
                    <div className=" flex flex-wrap place-items-center gap-x-8">
                      {/* duplicate question */}
                      <button
                        className="btn-outline btn-primary btn-sm btn gap-x-2 px-4"
                        onClick={(e) => {
                          e.preventDefault();

                          const newQuestions = [...questions];
                          newQuestions.splice(index + 1, 0, {
                            ...question,
                            name: `${question.name} (copia)`,
                          });

                          setQuestions(newQuestions);

                          // wait for the new question to be rendered

                          setTimeout(() => {
                            const input = document.getElementById(
                              `name-${index + 1}`
                            ) as HTMLInputElement;

                            input.value = `${question.name} (copia)`;
                          }, 200);
                        }}
                      >
                        <RiFileCopy2Line />
                        <span>Duplicar</span>
                      </button>

                      <div className="flex flex-wrap gap-x-3">
                        <label
                          htmlFor={`isRequired-${index}`}
                          className={`text-sm font-semibold transition duration-300 ease-in-out
                          ${
                            question?.isRequired
                              ? "font-bold text-primary"
                              : "text-gray-500 hover:text-primary"
                          }
                          `}
                        >
                          Obligatoria
                        </label>
                        <input
                          type="checkbox"
                          name="isRequired"
                          id={`isRequired-${index}`}
                          className="toggle-primary toggle toggle-md"
                          checked={question.isRequired}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].isRequired = e.target.checked;
                            setQuestions(newQuestions);
                          }}
                        />
                      </div>
                      <button
                        className="btn-outline btn-error btn-sm btn gap-x-2 px-4"
                        onClick={(e) => {
                          e.preventDefault();

                          // remove question from questions array
                          const newQuestions = [...questions];
                          newQuestions.splice(index, 1);
                          setQuestions(newQuestions);

                          // remove question errors
                          const newQuestionErrors = { ...questionErrors };
                          delete newQuestionErrors[index];
                          setQuestionErrors(newQuestionErrors);

                          // update input values
                          document
                            .querySelectorAll<HTMLInputElement>(
                              'input[name="name"]'
                            )
                            .forEach((input, i) => {
                              input.value = newQuestions[i]?.name;
                            });
                        }}
                      >
                        <BsTrash /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="fixed top-20 right-6 flex flex-col justify-center space-y-5 rounded-full bg-slate-200 bg-opacity-20 px-3 py-6 shadow-xl  backdrop-blur-sm dark:bg-slate-900 dark:bg-opacity-30">
              <div className="tooltip tooltip-left" data-tip="Agregar Pregunta">
                <button
                  className=" btn-outline btn-primary btn-circle btn"
                  type="button"
                  onClick={addQuestion}
                >
                  <RiAddLine className="text-lg" />
                </button>
              </div>
              <div
                className="tooltip tooltip-left"
                data-tip="Resetear Encuesta"
              >
                <button className="btn-outline btn-circle btn" type="reset">
                  <BsArrowCounterclockwise className="text-lg" />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Guardar">
                <button
                  type="button"
                  className="btn-outline btn-success btn-circle btn"
                  onClick={saveSurvey}
                >
                  <RiSave2Line className="text-lg" />
                </button>
              </div>
            </div>
          </form>

          <div className="my-16 flex justify-center gap-6 ">
            <button
              className="btn-primary btn-md btn gap-2"
              type="button"
              onClick={addQuestion}
            >
              <RiAddLine className="text-lg" />
              Agregar pregunta
            </button>
            <button
              className="btn-outline btn-success btn-md btn gap-2"
              type="button"
              onClick={saveSurvey}
            >
              <RiSave2Line className="text-lg" />
              Guardar
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default CreadorDeEncuestas;

{
  /* image input */
}
{
  /* <input
              type="file"
              name="logo"
              accept="image/*"
              className="hidden"
              id="image"
              onChange={(e) => {
                const file = e.target.files![0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setSurveyJSON({
                      ...surveyJSON,
                      logo: reader.result as string,
                    });
                  };
                }
              }}
            /> */
}
{
  /* <div className=" sm:flex sm:justify-end">
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center gap-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={surveyJSON.logo || "/logo.png"}
                    width={60}
                    height={60}
                    alt="logo"
                  />
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Cambiar imagen
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  (opcional)
                </p>
              </label>
            </div> */
}
