import { z } from "zod";
import { swearWordsRegex } from "../utils/regexps";

const UserSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre de usuario es obligatorio",
      })
      .min(3, {
        message: "Debe tener una longitud mínima de 3",
      })
      .max(20, {
        message: "Debe tener una longitud máxima de 20",
      }),
    surname: z
      .string({
        required_error: "El apellido es obligatorio",
      })
      .min(3, {
        message: "Debe tener una longitud mínima de 3",
      })
      .max(20, {
        message: "Debe tener una longitud máxima de 20",
      }),
    email: z
      .string({
        required_error: "El correo electrónico es obligatorio",
      })
      .email(),
    password: z
      .string({
        required_error: "La contraseña es obligatoria",
      })
      .min(6, {
        message: "Debe tener una longitud mínima de 6",
      })
      .max(20, {
        message: "Debe tener una longitud máxima de 20",
      }),

    confirmPassword: z
      .string({
        required_error: "La confirmación es obligatoria",
      })
      .min(6, {
        message: "Debe tener una longitud mínima de 6",
      })
      .max(20, {
        message: "Debe tener una longitud máxima de 20",
      }),
  })
  .superRefine(({ password, confirmPassword, name, surname, email }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
      });
    }
    if (!swearWordsRegex.test(name)) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Nombre no válido",
      });
    }
    if (!swearWordsRegex.test(surname)) {
      ctx.addIssue({
        code: "custom",
        path: ["surname"],
        message: "Apellido no válido",
      });
    }
    if (!swearWordsRegex.test(email)) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Correo no válido",
      });
    }
    if (!swearWordsRegex.test(password)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Contraseña no válida",
      });
    }
  });

export default UserSchema;
