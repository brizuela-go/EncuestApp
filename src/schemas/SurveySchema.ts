import { z } from "zod";
import firebase from "../firebase/firebaseClient";
import QuestionSchema from "./QuestionSchema";
import toast from "react-hot-toast";
import { swearWordsRegex } from "../utils/regexps";

// survey json with zod
const SurveySchema = z
  .object({
    locale: z.literal("es"),
    title: z
      .string({
        required_error: "El título es obligatorio",
      })
      .min(3)
      .max(25)
      .refine((value) => {
        return value.length >= 3 && value.length <= 25;
      }, "El título debe tener entre 3 y 25 caracteres"),
    description: z
      .string({
        required_error: "La descripción es obligatoria",
      })
      .min(3)
      .max(100)
      .refine((value) => {
        return value.length >= 3 && value.length <= 100;
      }, "La descripción debe tener entre 3 y 100 caracteres"),
    belongsTo: z.string(),
    logo: z.string(),
    logoWidth: z.literal("60px"),
    logoHeight: z.literal("60px"),
    logoPosition: z.literal("right"),
    createdAt: z.string(),
    completedHtml: z.object({
      es: z.literal(
        '<h3 className="dark:bg-slate-800 dark:text-white">¡Gracias por contestar la encuesta!</h3>'
      ),
    }),
    completedBeforeHtml: z.object({
      es: z.literal(
        '<h3 className="dark:bg-slate-800 dark:text-white">Nuestros registros muestran que ya rellenaste esta encuesta</h3>'
      ),
    }),
    loadingHtml: z.object({
      es: z.literal(
        '<h3 className="dark:bg-slate-800 dark:text-white">Cargando encuesta...</h3>'
      ),
    }),
    elements: z.array(QuestionSchema),
    checkErrorsMode: z.literal("onValueChanged"),
    autoGrowComment: z.literal(true),
    widthMode: z.literal("responsive"),
  })
  .superRefine(async ({ title, description, elements }, ctx) => {
    const db = firebase.firestore();

    // query to check if survey title exists
    const query = await db
      .collection("encuestas")
      .where("title", "==", title)
      .get();

    if (!query.empty) {
      toast.error("Ya existe una encuesta con este título.");
      return ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Ya existe una encuesta con este título.",
      });
    }

    // if elements array is empty
    if (elements.length === 0) {
      toast.error("La encuesta debe tener al menos una pregunta.");
      return ctx.addIssue({
        code: "custom",
        path: ["elements"],
        message: "La encuesta debe tener al menos una pregunta.",
      });
    }

    // check if elements "name" property is unique
    const elementsSet = new Set(elements.map((element) => element.name));
    if (elementsSet.size !== elements.length) {
      toast.error("Las preguntas deben tener nombres únicos.");
      return ctx.addIssue({
        code: "custom",
        path: ["elements"],
        message: "Las preguntas deben tener nombres únicos.",
      });
    }

    // validate swearWordsRegex for title
    if (!swearWordsRegex.test(title)) {
      toast.error("El título no es válido.");
      return ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "El título no es válido.",
      });
    }

    // validate swearWordsRegex for description
    if (!swearWordsRegex.test(description)) {
      toast.error("La descripción no es válida.");
      return ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "La descripción no es válida.",
      });
    }
  });

export default SurveySchema;
