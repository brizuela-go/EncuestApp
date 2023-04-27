import {
  BsCheck2Square,
  BsImages,
  BsInputCursorText,
  BsSortDown,
  BsToggles,
  BsUiRadios,
  BsUiRadiosGrid,
  BsStar,
} from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegComments, FaSignature } from "react-icons/fa";
import { z } from "zod";

export const questionTypes = [
  {
    value: "text",
    label: "Campo de texto",
    icon: <BsInputCursorText />,
    info: "Respuesta abierta del usuario a través de un campo de texto.",
  },
  {
    value: "radiogroup",
    label: "Radiogroup",
    icon: <BsUiRadios />,
    info: "Respuesta única de un conjunto con botones de selección.",
  },
  {
    value: "checkbox",
    label: "Checkbox",
    icon: <BsCheck2Square />,
    info: "Multiples respuestas de un conjunto con casiillas de selección.",
  },
  {
    value: "dropdown",
    label: "Dropdown",
    icon: <RiArrowDropDownLine />,
    info: "Respuesta única de un conjunto con un menú desplegable.",
  },
  {
    value: "boolean",
    label: "Booleano",
    icon: <BsToggles />,
    info: "Booleano, verdadero o falso.",
  },
  {
    value: "rating",
    label: "Valoración",
    icon: <BsStar />,
    info: "Respuesta única del usario de un rango determinado.",
  },
  {
    value: "imagepicker",
    label: "Selector de imágenes",
    icon: <BsImages />,
    info: "Respuesta única de un conjunto con imágenes.",
  },
  {
    value: "ranking",
    label: "Ranking",
    icon: <BsSortDown />,
    info: "Respuesta única de un conjunto con imágenes.",
  },
  {
    value: "comment",
    label: "Comentario",
    icon: <FaRegComments />,
    info: "Respuesta abierta del usuario a través de un campo de texto más grande.",
  },
  {
    value: "matrix",
    label: "Matriz",
    icon: <BsUiRadiosGrid />,
    info: "Respuesta única para un conjunto de filas y columnas con botones de selección.",
  },
  {
    value: "signaturepad",
    label: "Firma/Dibujo",
    icon: <FaSignature />,
    info: "Respuesta abierta del usuario a través de un canvas para dibujar o firmar.",
  },
] as Array<{
  value:
    | "boolean"
    | "text"
    | "radiogroup"
    | "checkbox"
    | "dropdown"
    | "rating"
    | "imagepicker"
    | "ranking"
    | "comment"
    | "matrix"
    | "signaturepad";
  label: string;
  icon: JSX.Element;
  info: string;
}>;
