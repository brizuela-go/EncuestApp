import { NextPage } from "next";
import { DashboardLayout } from "../../components";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

type Props = {};

const faqs = [
  {
    question: "¿Cómo puedo crear una encuesta en la aplicación?",
    answer: `Para crear una encuesta en la aplicación, debes ir al panel de
    control de usuario y seleccionar la opción "Crear nueva
    encuesta". Luego, sigue los pasos guiados para establecer el
    título de la encuesta, las preguntas y las opciones de
    respuesta.`,
  },
  {
    question: "¿Puedo personalizar el diseño de mi encuesta?",
    answer: `Sí, puedes personalizar el diseño de tu encuesta. La aplicación
    ofrece varias opciones de personalización, incluyendo diferentes
    temas de diseño, colores, imágenes y fuentes de texto.`,
  },
  {
    question: "¿Puedo compartir mi encuesta con otras personas?",
    answer: `Sí, puedes compartir tu encuesta con otras personas. La
    aplicación ofrece varias opciones de compartir, incluyendo
    compartir en redes sociales, correo electrónico, enlaces
    directos y códigos de incrustación.`,
  },
  {
    question: "¿Puedo ver los resultados de mi encuesta?",
    answer: `Sí, puedes ver los resultados de tu encuesta. La aplicación
    ofrece varias opciones de visualización de resultados, incluyendo
    gráficos de barras, gráficos de pastel, tablas de datos, insights con inteligencia artificial, 
    e incluso puedes exportar los datos a un archivo CSV.`,
  },
];

const Help: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="FAQ y Ayuda"
      description="Preguntas Frecuentes y Ayuda"
    >
      <section className="entrance  card m-3 bg-slate-300 bg-opacity-20 p-6 dark:bg-slate-900  dark:bg-opacity-50 dark:text-gray-100 lg:m-10 lg:p-10">
        <div className="container mx-auto flex flex-col justify-center px-4 py-8 md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 mb-8 dark:text-gray-200">
            Aquí encontrarás las preguntas más frecuentes sobre la aplicación y
            sus respuestas. Si no encuentras la respuesta a tu pregunta, puedes
            contactarnos a través de{" "}
            <Link
              href="mailto:182559@iberopuebla.mx"
              className=" text-sky-500 hover:text-sky-600 "
            >
              182030@iberopuebla.mx
            </Link>{" "}
            o por medio de nuestro
            <Link
              href="https://wa.me/5212223247857"
              className=" inline-block text-green-500 hover:text-green-600"
            >
              {" "}
              <div className="flex flex-row items-center justify-center gap-x-1">
                <FaWhatsapp className=" ml-2" />
                WhatsApp
              </div>
            </Link>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className=" group w-full cursor-pointer rounded-lg border border-slate-300 shadow-md transition duration-300 ease-in-out hover:shadow-lg  dark:border-slate-700 "
              >
                <summary className="px-4 py-6 font-semibold transition duration-300 ease-in-out focus:outline-none focus-visible:ring-violet-400 group-hover:bg-gradient-to-r  group-hover:text-indigo-800 dark:group-hover:text-indigo-600  ">
                  {faq.question}
                </summary>
                <p className="ml-4 -mt-4 px-4 py-6 pt-0 dark:text-sky-100">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const isPremium = AuthUser.claims?.stripeRole ? true : false;

  if (!isPremium) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default withAuthUser<any>()(Help);
