import { z } from "zod";
import { swearWordsRegex } from "../utils/regexps";

const QuestionSchema = z
  .object({
    type: z.enum([
      "text",
      "radiogroup",
      "checkbox",
      "dropdown",
      "boolean",
      // "imagepicker",
      "ranking",
      "comment",
      // "matrix",
      "signaturepad",
      "rating",
      // "file",
    ]),
    name: z
      .string({
        required_error: "La pregunta debe de tener un título",
      })
      .min(1, {
        message: "Título debe de tener una longitud mínima de 1",
      })
      .max(20, {
        message: "Título debe de tener una longitud máxima de 20",
      }),
    isRequired: z.boolean(),
    choices: z
      .array(
        z.union([
          z.object({
            value: z
              .string({
                required_error: "La imagen debe de tener un nombre",
              })
              .min(1, {
                message: "Nombre debe de tener una longitud mínima de 1",
              })
              .max(20, {
                message: "Nombre debe de tener una longitud máxima de 20",
              })
              .refine((value) => {
                return swearWordsRegex.test(value);
              }, "Nombre no válido"),

            imageLink: z.string(),
          }),
          z
            .string({
              required_error: "La opción no puede estar vacía",
            })
            .min(1, {
              message: "Opción debe de tener una longitud mínima de 1",
            })
            .max(20, {
              message: "Opción debe de tener una longitud máxima de 20",
            })
            .refine((value) => {
              return swearWordsRegex.test(value);
            }, "Opción no válida"),
        ])
      )
      .optional(),
    rows: z
      .array(
        z
          .string({
            required_error: "Fila debe de tener un nombre",
          })
          .min(1, {
            message: "Fila debe de tener una longitud mínima de 1",
          })
          .max(20, {
            message: "Fila debe de tener una longitud máxima de 20",
          })
      )
      .optional(),
    columns: z
      .array(
        z
          .string({
            required_error: "Columna no puede estar vacía",
          })
          .min(1, {
            message: "Columna debe de tener una longitud mínima de 1",
          })
          .max(20, {
            message: "Columna debe de tener una longitud máxima de 20",
          })
      )
      .optional(),
    autoGrow: z.boolean().optional(),
    showSelectAllItem: z.boolean().optional(),
    showNoneItem: z.boolean().optional(),
    labelTrue: z
      .string({
        required_error: "La etiqueta no puede estar vacía",
      })
      .min(1, {
        message: "Verdadero debe de tener una longitud mínima de 1",
      })
      .refine((value) => {
        return swearWordsRegex.test(value);
      }, "Nombre no válido")
      .optional(),
    labelFalse: z
      .string({
        required_error: "La etiqueta no puede estar vacía",
      })
      .min(1, {
        message: "Falso debe de tener una longitud mínima de 1",
      })
      .refine((value) => {
        return swearWordsRegex.test(value);
      }, "Nombre no válido")
      .optional(),
    rateCount: z.number().optional(),
    rateMax: z.number().optional(),
  })
  .superRefine(({ name }, ctx) => {
    if (!swearWordsRegex.test(name)) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Nombre no válido",
      });
    }
  });
export default QuestionSchema;
