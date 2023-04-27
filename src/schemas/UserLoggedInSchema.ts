import { z } from "zod";

const UserLoggedInSchema = z.object({
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
});

export default UserLoggedInSchema;
