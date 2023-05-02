import { NextPage } from "next";
import { DashboardLayout } from "../../components";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

type Props = {};

const Help: NextPage<Props> = () => {
  return (
    <DashboardLayout
      title="FAQ y Ayuda"
      description="Preguntas Frecuentes y Ayuda"
    >
      <section className="p-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex flex-col justify-center px-4 py-8 md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 mb-8 dark:text-gray-400">
            En ecuestApp tenemos distintas dudas que esperamos sean resueltas
            con las siguientes preguntas.
          </p>
          <div className="space-y-4">
            <details className="w-full rounded-lg border">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
                ¿Cómo puedo crear una encuesta en la aplicación?
              </summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 dark:text-gray-400">
                {`Para crear una encuesta en la aplicación, debes ir al panel de
                control de usuario y seleccionar la opción "Crear nueva
                encuesta". Luego, sigue los pasos guiados para establecer el
                título de la encuesta, las preguntas y las opciones de
                respuesta.`}{" "}
              </p>
            </details>
            <details className="w-full rounded-lg border">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
                ¿Puedo personalizar el diseño de mi encuesta?
              </summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 dark:text-gray-400">
                Sí, puedes personalizar el diseño de tu encuesta. La aplicación
                ofrece varias opciones de personalización, incluyendo diferentes
                temas de diseño, colores, imágenes y fuentes de texto.{" "}
              </p>
            </details>
            <details className="w-full rounded-lg border">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
                ¿Puedo compartir mi encuesta con otras personas?
              </summary>
              <p className="ml-4 -mt-4 px-4 py-6 pt-0 dark:text-gray-400">
                Sí, puedes compartir tu encuesta con otras personas. La
                aplicación ofrece varias opciones de compartir, incluyendo
                compartir en redes sociales, correo electrónico, enlaces
                directos y códigos de incrustación.{" "}
              </p>
            </details>
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
